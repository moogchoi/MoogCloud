from app.models import db, Comment, User, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()

    song1 = Song.query.get(1)
    song2 = Song.query.get(2)
    song3 = Song.query.get(3)

    comment1 = Comment(user_id=demo_user.id, song_id=song1.id, text="I love Tokyo Drift!")
    comment2 = Comment(user_id=marnie_user.id, song_id=song2.id, text="Great beats!")
    comment3 = Comment(user_id=bobbie_user.id, song_id=song3.id, text="I miss the old Kanye")

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
      db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
