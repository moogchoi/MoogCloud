import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editSong, fetchSongById } from '../../store/song';
import DeleteButton from '../DeleteButton';

const EditSongForm = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs.currentSong);
  const [name, setName] = useState(song?.name || '');
  const [description, setDescription] = useState(song?.description || '');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchSongById(songId));
  }, [dispatch, songId]);

  useEffect(() => {
    setName(song?.name || '');
    setDescription(song?.description || '');
  }, [song]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const updatedData = {
      name,
      description,
    };

    const updatedSong = await dispatch(editSong(songId, updatedData));

    if (updatedSong.errors) {
      setErrors(updatedSong.errors);
    } else {
    }
  };

  return (
    <div className="edit-song-form">
      <form onSubmit={handleSubmit}>
        <h1>Edit Song</h1>
        <div className="input-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="errors">{errors.name}</span>}
        </div>
        <div className="input-field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <span className="errors">{errors.description}</span>
          )}
        </div>
        <button type="submit">Update Song</button>
        <DeleteButton songId={songId} />
      </form>
    </div>
  );
};

export default EditSongForm;
