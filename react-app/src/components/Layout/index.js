import React from 'react';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import './Layout.css';

const Layout = ({ children }) => {
  const currentSong = useSelector((state) => state.currentSong.currentSong);

  return (
    <div className="layout-container">
      <div className="main-content">{children}</div>
      <Footer currentSong={currentSong} />
    </div>
  );
};

export default Layout;
