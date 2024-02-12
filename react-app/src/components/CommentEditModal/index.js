import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, fetchCommentById } from '../../store/comment';
import { useModal } from '../../context/Modal';

const CommentEditModal = ({ commentId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    dispatch(fetchCommentById(commentId));
  }, [commentId, dispatch]);

  const commentToEdit = useSelector((state) => state.comments.currentComment);

  useEffect(() => {
    setEditedComment(commentToEdit?.text || '');
  }, [commentToEdit]);

  const handleEditComment = async () => {
    if (commentToEdit) {
      const updatedData = { text: editedComment };
      await dispatch(editComment(commentToEdit.id, updatedData));
      closeModal();
    }
  };

  return (
    <div className="bg-white shadow w-full rounded-lg">
      <form className="px-5 py-5" onSubmit={handleEditComment}>
        <label className="block mb-4">
          <span className="font-bold text-sm text-gray-600">Edit your comment:</span>
          <textarea
            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
            type="text"
            rows="2"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        </label>
        <div className="flex justify-end">
          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-semibold text-center inline-block py-2 px-3 rounded max-w-[100px]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentEditModal;
