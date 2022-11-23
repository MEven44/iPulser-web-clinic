from app.models import db, Trial, environment, SCHEMA


def seed_trials():
    trial1 = Trial(
        subject='knee arthritis',
        trial_scope="20 subjects 18-35",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis sapien odio, vel imperdiet diam aliquam eget. Aliquam non blandit tellus. Curabitur at aliquam enim, a pulvinar libero. Ut ut aliquet nibh. Fusce fringilla iaculis quam quis venenatis. Sed pulvinar elit nec tellus hendrerit",
        trial_manager=2
    )
    trial2 = Trial(
        subject='head aches',
        trial_scope="100 female subjects 18-35",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis sapien odio, vel imperdiet diam aliquam eget. Aliquam non blandit tellus. Curabitur at aliquam enim, a pulvinar libero. Ut ut aliquet nibh. Fusce fringilla iaculis quam quis venenatis. Sed pulvinar elit nec tellus hendrerit",
        trial_manager=1
    )
    trial3 = Trial(
        subject='giddines',
        trial_scope="beta trial",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis sapien odio, vel imperdiet diam aliquam eget. Aliquam non blandit tellus. Curabitur at aliquam enim, a pulvinar libero. Ut ut aliquet nibh. Fusce fringilla iaculis quam quis venenatis. Sed pulvinar elit nec tellus hendrerit",
        trial_manager=3
    )


    db.session.add(trial1)
    db.session.add(trial2)
    db.session.add(trial3)


    db.session.commit()


def undo_trials():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.trials RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM trials")

    db.session.commit()
