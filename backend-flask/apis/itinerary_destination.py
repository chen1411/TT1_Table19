from db import db
from flask.views import MethodView
from flask_smorest import Blueprint
from models.itinerary_destination import ItineraryDestinationModel
from flask import request, jsonify

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    jwt_required,
)

blp = Blueprint("itinerary_destination", "itinerary_destination", description="Operations on Itinerary and Destination")

@blp.route("/itinerary_destination/<int:id>")
class GetItineraryDestination(MethodView):
    def get(self, id): 
        itinerary_destination = ItineraryDestinationModel.query.get(id)
        return jsonify(id=itinerary_destination.id, 
                        itinerary_id=itinerary_destination.itinerary_id, 
                        destination_id=itinerary_destination.destination_id) if itinerary_destination else jsonify(message="Itinerary, Destination not found"), 404
    
@blp.route("/itinerary_destination")
class AddItineraryDestination(MethodView):
    @jwt_required()
    def put(self): 
        itinerary_destination_data = request.json
        itinerary_destination = ItineraryDestinationModel(
            itinerary_id=itinerary_destination_data["itinerary_id"], 
            destination_id=itinerary_destination_data["destination_id"])
        
        db.session.add(itinerary_destination)
        db.session.commit()

        return {"message": "Itinerary destination saved successfully."}, 201
    

@blp.route("/itinerary_destination/<int:id>")
class DeletetineraryDestination(MethodView):
    @jwt_required()
    def delete(self, id): 
        itinerary_destination = ItineraryDestinationModel.query.get_or_404(id)
        db.session.delete(itinerary_destination)
        db.session.commit()
        return jsonify(message="Itinerary destination deleted."), 200
    
@blp.route("/itinerary_destination")
class UpdatetineraryDestination(MethodView):
    @jwt_required()
    def post(self): 
        itinerary_destination_data = request.json
        existing_itinerary_destination = ItineraryDestinationModel.query.get(itinerary_destination_data['id'])

        if existing_itinerary_destination:
            existing_itinerary_destination.itinerary_id = itinerary_destination_data["itinerary_id"]
            existing_itinerary_destination.destination_id = itinerary_destination_data["destination_id"]
            db.session.commit()
            return jsonify(message="Itinerary destination updated."), 200
        else:
            return jsonify(message="Itinerary destination not found."), 404