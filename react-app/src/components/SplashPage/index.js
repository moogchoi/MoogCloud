import './SplashPage.css'
import SongCard from '../SongCard'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSongs } from '../../store/song';
import { NavLink, useHistory } from 'react-router-dom';
import splash from '../Images/splash.png'

export default function SplashPage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);

  useEffect(() => {
    dispatch(fetchAllSongs());
  }, [dispatch]);

  return (
    <div className="landing-container">
      <div className='splash-image'>
        <img src={splash} alt="splashimage" />
      </div>
      <div className="splash-main-header">
        <p>What's next in music is first on MoogCloud</p>
      </div>
      <div className='splash-sub-header'>
        <p>Upload your first track and begin your journey.
          MoogCloud gives you space to create, find your fans,
          and connect with other artists.</p>
      </div>
      <div className='song-containers'>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  )
}
