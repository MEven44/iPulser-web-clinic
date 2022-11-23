from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey


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
    frequencies_id = db.Column(ForeignKey(add_prefix_for_prod("frequencies.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
    
    users = db.relationship('User', back_populates = 'treatments')
    frequencies = db.relationship('Frequency', back_populates = 'treatments', cascade = 'all,delete')
    trials = db.relationship('Trial', back_populates = 'treatments')

    def to_dict(self):
        return {
            'id': self.id,
            'treatment_name':self.treatment_name,
            'comments': self.comments,
            'clinician': self.clinician,
            'frequencies': [freq.to_dict() for freq in self.frequencies],
               }
    
