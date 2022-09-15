import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../store/notification-context";
import CommentList from "./comment-list";
import styles from "./comment.module.css";
import NewCommentForm from "./new-comments";

const Comments = ({ eventId }) => {
  const [displayComment, setDisplayComment] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const notificationCtx = useContext(NotificationContext);
  const [isFetchingComment, setIsFetchingComment] = useState(true);

  useEffect(() => {
    if (displayComment) {
      setIsFetchingComment(true);

      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setCommentList(data.comments);
          setIsFetchingComment(false);
        });
    }
  }, [displayComment]);

  const onAddComment = (details) => {
    notificationCtx.showNotification({
      status: "pending",
      title: "Submitting Comment...",
      message: "Storing your valuable comment.",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully submitted the comment",
        });
        setDisplayComment(true);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          status: "error",
          title: "Error!",
          message: error.message || "Something went wrong!",
        });
      });
  };

  return (
    <section className={styles.comments}>
      <button onClick={() => setDisplayComment(!displayComment)}>
        {displayComment ? "Hide Comments" : "Show Comments"}
      </button>
      {displayComment && <NewCommentForm onAddComment={onAddComment} />}
      {displayComment && !isFetchingComment && (
        <CommentList commentList={commentList} />
      )}
      {displayComment && isFetchingComment && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
