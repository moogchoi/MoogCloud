import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteButton from "../DeleteButton";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSongs } from "../../store/song";
import SongCard from "../SongCard";
import './ManageSongs.css'

const ManageSongs = () => {
  const dispatch = useDispatch();
  const userSongs = useSelector((state) => state.songs.userSongs);

  useEffect(() => {
    dispatch(fetchUserSongs());
  }, [dispatch]);

  return (
    <div className="manage-songs-container">
      <div className="manage-songs">
        <h1 className="manage-songs-heading">Your Songs</h1>
        {userSongs.length === 0 ? (
          <div className="no-songs">
            <p>You currently have no songs.</p>
            <p>Would you like to upload a new song?</p>
            <Link to="/new">
              <button className="upload-button">Upload New Song</button>
            </Link>
          </div>
        ) : (
          userSongs.map((song) => (
            <div key={song.id} className="song-card-container">
              <SongCard song={song} />
              <Link to={`/songs/edit/${song.id}`}>
                <button className="edit-button">Edit Song</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageSongs;
