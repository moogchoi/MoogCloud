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
      <h3>{song.name}</h3>
      <p>{song.description}</p>
      <img src={song.img} alt={song.name}></img>
    </Link>
  );
};

export default SongCard;
