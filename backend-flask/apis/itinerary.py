from db import db
from flask.views import MethodView
from flask_smorest import Blueprint
from models.itinerary import ItineraryModel
from flask import request, jsonify

blp = Blueprint("Itinerary", "itinerary", description="Operations on itinerary")