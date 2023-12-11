import React from 'react';
import './SongDetails.css';

const SongDetails = ({ song }) => {
  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-details-container">
      <div className="song-details">
        <img className="song-image" src={song.img} alt={song.name} />
        <div className="song-details-text">
          <p className="song-title">{song.name}</p>
          <p className="song-description">{song.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
