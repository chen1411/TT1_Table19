from db import db


class ItineraryModel(db.Model):
    id = db.Column(
        db.Integer, primary_key=True, nullable=False, autoincrement=True
    )
    country_id = db.Column(
        db.Integer, db.ForeignKey("country.id"), nullable=False
    )
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    budget = db.Column(db.Float, nullable=False, default=0)
    title = db.Column(db.String(100), nullable=False)
