from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Trial, db
from app.forms import Trial_form
from .auth_routes import validation_errors_to_error_messages


trials_routes = Blueprint('trials', __name__)

#NOTE Get trial by ID


@trials_routes.route('/@me/<int:id>', methods=['GET'])
@login_required
def get_trial(id):
    trial = Trial.query.get(int(id))
    if trial:
        return trial.to_dict(), 200
    return {
            'errors':"trial not found",
            'status code': 404
        }, 404

#NOTE Get all trials by current user
@trials_routes.route('/@me')
@login_required
def get_user_trials():
    id = current_user.id
    all_trials = Trial.query.all()
    all_trial_list = [trial.to_dict() for trial in all_trials]
    print(all_trial_list)
    res = []
    for trial in all_trial_list:
        if trial['trial_manager'] == id:
            res.append(trial)
    return {'trials':res}, 200

#NOTE Post a new trial

@trials_routes.route('/@me', methods=['POST'])
@login_required
def post_new_trial():
    form = Trial_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_trial = Trial()
        form.populate_obj(new_trial)
        new_trial.trial_manager = current_user.id

        db.session.add(new_trial)
        db.session.commit()

        return new_trial.to_dict()
    else:
        return {'error': validation_errors_to_error_messages(form.errors)}, 400


#NOTE update a trial

@trials_routes.route('/@me/<int:trialId>', methods=['PUT'])
@login_required
def edit_trial(trialId):
    trial = Trial.query.get(int(trialId))
    print('ROUTES TRIALS UPDATE', trial)
    if trial:
        form=Trial_form()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(trial)
            db.session.commit()
            return trial.to_dict(), 201
        return {'errors':validation_errors_to_error_messages(form.errors)}, 400
    return {'message': "trial not found", 
            'status code': 404}, 404


#NOTE trial delete

@trials_routes.route('/@me/<int:id>', methods=['DELETE'])
@login_required
def delete_trial(id):
    trial = Trial.query.get(int(id))
    if trial:
        db.session.delete(trial)
        db.session.commit()
        return {"message": "Trial successfully deleted",
                "Status code": 302}, 302
    return {"message": "Trial not found",
            "status code": 404}, 404
