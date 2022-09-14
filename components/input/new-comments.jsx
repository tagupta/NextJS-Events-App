import { useRef, useState } from "react";
import styles from "./new-comments.module.css";

const NewCommentForm = (props) => {
  const [isValid, setIsValid] = useState(false);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const handleNewComment = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsValid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      comment: enteredComment,
    });
  };

  return (
    <section>
      <form className={styles.form} onSubmit={handleNewComment}>
        <div className={styles.row}>
          <div className={styles.control}>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your name</label>
            <input type="name" id="name" ref={nameInputRef} />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="comment">Your comment</label>
          <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
        </div>
        {isValid && (
          <p className={styles.message}>Please enter valid values.</p>
        )}
        <button>Submit</button>
      </form>
    </section>
  );
};

export default NewCommentForm;
