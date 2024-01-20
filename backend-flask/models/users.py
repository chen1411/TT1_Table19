from db import db
from flask_login import UserMixin

class UserModel(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(100), unique=False, nullable=False)
    age = db.Column(db.Integer)
    dob = db.Column(db.String(80))
    address = db.Column(db.String(200))



