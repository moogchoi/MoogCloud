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

    // const songData = {
    //   name,
    //   content,
    //   duration,
    //   img,
    //   description,
    // };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("duration", duration);
    formData.append("img", img);
    formData.append("description", description);

    const response = await dispatch(createSong(formData));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      setName('');
      setContent('');
      setDuration(0);
      setImg('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}
    encType="multipart/form-data"
    >
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
        Content:
        <input
          type="file"
          accepts="audio/*"
          onChange={(e) => setContent(e.target.files[0])}
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
          type="file"
          accepts="image/*"
          onChange={(e) => setImg(e.target.files[0])}
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
