import { useState, useEffect } from "react";
import {
  getComments as getCommentBack,
  createComment as createCommentBack,
  deleteComment as deleteCommentBack,
  updateComment as updateCommentBack
} from "../Backend";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };
  const addComment = (text, parentId) => {
    createCommentBack(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Вы уверены, что хотите удалить комментарий?")) {
      deleteCommentBack(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };
  const updateComment = (text, commentId) => {
    updateCommentBack(text, commentId).then(()=>{
      const updatedBackendComments = backendComments.map(backendComment => {
        if (backendComment.id === commentId) {
          return {...backendComment, body: text };
        }
        return backendComment;
      })
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    })
  };

  useEffect(() => {
    getCommentBack().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Комментарии</h3>
      <div className="comment-form-title">Напишите ваш коментарий</div>
      <CommentForm submitLabel="Написать" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
