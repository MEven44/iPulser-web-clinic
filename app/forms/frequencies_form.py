from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DecimalField
from wtforms.validators import DataRequired
from app.models import frequency


class Frequency_form(FlaskForm):

    freq = DecimalField('Frequency', validators=[DataRequired()])
    time = DecimalField('time', validators=[DataRequired()])
    
