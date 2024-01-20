from blocklist import BLOCKLIST
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from .itinerary_destination import ItineraryDestinationModel
from .destination import DestinationModel
from flask import request, jsonify

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    jwt_required,
)
from passlib.hash import pbkdf2_sha256

from db import db
from models.itinerary import ItineraryModel

blp = Blueprint(
    "Itinerary", "itinerary", description="Operations on itineraries"
)


@blp.route("/itinerary")
class ItineraryList(MethodView):
    @jwt_required()
    def get(self):
        uid = get_jwt_identity()
        itineraries_results = ItineraryModel.query.filter_by(user_id=uid).all()
        itineraries = []

        for itinerary in itineraries_results:
            destinations = (
                ItineraryModel.query.filter_by(id=itinerary.id)
                .join(
                    ItineraryDestinationModel,
                    ItineraryModel.id
                    == ItineraryDestinationModel.itinerary_id,
                )
                .add_column(ItineraryDestinationModel.destination_id)
                .join(
                    DestinationModel,
                    ItineraryDestinationModel.destination_id
                    == DestinationModel.id,
                )
                .add_column(DestinationModel.name)
                .all()
            )
            itineraries.append(
                {
                    "id": itinerary.id,
                    "country_id": itinerary.country_id,
                    "user_id": itinerary.user_id,
                    "budget": itinerary.budget,
                    "title": itinerary.title,
                    "destinations": [
                        {"id": dest[1], "name": dest[2]}
                        for dest in destinations
                    ],
                }
            )

        return (
            jsonify(itineraries),
            200,
        )

    @jwt_required()
    def post(self):
        itinerary_data = request.json
        uid = get_jwt_identity()
        itinerary = ItineraryModel(user_id=uid, **itinerary_data)

        try:
            db.session.add(itinerary)
            db.session.commit()
        except SQLAlchemyError:
            abort(
                500, message="An error occurred while inserting the itinerary."
            )

        return (
            jsonify(
                id=itinerary.id,
                country_id=itinerary.country_id,
                user_id=itinerary.user_id,
                budget=itinerary.budget,
                title=itinerary.title,
            ),
            201,
        )


@blp.route("/itinerary/<int:iid>")
class Itinerary(MethodView):
    @jwt_required()
    def get(self, iid):
        itinerary = ItineraryModel.query.get_or_404(iid)
        return jsonify(
            id=itinerary.id,
            country_id=itinerary.country_id,
            user_id=itinerary.user_id,
            budget=itinerary.budget,
            title=itinerary.title,
        )

    @jwt_required()
    def delete(self, iid):
        itinerary = ItineraryModel.query.get_or_404(iid)
        db.session.delete(itinerary)
        db.session.commit()
        return jsonify(message="User deleted."), 200

    @jwt_required()
    def put(self, iid):
        itinerary = ItineraryModel.query.get(iid)
        itinerary_data = request.json

        if itinerary:
            itinerary.country_id = itinerary_data.get(
                "country_id", itinerary.country_id
            )
            itinerary.budget = itinerary_data.get("budget", itinerary.budget)
            itinerary.title = itinerary_data.get("title", itinerary.title)
        else:
            itinerary = Itinerary(id=iid, **itinerary_data)

        db.session.add(itinerary)
        db.session.commit()

        return (
            jsonify(
                id=itinerary.id,
                country_id=itinerary.country_id,
                user_id=itinerary.user_id,
                budget=itinerary.budget,
                title=itinerary.title,
            ),
            200,
        )
