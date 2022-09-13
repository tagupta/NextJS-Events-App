import styles from "./comment-list.module.css";
const CommentList = () => {
  return (
    <section className={styles.comments}>
      <h3>Comments</h3>
      <ul>
        <li>
          <p>My comment is amazing</p>
          <div>
            By <address>Maxiii</address>
          </div>
        </li>
        <li>
          <p>My comment is amazing</p>
          <div>
            By <address>Maxiii</address>
          </div>
        </li>
        <li>
          <p>My comment is amazing</p>
          <div>
            By <address>Maxiii</address>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default CommentList;
