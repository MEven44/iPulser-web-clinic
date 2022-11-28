from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Treatment,  db
from app.forms import Treatment_form, Frequency_form
from .auth_routes import validation_errors_to_error_messages


treatments_routes = Blueprint('treatments', __name__)

# NOTE GET treatments by trial

@treatments_routes.route('/<int:trialId>')
@login_required
def get_trial_treatments(trialId):
    treatments = Treatment.query.filter_by(trial_id=trialId)
    
    treatments_list = [treatment.trt_to_dict() for treatment in treatments]
    print('GET TREATMENTS BY TRIAL', treatments_list)
    
    return {'treatments': treatments_list}, 200

# NOTE post treatment and frequencies
        