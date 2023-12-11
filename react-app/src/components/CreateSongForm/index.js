import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from '../../store/song';
import { useHistory } from 'react-router-dom';
import './CreateSongForm.css';

const CreateSongForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // const songData = {
    //   name,
    //   content,
    //   img,
    //   description,
    // };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("img", img);
    formData.append("description", description);

    const response = await dispatch(createSong(formData));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      setName('');
      setContent('');
      setImg('');
      setDescription('');
      history.push('/current');
    }
  };

  return (
    <form className="create-song-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <ul className="error-list">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="create-song-label">
        Name:
        <input
          className="create-song-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="create-song-label">
        Content:
        <input
          className="create-song-file-input"
          type="file"
          accepts="audio/*"
          onChange={(e) => setContent(e.target.files[0])}
        />
      </label>

      <label className="create-song-label">
        Image:
        <input
          className="create-song-file-input"
          type="file"
          accepts="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </label>
      <label className="create-song-label">
        Description:
        <textarea
          className="create-song-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button className="create-song-button" type="submit">Create Song</button>
    </form>
  );
};

export default CreateSongForm;
