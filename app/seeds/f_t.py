from app.models import db, Frequency, Treatment, environment, SCHEMA

def seed_frequencies_treatments():

    tf1 = Treatment.query.get(1)
    fq1= Frequency.query.get(1)
    tf1.frequencies.append(fq1)
    
    tf2 = Treatment.query.get(2)
    fq2 = Frequency.query.get(2)
    tf2.frequencies.append(fq2)


    tf3 = Treatment.query.get(3)
    fq3 = Frequency.query.get(3)
    tf3.frequencies.append(fq3)

    tf1 = Treatment.query.get(1)
    fq4 = Frequency.query.get(4)
    tf1.frequencies.append(fq4)

    tf2 = Treatment.query.get(2)
    fq5 = Frequency.query.get(5)
    tf2.frequencies.append(fq5)

    tf3 = Treatment.query.get(3)
    fq4 = Frequency.query.get(4)
    tf3.frequencies.append(fq4)

    db.session.commit()

def undo_frequencies_treatments():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.frequencies_treatments RESTART IDENTITY CASCADE;")
        else:
            db.session.execute("DELETE FROM treatments")

        db.session.commit()
