from app.models import db, Song, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():

  demo_user = User.query.filter_by(username='Demo').first()
  marnie_user = User.query.filter_by(username='marnie').first()
  bobbie_user = User.query.filter_by(username='bobbie').first()

  song1 = Song(user_id=demo_user.id, name="Tokyo Drift", content="https://moogcloud.s3.amazonaws.com/01+-+Tokyo+Drift+(Fast+%26+Furious).mp3", duration=255, img="https://moogcloud.s3.amazonaws.com/w88v3i.jpg", description="Tokyo Drift")
  song2 = Song(user_id=marnie_user.id, name="Everyone Nose (Remix)", content="https://moogcloud.s3.amazonaws.com/01+-+Tokyo+Drift+(Fast+%26+Furious).mp3", duration=209, img="https://moogcloud.s3.amazonaws.com/6660d5.jpg", description="Seeing Sounds")
  song3 = Song(user_id=bobbie_user.id, name="Everyone Nose (Remix)", content="https://moogcloud.s3.amazonaws.com/01+-+Tokyo+Drift+(Fast+%26+Furious).mp3", duration=209, img="https://moogcloud.s3.amazonaws.com/6660d5.jpg", description="Seeing Sounds")

  db.session.add(song1)
  db.session.add(song2)
  db.session.add(song3)
  db.session.commit()

def undo_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM songs"))

  db.session.commit()
