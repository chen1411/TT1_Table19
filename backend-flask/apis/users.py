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
from models.users import UserModel

blp = Blueprint("Users", "users", description="Operations on users")


@blp.route("/register")
class UserRegister(MethodView):
    def post(self):
        user_data = request.json
        if UserModel.query.filter(UserModel.username == user_data["username"]).first():
            abort(409, message="A user with that username already exists.")

        user = UserModel(
            username=user_data["username"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            firstname=user_data["firstname"],
            lastname=user_data["lastname"]
        )
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully."}, 201

@blp.route("/login")
class UserLogin(MethodView):
    def post(self):
        user_data = request.json
        user = UserModel.query.filter(UserModel.username == user_data["username"]).first()

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {"access_token": access_token, "refresh_token": refresh_token}, 200

        abort(401, message="Invalid credential.")


@blp.route("/logout")
class UserLogout(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        BLOCKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200

@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        # Make it clear that when to add the refresh token to the blocklist will depend on the app design
        jti = get_jwt()["jti"]
        BLOCKLIST.add(jti)
        return {"access_token": new_token}, 200

@blp.route("/user/<int:uid>")
class User(MethodView):
    def get(self, uid):
        user = UserModel.query.get_or_404(uid)
        return jsonify(id=user.id, username=user.username, password=user.password)

    @jwt_required()
    def delete(self, uid):
        user = UserModel.query.get_or_404(uid)
        db.session.delete(user)
        db.session.commit()
        return jsonify(message="User deleted."), 200

    def put(self, uid):
        user = UserModel.query.get(uid)
        user_data = request.json

        if user:
            user.password = user_data.get("password", user.password)
            user.username = user_data.get("username", user.username)
        else:
            user = UserModel(id=uid, **user_data)

        db.session.add(user)
        db.session.commit()

        return jsonify(id=user.id, username=user.username, password=user.password), 200

@blp.route("/user")
class UserList(MethodView):
    def get(self):
        users = UserModel.query.all()
        return jsonify([{'id': user.id, 'username': user.username, 'password': user.password} for user in users]), 200

    def post(self):
        user_data = request.json
        user = UserModel(**user_data)

        try:
            db.session.add(user)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the user.")

        return jsonify(id=user.id, name=user.username, password=user.password), 201
