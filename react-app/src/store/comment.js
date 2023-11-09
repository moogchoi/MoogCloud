// constants
const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const fetchComments = (songId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${songId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getComments(data));
  }
};

export const addNewComment = (songId, commentData) => async (dispatch) => {
  const response = await fetch(`/api/comments/${songId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addComment(data));
  }
};

export const editComment = (commentId, updatedData) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateComment(data));
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
  }
};

const initialState = { comments: [] };

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, comments: action.payload };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case UPDATE_COMMENT:
      const updatedIndex = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        const updatedComments = [...state.comments];
        updatedComments[updatedIndex] = action.payload;
        return { ...state, comments: updatedComments };
      }
      return state;
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload),
      };
    default:
      return state;
  }
}
