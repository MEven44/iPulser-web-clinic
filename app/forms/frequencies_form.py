from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DecimalField
from wtforms.validators import DataRequired



class Frequency_form(FlaskForm):

    freq = DecimalField('Frequency', validators=[DataRequired()])
    time = DecimalField('time', validators=[DataRequired()])
    
