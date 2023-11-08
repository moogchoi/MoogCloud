import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSongById } from '../../store/song';
import SongDetails from '../SongDetails';

const SongDetailsPage = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs.currentSong);

  useEffect(() => {
    dispatch(fetchSongById(songId));
  }, [dispatch, songId]);

  return (
    <div>
      <h1>Song Details</h1>
      <SongDetails song={song} />

      <Link to={`/songs/edit/${songId}`}>
        <button>Edit Song</button>
      </Link>
    </div>
  );
};

export default SongDetailsPage;
