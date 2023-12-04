from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment, Song
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
  error_messages = []
  for field, errors in validation_errors.items():
    for error in errors:
      error_messages.append(f"{field}: {error}")
  return error_messages


# get all comments for a song
@comment_routes.route('/<int:song_id>', methods=['GET'])
def get_comments(song_id):
    comments = Comment.query.filter_by(song_id=song_id).all()
    return jsonify([comment.to_dict() for comment in comments])

# get comment by id
@comment_routes.route('/<int:comment_id>', methods=['GET'])
def get_comment_by_id(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    return jsonify(comment.to_dict()), 200

# add a comment to a song
@comment_routes.route('/<int:song_id>', methods=['POST'])
@login_required
def add_comment(song_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            song_id=song_id,
            text=form.data['text']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# update a user's comment on a song
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment and comment.user_id == current_user.id:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            comment.text = form.data['text']
            db.session.commit()

            return comment.to_dict()

        return {'errors': form.errors}, 400

    return {'errors': ['Comment not found or you do not have permission']}, 404

# delete a user's comment from a song
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def remove_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment and comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()

        return {'message': 'Comment deleted successfully'}

    return {'errors': ['Comment not found or you do not have permission']}, 404
