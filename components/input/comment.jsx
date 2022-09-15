import { useEffect, useState } from "react";
import CommentList from "./comment-list";
import styles from "./comment.module.css";
import NewCommentForm from "./new-comments";

const Comments = ({ eventId }) => {
  const [displayComment, setDisplayComment] = useState(false);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (displayComment) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => setCommentList(data.comments));
    }
  }, [displayComment]);

  const onAddComment = (details) => {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={styles.comments}>
      <button onClick={() => setDisplayComment(!displayComment)}>
        {displayComment ? "Hide Comments" : "Show Comments"}
      </button>
      {displayComment && <NewCommentForm onAddComment={onAddComment} />}
      {displayComment && <CommentList commentList={commentList} />}
    </section>
  );
};

export default Comments;
