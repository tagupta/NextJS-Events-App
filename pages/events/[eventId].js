import { useRouter } from "next/router";
import EventContent from "../../components/event-details/event-content";
import EventLogistics from "../../components/event-details/event-logistics";
import EventSummary from "../../components/event-details/event-summary";
import { getEventById } from "../../dummy-data";
import styles from "../../styles/EventDetailPage.module.css";

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;

  const event = getEventById(eventId);
  return (
    <div>
      {event ? (
        <>
          <EventSummary title={event.title} />
          <div className={styles.detail}>
            <EventLogistics
              date={event.date}
              location={event.location}
              image={event.image}
              imageAlt={event.title}
            />
            <EventContent description={event.description} />
          </div>
        </>
      ) : (
        <h1>Event doesn't exist</h1>
      )}
    </div>
  );
};

export default EventDetailPage;
