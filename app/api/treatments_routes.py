from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Treatment, Frequency, db
from app.forms import Treatment_form, Frequency_form
from .auth_routes import validation_errors_to_error_messages
from flask import jsonify

treatments_routes = Blueprint('treatments', __name__)
#NOTE get all treatments

@treatments_routes.route('/')
def get_all_treatments():
    treatments = Treatment.query.all()
    treatments_list = [treatment.trt_to_dict() for treatment in treatments]

    return {'treatments': treatments_list}, 200

# NOTE GET treatments by trial

@treatments_routes.route('/<int:trialId>')
@login_required
def get_trial_treatments(trialId):
    # treatments = Treatment.query.filter_by(trial_id=trialId)
    # treatments_list = [treatment.trt_to_dict() for treatment in treatments]
    treatments = Treatment.query.all()
    treatments_list = []
    for treatment in treatments:
        if treatment['trial_id'] == trialId:
            treatments_list.append(treatment)
    
    return {'treatments': treatments_list}, 200

# NOTE post treatment and frequencies
@treatments_routes.route('/<int:trialId>', methods=['POST'])
@login_required
def new_treatment(trialId):
    form = Treatment_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    

    if form.validate_on_submit():
        data = form.data
        
        new_treatment = Treatment(
            treatment_name=data['treatment_name'],
            comments = data['comments'],
            frequencies = [Frequency(
                freq = data['frequencies'].split(" ")[0],
                time = data['frequencies'].split(" ")[1]
            )]             
            
        )
        new_treatment.trial_id = trialId
        new_treatment.user_id = current_user.id 
        # form.populate_obj(new_treatment)
       
        db.session.add(new_treatment)
        db.session.commit()

        return (new_treatment.trt_to_dict())
               

    else:
        return {'error': validation_errors_to_error_messages(form.errors)}, 400



# NOTE update a treatment 
@treatments_routes.route('/freq/<int:treatmentId>', methods=['PUT'])
@login_required
def edit_treatment(treatmentId):
    treatment = Treatment.query.get(int(treatmentId))
    form = Treatment_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        if data['frequencies']:
            treatment.frequencies = [Frequency(
                freq=data['frequencies'].split(" ")[0],
                time=data['frequencies'].split(" ")[1]
            )]
                
            db.session.commit()


        return {'errors':validation_errors_to_error_messages(form.errors)}, 400
    return {'message': "treatment not found", 
                'status code': 404}, 404

# NOTE treatment delete

@treatments_routes.route('//<int:treatmentId>', methods=["DELETE"])
@login_required
def delete_treatment(treatmentId):
    treatment = Treatment.query.get(int(treatmentId))
    if treatment:
        db.session.delete(treatment)
        db.session.commit()
        return {"message": "Treatment successfully deleted",
                "Status code": 302}, 302
    return {"message": "Trial not found",
            "status code": 404}, 404
