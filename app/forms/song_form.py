from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL

class SongForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  content = StringField('Content (URL)', validators=[DataRequired(), URL()])
  duration = IntegerField('Duration', validators=[DataRequired()])
  img = StringField('Image (URL)')
  description = StringField('Description')
