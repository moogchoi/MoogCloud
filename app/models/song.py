from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
  __tablename__ = 'songs'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  content = db.Column(db.String, nullable=False)
  duration = db.Column(db.Integer, nullable=False)
  img = db.Column(db.String)
  description = db.Column(db.String)

  user = db.relationship('User', back_populates='songs')
