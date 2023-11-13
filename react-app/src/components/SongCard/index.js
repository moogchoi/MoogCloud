import './SongCard.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SongCard = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Link to={`/songs/${song.id}`} className="song-card">
      <div>{song.name}</div>
      <div className='song-card-description'>{song.description}</div>
      <img className='song-card-img' src={song.img} alt={song.name}></img>
    </Link>
  );
};

export default SongCard;
