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
    <div className="bg-white shadow rounded-lg w-full max-w-[40%] mx-auto mt-8">
      <form className="px-5 py-7" onSubmit={handleSubmit}>
        <h1 className="text-lg font-semibold text-gray-800 mb-5">Edit Song</h1>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">Name</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 w-full text-sm"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">Description</label>
          <textarea
            className="border rounded-lg px-3 py-2 mt-1 w-full text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>
        <div className="flex justify-end">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-semibold text-center inline-block py-2 px-3 rounded w-20"
          type="submit"
        >
          Update
        </button>
        </div>
        <DeleteButton songId={songId} />
      </form>
    </div>

  );
};

export default EditSongForm;
