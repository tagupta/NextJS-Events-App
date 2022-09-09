import styles from "./event-content.module.css";
const EventContent = ({ description }) => {
  return (
    <section className={styles.description}>
      <p>{description}</p>
    </section>
  );
};

export default EventContent;
