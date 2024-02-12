import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchSongById } from '../../store/song';
import { fetchComments, addNewComment, editComment, removeComment } from '../../store/comment';
import SongDetails from '../SongDetails';
import CommentEditModal from '../CommentEditModal';
import OpenModalButton from '../OpenModalButton';
import './SongDetailsPage.css';
import deletebtn from '../Images/deletebtn.svg';
import editbtn from '../Images/editbtn.svg';

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
        <form onSubmit={handleSubmit} className="flex flex-col p-4 mt-24">
          <ul className="error-list">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label htmlFor="comment" className="mb-2 font-bold text-lg text-gray-900">
            Add a new comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4 px-3 py-2 border-2 border-gray-300 rounded-lg"
          ></textarea>
          <div className="flex justify-end">
            <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded max-w-[100px]">
              Submit
            </button>
          </div>
        </form>
      )}

      <h2 className="comments-heading">Comments</h2>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-content">
              <div className="comment-username">
                <strong>{comment.username}</strong>
              </div>
              <div className="comment-text">
                {comment.text}
              </div>
              {currentUser && comment.user_id === currentUser.id && (
              <div className="comment-buttons">
                <OpenModalButton
                  className="edit-modal-button"
                  buttonText={<img src={editbtn} alt="Edit" />}
                  modalComponent={<CommentEditModal commentId={comment.id} />}
                />
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <img src={deletebtn} alt="Delete" />
                </button>
              </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default SongDetailsPage;
