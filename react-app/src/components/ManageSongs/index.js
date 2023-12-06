import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteButton from "../DeleteButton";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSongs } from "../../store/song";
import SongCard from "../SongCard";

const ManageSongs = () => {
  const dispatch = useDispatch();
  const userSongs = useSelector((state) => state.songs.userSongs);

  useEffect(() => {
    dispatch(fetchUserSongs());
  }, [dispatch]);

  return (
    <div>
      <div className="manage-songs">
        <h1>Your Songs</h1>
        {userSongs.length === 0 ? (
          <div>
            <p>You currently have no songs.</p>
            <p>Would you like to upload a new song?</p>
            <Link to="/new">
              <button>Upload New Song</button>
            </Link>
          </div>
        ) : (
          userSongs.map((song) => (
            <div key={song.id}>
              <SongCard song={song} />
              <Link to={`/songs/edit/${song.id}`}>
                <button>Edit Song</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageSongs;
