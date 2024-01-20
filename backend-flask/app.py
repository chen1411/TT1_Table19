from flask import Flask, jsonify
from flask_smorest import Api
from db import db
from flask_login import UserMixin
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from blocklist import BLOCKLIST

import models

from apis.users import blp as UserBlueprint
from apis.country import blp as CountryBlueprint
from apis.itinerary_destination import blp as ItineraryDestinationBlueprint
from apis.destination import blp as DestinationBlueprint
from apis.itinerary import blp as ItineraryBlueprint

app = Flask(__name__)
load_dotenv()
app.config["API_TITLE"] = "Stores REST API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#app.config["PROPAGATE_EXCEPTIONS"] = True
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in BLOCKLIST

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return (
        jsonify({"message": "The token has expired.", "error": "token_expired"}),
        401,
    )

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return (
        jsonify(
            {"message": "Signature verification failed.", "error": "invalid_token"}
        ),
        401,
    )

@jwt.unauthorized_loader
def missing_token_callback(error):
    return (
        jsonify(
            {
                "description": "Request does not contain an access token.",
                "error": "authorization_required",
            }
        ),
        401,
    )

@jwt.needs_fresh_token_loader
def token_not_fresh_callback(jwt_header, jwt_payload):
    return (
        jsonify(
            {
                "description": "The token is not fresh.",
                "error": "fresh_token_required",
            }
        ),
        401,
    )

# print('check')
# with app.app_context():
#     print('executed')
#     db.create_all()

api.register_blueprint(UserBlueprint)
api.register_blueprint(CountryBlueprint)
api.register_blueprint(ItineraryDestinationBlueprint)
api.register_blueprint(DestinationBlueprint)
api.register_blueprint(ItineraryBlueprint)