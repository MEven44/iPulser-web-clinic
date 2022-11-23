from app.models import db, Trial, environment, SCHEMA
from faker import Faker
fake = Faker()

def seed_trials():
    trial1 = Trial(
        subject='knee arthritis',
        trial_scope="20 subjects 18-35",
        description="fake.text()"
    )

    trial2 = Trial(
        subject='head aches',
        trial_scope="100 female subjects 18-35",
        description="fake.text()"
    )
    trial3 = Trial(
        subject='giddines',
        trial_scope="beta trial",
        description="fake.text()"
    )


    db.session.add(trial1)
    db.session.add(trial2)
    db.session.add(trial3)


    db.session.commit()


def undo_trials():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM members")

    db.session.commit()
