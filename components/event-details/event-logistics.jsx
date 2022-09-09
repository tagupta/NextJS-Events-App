import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import styles from "./event-logistics.module.css";

const EventLogistics = ({ date, location, image, imageAlt }) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  return (
    <section className={styles.logistics}>
      <div className={styles.logDetails}>
        <img src={`/${image}`} alt={imageAlt} />
        <div className={styles.content}>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventLogistics;
