from app.models import db, Frequency, environment, SCHEMA


def seed_freq():
    f1 = Frequency(
        freq=2,
        time=4
    )

    f2 = Frequency(
        freq=1.2,
        time=4
    )
    f3 = Frequency(
       freq=20,
       time=4
    )


    f4 = Frequency(
        freq=350,
        time=4
    )
    f5 = Frequency(
        freq=150,
        time=4
    )
    db.session.add(f1)
    db.session.add(f2)
    db.session.add(f3)
    db.session.add(f4)
    db.session.add(f5)

    db.session.commit()


def undo_treatments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.frequencies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM frequencies")
