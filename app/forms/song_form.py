from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    file = FileField('Upload Song', validators=[
        FileRequired(),
        FileAllowed(['mp3', 'wav', 'flac', 'aac'], 'Audio files only!')
    ])
    submit = SubmitField('Upload Song')
