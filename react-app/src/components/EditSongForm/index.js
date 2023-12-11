import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editSong, fetchSongById } from '../../store/song';
import DeleteButton from '../DeleteButton';
import './EditSongForm.css';

const EditSongForm = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
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
      history.push('/current');
    }
  };

  return (
    <div className="edit-song-form-container">
      <form className="edit-song-form" onSubmit={handleSubmit}>
        <h1 className="edit-song-heading">Edit Song</h1>
        <div className="input-field">
          <label className="input-label">Name</label>
          <input
            className="input-text"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="input-field">
          <label className="input-label">Description</label>
          <textarea
            className="input-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <button className="submit-button" type="submit">Update Song</button>
        <DeleteButton songId={songId} />
      </form>
    </div>
  );
};

export default EditSongForm;
