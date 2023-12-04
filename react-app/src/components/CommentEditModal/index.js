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
    <div>
      <h2>Edit Comment</h2>
      <label>
        Edit your comment:
        <input
          type="text"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
      </label>
      <button onClick={handleEditComment}>Save Changes</button>
    </div>
  );
};

export default CommentEditModal;
