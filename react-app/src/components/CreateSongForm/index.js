import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from '../../store/song';

const CreateSongForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState(0);
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const songData = {
      name,
      content,
      duration,
      img,
      description,
    };

    const response = await dispatch(createSong(songData));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      // Reset the form fields
      setName('');
      setContent('');
      setDuration(0);
      setImg('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Content (URL):
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label>
        Duration (seconds):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <label>
        Image (URL):
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Create Song</button>
    </form>
  );
};

export default CreateSongForm;
