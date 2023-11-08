import React from 'react';

const SongDetails = ({ song }) => {
  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-details">
      <h2>{song.name}</h2>
      <p>{song.description}</p>

      <audio controls>
        <source src={song.content} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SongDetails;
