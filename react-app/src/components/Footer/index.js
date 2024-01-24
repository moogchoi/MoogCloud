import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';

const Footer = () => {
  const currentSong = useSelector((state) => state.songs.currentSong);

  useEffect(() => {
  }, [currentSong]);

  return (
    <div className="footer">
      {currentSong && (
        <AudioPlayer
          src={currentSong.content}
          onPlay={(e) => ('onPlay')}
        />
      )}
    </div>
  );
};

export default Footer;
