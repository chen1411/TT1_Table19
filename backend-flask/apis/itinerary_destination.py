from db import db
from flask.views import MethodView
from flask_smorest import Blueprint
from models.itinerary_destination import ItineraryDestinationModel
from flask import request, jsonify

blp = Blueprint("itinerary_destination", "itinerary_destination", description="Operations on Itinerary and Destination")

@blp.route("/get_itinerary_destination/<int:id>")
class GetItineraryDestination(MethodView):
    def get(self, id): 
        itinerary_destination = ItineraryDestinationModel.query.get(id)
        return jsonify(id=itinerary_destination.id, 
                        itinerary_id=itinerary_destination.itinerary_id, 
                        destination_id=itinerary_destination.destination_id,) if itinerary_destination else jsonify(message="Itinerary, Destination not found"), 404