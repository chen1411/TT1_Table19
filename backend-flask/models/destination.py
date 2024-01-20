from db import db


class DestinationModel(db.Model):
    __tablename__ = "destinations"
    
    id = db.Column(
        db.Integer, primary_key=True, nullable=False, autoincrement=True
    )
    country_id = db.Column(
        db.Integer, db.ForeignKey("country.id"), nullable=False
    )
    cost = db.Column(db.Float, nullable=False, default=0)
    name = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text)
    # country = db.relationship("CountryModel", back_populates="destinations")

