import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchSongById } from '../../store/song';
import { fetchComments, addNewComment } from '../../store/comment';
import SongDetails from '../SongDetails';

const SongDetailsPage = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs.currentSong);
  const comments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.session.user?.id);
  const [errors, setErrors] = useState([]);
  const [newComment, setNewComment] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const commentData = {
      text: newComment,
    };

    const response = await dispatch(addNewComment(songId, commentData));

    setNewComment('');
  };

  useEffect(() => {
    dispatch(fetchSongById(songId));
    dispatch(fetchComments(songId));
  }, [dispatch, songId]);

  return (
    <div>
      <h1>Song Details</h1>
      <SongDetails song={song} />

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

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>

    </div>
  );
};

export default SongDetailsPage;
