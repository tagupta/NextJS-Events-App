import { useState } from "react";
import CommentList from "./comment-list";
import styles from "./comment.module.css";
import NewCommentForm from "./new-comments";

const Comments = () => {
  const [toggleDisplayComment, setToggleDisplayComment] = useState(false);
  return (
    <section className={styles.comments}>
      <button onClick={() => setToggleDisplayComment(!toggleDisplayComment)}>
        {toggleDisplayComment ? "Hide Comments" : "Show Comments"}
      </button>
      {toggleDisplayComment && <NewCommentForm />}
      {toggleDisplayComment && <CommentList />}
    </section>
  );
};

export default Comments;
