from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class UpdateSongForm(FlaskForm):
    title = StringField('Title', validators=[])
    genre = StringField('Genre', validators=[])
    submit = SubmitField('Upload Song')
