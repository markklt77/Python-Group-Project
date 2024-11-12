#UNECESSARY
from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class AddSongToPlaylistForm(FlaskForm):
    song_id = IntegerField('songId', validators=[DataRequired()])
    submit = SubmitField('Add Song')
