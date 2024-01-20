from db import db
from flask.views import MethodView
from flask_smorest import Blueprint
from models.country import CountryModel
from flask import request, jsonify

blp = Blueprint("Country", "country", description="Operations on country")

@blp.route("/country/<int:cid>")
class GetCountryName(MethodView):
    def get(self, cid): 
        country = CountryModel.query.get(cid)
        return jsonify(id=country.id, name=country.name) if country else jsonify(message="Country not found"), 404

@blp.route("/add_country")
class InsertCountry(MethodView):
    def post(self): 
        country_data = request.json
        if CountryModel.query.filter(CountryModel.name == country_data["country"]).first():
            abort(409, message="A user with that username already exists.")

        country = CountryModel(
            name=country_data["country"],
        )
        db.session.add(country)
        db.session.commit()

        return {"message": "Country created successfully."}, 201