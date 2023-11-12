from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  # content = StringField('Content (URL)', validators=[DataRequired(), URL()])
  content = FileField("Audio File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  duration = IntegerField('Duration', validators=[DataRequired()])
  img = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  description = StringField('Description', validators=[DataRequired()])
