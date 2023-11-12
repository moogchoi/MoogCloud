import React from 'react';
import { useDispatch } from 'react-redux';
import { removeSong } from '../../store/song';
import { useHistory } from 'react-router-dom';

const DeleteButton = ({ songId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(removeSong(songId));

    history.push('/current');
  };

  return (
    <button onClick={handleDelete}>Delete Song</button>
  );
};

export default DeleteButton;
