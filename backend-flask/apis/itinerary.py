from blocklist import BLOCKLIST
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
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

blp = Blueprint("Itineraries", "itineraries", description="Operations on itineraries")



@blp.route("/itinerary")
class ItineraryList(MethodView):
    def get(self):
        itineraries = ItineraryModel.query.all()
        return jsonify([{'id': itinerary.id, 'country_id': itinerary.country_id, 'user_id': itinerary.user_id, 'budget': itinerary.budget, 'title': itinerary.title} for itinerary in itineraries]), 200

    def post(self):
        itinerary_data = request.json
        itinerary = ItineraryModel(**itinerary_data)

        try:
            db.session.add(itinerary)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the itinerary.")

        return jsonify(id=itinerary.id, name=itinerary.username, password=itinerary.password), 201


@blp.route("/itinerary/<int:uid>")
class Itinerary(MethodView):
    def get(self, uid):
        itinerary = ItineraryModel.query.get_or_404(uid)
        return jsonify(id=itinerary.id, country_id=itinerary.country_id, user_id=itinerary.user_id, budget=itinerary.budget, title=itinerary.title )

    @jwt_required()
    def delete(self, uid):
        itinerary = Itinerary.query.get_or_404(uid)
        db.session.delete(itinerary)
        db.session.commit()
        return jsonify(message="User deleted."), 200

    def put(self, uid):
        itinerary = ItineraryModel.query.get(uid)
        itinerary_data = request.json

        if itinerary:
            itinerary.country_id = itinerary_data.get("country_id", itinerary.country_id)
            itinerary.budget = itinerary_data.get("budget", itinerary.budget)
            itinerary.title = itinerary_data.get("title", itinerary.title)
        else:
            itinerary = Itinerary(id=uid, **itinerary_data)

        db.session.add(itinerary)
        db.session.commit()

        return jsonify(id=itinerary.id, country_id=itinerary.country_id, user_id=itinerary.user_id, budget=itinerary.budget, title=itinerary.title ), 200
