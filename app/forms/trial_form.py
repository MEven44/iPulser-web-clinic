from flask_wtf import FlaskForm
from wtforms import StringField, SelectField,BooleanField
from wtforms.validators import DataRequired
from app.models import Trial


class Trial_form(FlaskForm):

    subject = StringField('Trial subject', validators=[DataRequired()])
    trial_scope = StringField('Trial Scope', validators=[DataRequired()])
    description = StringField('Description')
    # admin = BooleanField('Admin', default=False)
