from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey


class Frequency(db.Model):
    __tablename__ = 'frequencies'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    freq = db.Column(db.Float, nullable=False)
    time = db.Column(db.Float, nullable=False)

    treatments = db.relationship('Treatment', back_populates='frequencies')

def to_dict(self):
        return {
            'id': self.id,
            'freq': self.freq,
            'time': self.time,
        }