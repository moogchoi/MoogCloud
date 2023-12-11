from app.models import db, Song, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():

  demo_user = User.query.filter_by(username='Demo').first()
  marnie_user = User.query.filter_by(username='marnie').first()
  bobbie_user = User.query.filter_by(username='bobbie').first()

  song1 = Song(user_id=demo_user.id, name="Tokyo Drift", content="https://moogcloud.s3.amazonaws.com/01+-+Tokyo+Drift+(Fast+%26+Furious).mp3", img="https://moogcloud.s3.amazonaws.com/w88v3i.jpg", description="Tokyo Drift")
  song2 = Song(user_id=marnie_user.id, name="Everyone Nose (Remix)", content="https://moogcloud.s3.amazonaws.com/01+-+Tokyo+Drift+(Fast+%26+Furious).mp3", img="https://moogcloud.s3.amazonaws.com/6660d5.jpg", description="Seeing Sounds")
  song3 = Song(user_id=bobbie_user.id, name="Everyone Nose (Remix)", content="https://moogcloud.s3.amazonaws.com/01+-+Tokyo+Drift+(Fast+%26+Furious).mp3", img="https://moogcloud.s3.amazonaws.com/6660d5.jpg", description="Seeing Sounds")
  song4 = Song(user_id=demo_user.id, name="Raven", content="https://moogcloud.s3.amazonaws.com/103-proxy-raven_(original_08).mp3", img="https://moogcloud.s3.amazonaws.com/000-proxy-music_from_the_eastblock_jungles-2cd-2013.jpg", description="Proxy")
  song5 = Song(user_id=demo_user.id, name="Six Days", content="https://moogcloud.s3.amazonaws.com/02+-+Six+Days+The+Remix.mp3", img="https://moogcloud.s3.amazonaws.com/w88v3i.jpg", description="Tokyo Drift Soundtrack")
  song6 = Song(user_id=marnie_user.id, name="Sooner or Later", content="https://moogcloud.s3.amazonaws.com/07+-+Sooner+or+Later.mp3", img="https://moogcloud.s3.amazonaws.com/6660d5.jpg", description="Seeing Sounds")
  song7 = Song(user_id=demo_user.id, name="Barracuda", content="https://moogcloud.s3.amazonaws.com/03+-+The+Barracuda.mp3", img="https://moogcloud.s3.amazonaws.com/w88v3i.jpg", description="Tokyo Drift Soundtrack")
  song8 = Song(user_id=demo_user.id, name="Dance in the Dark", content="https://moogcloud.s3.amazonaws.com/106-proxy-dance_in_dark.mp3", img="https://moogcloud.s3.amazonaws.com/000-proxy-music_from_the_eastblock_jungles-2cd-2013.jpg", description="Proxy")

  db.session.add(song1)
  db.session.add(song2)
  db.session.add(song3)
  db.session.add(song4)
  db.session.add(song5)
  db.session.add(song6)
  db.session.add(song7)
  db.session.add(song8)
  db.session.commit()

def undo_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM songs"))

  db.session.commit()
