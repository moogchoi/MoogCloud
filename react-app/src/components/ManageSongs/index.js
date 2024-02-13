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
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {userSongs.length === 0 ? (
        <div className="flex justify-center items-center h-32 w-48 pt-15">
          <div className="no-songs">
            <p>You currently have no songs.</p>
            <p>Would you like to upload a new song?</p>
            <Link to="/new">
              <button className="upload-button">Upload New Song</button>
            </Link>
          </div>
        </div>
      ) : (
        userSongs.map((song) => (
          <div key={song.id} className="flex justify-center items-center h-32 w-48">
            <div className="song-card-container">
              <SongCard song={song} />
              <Link to={`/songs/edit/${song.id}`}>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-semibold text-center inline-block py-2 px-3 rounded max-w-[100px]">
                  Edit Song
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageSongs;
