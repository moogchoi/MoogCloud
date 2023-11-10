from flask import Blueprint, jsonify, request
from app.models import db, Song
from flask_login import login_required, current_user
from app.forms import SongForm, EditSongForm
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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

    content = form.data['content']
    content.filename = get_unique_filename(content.filename)
    upload = upload_file_to_s3(content)
    print(upload)

    if "url" not in upload:
       return {'errors': validation_errors_to_error_messages(upload.errors)}, 400

    song = Song(
      user_id=current_user.id,
      name=form.data['name'],
      content=upload["url"],
      duration=form.data['duration'],
      img=form.data['img'],
      description=form.data['description']
    )
    db.session.add(song)
    db.session.commit()
    return song.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# update a song
@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_song(id):
    song = Song.query.get(id)
    if song and song.user_id == current_user.id:
      song = Song.query.get(id)
      form = EditSongForm()
      form['csrf_token'].data = request.cookies['csrf_token']
      if form.validate_on_submit():
          song.name = form.data['name']
          song.description = form.data['description']
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
