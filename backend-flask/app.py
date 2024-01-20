from flask import Flask, jsonify
from flask_smorest import Api
from db import db
from flask_login import UserMixin
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

import models



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
api = Api(app)



