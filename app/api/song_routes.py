from flask import Blueprint, jsonify, request
from app.models import db, Song
from flask_login import login_required
from app.forms import SongForm

song_routes = Blueprint('songs', __name__)

def validation_errors_to_error_messages(validation_errors):
  error_messages = []
  for field, errors in validation_errors.items():
    for error in errors:
      error_messages.append(f"{field}: {error}")
  return error_messages

# get all songs
@song_routes.route('/')
def get_all_songs():

  songs = Song.query.all()
  song_list = [song.to_dict() for song in songs]
  return jsonify(song_list)

# get song by id
@song_routes.route('/<int:id>')
def get_song_by_id(id):
    song = Song.query.get(id)
    if song:
        return song.to_dict()
    return {"errors": "Song not found"}, 404

# upload a song
@song_routes.route('/', methods=['POST'])
@login_required
def upload_song():
  form = SongForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    song = Song(
      user_id=current_user.id,
      name=form.data['name'],
      content=form.data['content'],
      duration=form.data['duration'],
      img=form.data['img'],
      description=form.data['description']
    )
    db.session.add(song)
    db.session.commit()
    return song.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete a song
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
  song = Song.query.get(id)
  if song:
    db.session.delete(song)
    db.session.commit()
    return {"message": "Song deleted successfully"}
  return {"errors": "Song not found"}, 404
