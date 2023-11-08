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
      <Link to={`/songs/${song.id}`}>View Details</Link>
      <h3>{song.name}</h3>
      <p>{song.description}</p>

      <audio controls>
        <source src={song.content} type="audio/mpeg" />
        audio element
      </audio>

      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default SongCard;
