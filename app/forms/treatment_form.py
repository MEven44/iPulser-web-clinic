from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,BooleanField,IntegerField
from wtforms.validators import DataRequired



class Treatment_form(FlaskForm):

    treatment_name = StringField('Treatment name', validators=[DataRequired()])
    trial_id = IntegerField('Related to trial')
    comments = StringField('Comments')
    admin = BooleanField('Admin', default=False)
    frequencies = StringField('Frequencies')