from app.models import db, Frequency , environment, SCHEMA


def seed_freqs():
  freq1 = Frequency(
      freq=1.2,
      time=4
    )
  freq2 = Frequency(
      freq=2,
      time=4
    )
  freq3 = Frequency(
      freq=20,
      time=3
    )
  freq4 = Frequency(
      freq=160,
      time=4
    )
  freq5 = Frequency(
      freq=18.5,
      time=4
    )


  db.session.add(freq1)
  db.session.add(freq2)
  db.session.add(freq3)
  db.session.add(freq4)
  db.session.add(freq5)
  
  db.session.commit()


def undo_freq():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.frequencies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM frequencies")

    db.session.commit()
