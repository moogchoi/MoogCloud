import './SplashPage.css'
import SongCard from '../SongCard'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSongs } from '../../store/song';
import { NavLink, useHistory } from 'react-router-dom';

export default function SplashPage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs); // Access songs from the state

  useEffect(() => {
    dispatch(fetchAllSongs());
  }, [dispatch]);

  return (
    <div className="landing-container">
      <NavLink to="/new">
        Upload Song
      </NavLink>
      <div>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
      ))}
    </div>
    </div>
  )
}
