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

from db import db
from models.destination import DestinationModel

blp = Blueprint("Destinations", "destinations", description="Operations on destinations")

@blp.route("/destinations")
class CreateDestination(MethodView):
    def post(self):
        destination_data = request.json
        destination = DestinationModel(**destination_data)

        try:
            db.session.add(destination)
            db.session.commit()
        except SQLAlchemyError as e:
            print(str(e))
            abort(500, message="An error occurred while inserting the destination.")

        return jsonify(destination_id=destination.id, country_id=destination.country_id, name=destination.name, cost=destination.cost, notes=destination.notes), 201


@blp.route("/destinations/<int:destination_id>")
class Destination(MethodView):
    @jwt_required()
    def delete(self, destination_id):
        destination = DestinationModel.query.get_or_404(destination_id)
        db.session.delete(destination)
        db.session.commit()
        return jsonify(message="Destination deleted."), 200
    
    @jwt_required()
    def put(self, destination_id):
        destination = DestinationModel.query.get(destination_id)
        destination_data = request.json

        if destination:
            destination.country_id = destination_data.get("country_id", destination.country_id)
            destination.name = destination_data.get("name", destination.name)
            destination.cost = destination_data.get("cost", destination.cost)
            destination.notes = destination_data.get("notes", destination.notes)
        else:
            destination = DestinationModel(id=destination_id, **destination_data)

        db.session.add(destination)
        db.session.commit()

