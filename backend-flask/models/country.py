from db import db


class CountryModel(db.Model):
    __tablename__ = "country"

    id = db.Column(db.Integer, nullable=False, autoincrement=True, primary_key=True)
    name = db.Column(
        db.String(50),
        unique=True,
        nullable=False,
    )
    destinations = db.relationship("DestinationModel", backref="country", lazy="dynamic", cascade="all, delete")
