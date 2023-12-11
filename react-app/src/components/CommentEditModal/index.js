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
    <div className="comment-edit-modal">
      <h2 className="edit-modal-heading">Edit Comment</h2>
      <label className="edit-modal-label">
        Edit your comment:
        <input
          className="edit-modal-input"
          type="text"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
      </label>
      <button className="edit-modal-button" onClick={handleEditComment}>
        Save Changes
      </button>
    </div>
  );
};

export default CommentEditModal;
