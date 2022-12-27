import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const params = useParams();
  const { quoteId } = params;
  let comment;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addCommentHandler = () => {
    if (status === "pending") {
      comment = (
        <div className="centered">
          <LoadingSpinner />
        </div>
      );
    }

    if (
      status === "completed" &&
      (loadedComments || loadedComments.length > 0)
    ) {
      comment = <CommentsList comments={loadedComments} />;
    }

    if (
      status === "completed" &&
      (!loadedComments || loadedComments.length === 0)
    ) {
      comment = <p>No comments added yet</p>;
    }
  };
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddedComment={addCommentHandler} quoteId={quoteId} />
      )}
      {comment}
    </section>
  );
};

export default Comments;
