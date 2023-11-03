import './SongCard.css'
import React, { useState, useEffect } from 'react';

const SongCard = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-card">
      <h3>{song.name}</h3>
      <p>{song.description}</p>

      <audio controls>
        <source src={song.content} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default SongCard;
