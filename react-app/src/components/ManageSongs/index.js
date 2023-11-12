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
      <h1>Your Songs</h1>
      {userSongs.map((song) => (
        <>
          <SongCard key={song.id} song={song} />
          <DeleteButton songId={song.id} />
          <Link to={`/songs/edit/${song.id}`}>
            <button>Edit Song</button>
          </Link>
        </>
      ))}
    </div>
  );
};

export default ManageSongs;
