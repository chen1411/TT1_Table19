from db import db

class ItineraryDestinationModel(db.Model):
    __tablename__ = "itinerary_destination"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    itinerary_id = db.Column(db.Integer, db.ForeignKey("itinerary.id"), nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey("destination.id"), nullable=False)
    

