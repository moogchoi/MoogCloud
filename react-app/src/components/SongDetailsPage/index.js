import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSongById } from '../../store/song';
import { fetchComments, addNewComment } from '../../store/comment';
import SongDetails from '../SongDetails';

const SongDetailsPage = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs.currentSong);
  const comments = useSelector((state) => state.comments.comments);
  const [errors, setErrors] = useState([]);
  const userId = useSelector((state) => state.session.user.id);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const commentData = {
      userId,
      songId,
      text: newComment,
    };

    const response = await dispatch(addNewComment(songId, commentData));
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

      <Link to={`/songs/edit/${songId}`}>
        <button>Edit Song</button>
      </Link>
    </div>
  );
};

export default SongDetailsPage;
