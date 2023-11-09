from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    text = TextAreaField('Comment', validators=[DataRequired()])
