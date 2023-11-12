import './SongCard.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SongCard = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-card">
      <h3>{song.name}</h3>
      <p>{song.description}</p>

      <Link to={`/songs/${song.id}`}>View Details</Link>
    </div>
  );
};

export default SongCard;
