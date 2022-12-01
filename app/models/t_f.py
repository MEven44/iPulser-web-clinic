from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey


frequencies_treatments = db.Table(
    "frequencies_treatments",
    db.Model.metadata,
    db.Column("treatments_id", ForeignKey(
        add_prefix_for_prod("treatments.id")), primary_key=True),
    db.Column("frequencies_id", ForeignKey(
        add_prefix_for_prod("frequencies.id")), primary_key=True)
)

if environment == "production":
    frequencies_treatments.schema = SCHEMA
