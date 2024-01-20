from db import db


class CountryModel(db.Model):
    __tablename__ = "country"

    id = db.Column(db.Integer, nullable=False, autoincrement=True)
    name = db.Column(
        db.String(50),
        unique=True,
        nullable=False,
    )
