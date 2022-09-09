import EventItem from "./event-item";
import styles from "./event-list.module.css";

const EventList = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          image={item.image}
          location={item.location}
        />
      ))}
    </ul>
  );
};

export default EventList;
