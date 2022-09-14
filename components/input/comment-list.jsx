import { useEffect, useState } from "react";
import styles from "./comment-list.module.css";

const CommentList = ({ commentList }) => {
  if (commentList.length === 0) {
    return <p className={styles.comments}>No Comments...</p>;
  }

  return (
    <section className={styles.comments}>
      <h3>Comments</h3>
      <ul>
        {commentList.map((comment) => (
          <li key={comment._id}>
            <p>{comment.comment}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommentList;
