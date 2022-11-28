from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

frequencies_treatments = db.Table(
    "frequencies_treatments",
    db.Model.metadata,
    db.Column("treatmets_Id", ForeignKey("treatments.id")),
    db.Column('frequencies_id', ForeignKey(
        'frequencies.id'), primary_key=True)
)


class Frequency(db.Model):
    __tablename__ = 'frequencies'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    freq = db.Column(db.Float, nullable=False)
    time = db.Column(db.Float, nullable=False)

  
    treatments = db.relationship(
        'Treatment', secondary=frequencies_treatments, back_populates="frequencies")


def freq_to_dict(self):
    return {
        'id': self.id,
        'freq': self.freq,
        'time': self.time,
    }

class Treatment(db.Model):
    __tablename__ = 'treatments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    treatment_name = db.Column(db.String(100), nullable=False)
    admin  = db.Column(db.Boolean)
    comments = db.Column(db.String(355), nullable = True)
    user_id = db.Column(ForeignKey(add_prefix_for_prod("users.id")))
    trial_id = db.Column(ForeignKey(add_prefix_for_prod("trials.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
    
   

    users = db.relationship('User', back_populates = 'treatments')
    frequencies = db.relationship('Frequency', secondary=frequencies_treatments, back_populates = 'treatments', cascade = 'all,delete')
    trials = db.relationship('Trial', back_populates = 'treatments')


    def trt_to_dict(self):
        return {
            'id': self.id,
            'treatment_name':self.treatment_name,
            'comments': self.comments,
            'user_id': self.user_id,
            'trial_id':self.trial_id,
            'frequencies': [frequency.freq_to_dict() for frequency in self.frequencies]
                }
    
