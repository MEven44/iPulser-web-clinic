from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Trial, db
from app.forms import Trial_form
from .auth_routes import validation_errors_to_error_messages


trials_routes = Blueprint('trials', __name__)

#NOTE Get trial by ID
@trials_routes.route('/<int:id>')
@login_required
def get_trial(id):
    trial = Trial.query.get(int(id))
    if trial:
        return trial.to_dict(), 200
    return {
            'errors':"trial not found",
            'status code': 404
        }, 404

