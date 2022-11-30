from app.models import db, Treatment, Frequency, environment, SCHEMA


def seed_treatments():
    treatment1 = Treatment(
        treatment_name = 'neck',
        trial_id = 1,
        comments = "trying for 3 time a day for 3 weeks",
        
    )

    treatment2 = Treatment(
        treatment_name='neck',
        trial_id=2,
        comments="once a day",
        
    )
    treatment3 = Treatment(
        treatment_name='neck',
        trial_id=3,
        comments="all day treatment",
       
    )


    db.session.add(treatment1)
    db.session.add(treatment2)
    db.session.add(treatment3)


    db.session.commit()


def undo_treatments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.treatments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM treatments")

    db.session.commit()
