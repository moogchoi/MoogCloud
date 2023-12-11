import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchSongById } from '../../store/song';
import { fetchComments, addNewComment, editComment, removeComment } from '../../store/comment';
import SongDetails from '../SongDetails';
import CommentEditModal from '../CommentEditModal';
import OpenModalButton from '../OpenModalButton';
import './SongDetailsPage.css'

const SongDetailsPage = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs.currentSong);
  const comments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [newComment, setNewComment] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!newComment.trim()) {
      setErrors(['Comment cannot be empty.']);
      return;
    }

    if (newComment.length > 100) {
      setErrors(['Comment cannot exceed 100 characters.']);
      return;
    }

    const commentData = {
      text: newComment,
    };

    const response = await dispatch(addNewComment(songId, commentData));
    setNewComment('');
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(removeComment(commentId));
  };

  useEffect(() => {
    dispatch(fetchSongById(songId));
    dispatch(fetchComments(songId));
  }, [dispatch, songId]);

  return (
    <div className="song-details-page">
      <SongDetails song={song} />

      {currentUser && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <ul className="error-list">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="comment-label">
            Add a new comment:
            <input
              className="comment-input"
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </label>
          <button className="comment-submit" type="submit">
            Add Comment
          </button>
        </form>
      )}

      <h2 className="comments-heading">Comments</h2>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {comment.text}
            {currentUser && comment.user_id === currentUser.id && (
              <>
                <OpenModalButton
                  className="edit-modal-button"
                  buttonText="Edit"
                  modalComponent={<CommentEditModal commentId={comment.id} />}
                />
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>

  );
};

export default SongDetailsPage;
