import React from 'react';
import Footer from '../Footer';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const currentSong = useSelector((state) => state.currentSong.currentSong);

  return (
    <div>
      <div>{children}</div>
      <Footer currentSong={currentSong} />
    </div>
  );
};

export default Layout;
