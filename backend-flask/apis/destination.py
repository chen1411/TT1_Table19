from db import db
from flask.views import MethodView
from flask_smorest import Blueprint
from models.destination import DestinationModel
from flask import request, jsonify

blp = Blueprint("Destination", "destination", description="Operations on destination")