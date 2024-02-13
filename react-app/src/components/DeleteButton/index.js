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
    <div className="flex justify-end">
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-semibold text-center inline-block py-2 px-3 rounded mt-2 w-20" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteButton;
