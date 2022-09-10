import Button from "../ui/button";
import styles from "./results-title.module.css";

const ResultsTitle = ({ date }) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.filteredTitle}>
      <h3>Events in {humanReadableDate}</h3>
      <Button link="/events">Show all events</Button>
    </section>
  );
};

export default ResultsTitle;
