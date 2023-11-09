from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment, Song
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

# get all comments for a song
@comment_routes.route('/<int:song_id>', methods=['GET'])
def get_comments(song_id):
    comments = Comment.query.filter_by(song_id=song_id).all()
    return jsonify([comment.to_dict() for comment in comments])

# add a comment to a song
@comment_routes.route('/<int:song_id>', methods=['POST'])
@login_required
def add_comment(song_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            user_id=current_user.id,
            song_id=song_id,
            text=form.data['text']
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return {'errors': form.errors}, 400

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
