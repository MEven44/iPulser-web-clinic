from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class Trial(db.Model):
    __tablename__='trials'
    if environment == "production":
        __table_args__ = {'schema':SCHEMA}
    id = db.Column(db.Integer, primary_key = True)
    subject = db.Column(db.String, nullable = False)
    trial_scope = db.Column(db.String(255))
    description = db.Column(db.String(2000))
    trial_manager = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    admin = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())

    user = db.relationship('User', back_populates = 'trials')
   
    def to_dict(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'trial_scope': self.email,
            'description': self.description,
            'trial_manager': self.trial_manager,
            'created_at': self.created_at,
            'updated_at':self.updated_at
        }
