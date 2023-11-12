import React from 'react';

const SongDetails = ({ song }) => {
  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-details">
      <h2>{song.name}</h2>
      <p>{song.description}</p>
      <img src={song.img}></img>
    </div>
  );
};

export default SongDetails;
