import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchSongById } from '../../store/song';
import { fetchComments, addNewComment, editComment, removeComment } from '../../store/comment';
import SongDetails from '../SongDetails';
import CommentEditModal from '../CommentEditModal';
import OpenModalButton from '../OpenModalButton';

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
    <div>
      <h1>Song Details</h1>
      <SongDetails song={song} />

      {currentUser && (
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Add a new comment:
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </label>
          <button type="submit">Add Comment</button>
        </form>
      )}

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            {currentUser && comment.user_id === currentUser.id && (
              <>
                <OpenModalButton
                  buttonText="Edit"
                  modalComponent={<CommentEditModal commentId={comment.id} />}
                />
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongDetailsPage;
