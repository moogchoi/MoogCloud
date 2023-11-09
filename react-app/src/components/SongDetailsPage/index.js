import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSongById } from '../../store/song';
import { fetchComments } from '../../store/comment';
import SongDetails from '../SongDetails';

const SongDetailsPage = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs.currentSong);
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(fetchSongById(songId));
    dispatch(fetchComments(songId));
  }, [dispatch, songId]);

  return (
    <div>
      <h1>Song Details</h1>
      <SongDetails song={song} />

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
