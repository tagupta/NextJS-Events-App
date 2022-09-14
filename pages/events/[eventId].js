import Head from "next/head";
import EventContent from "../../components/event-details/event-content";
import EventLogistics from "../../components/event-details/event-logistics";
import EventSummary from "../../components/event-details/event-summary";
import Comments from "../../components/input/comment";
import { getEventById, getFeaturedEvents } from "../../helper/api-util";
import styles from "../../styles/EventDetailPage.module.css";

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedEvent: event,
    },
    revalidate: 30,
  };
}

const EventDetailPage = ({ loadedEvent }) => {
  if (!loadedEvent) {
    return <p className="center">Loading...</p>;
  }
  const { title, date, location, image, description, id } = loadedEvent;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <EventSummary title={title} />
      <div className={styles.detail}>
        <EventLogistics
          date={date}
          location={location}
          image={image}
          imageAlt={title}
        />
        <EventContent description={description} />
      </div>
      <Comments eventId={id} />
    </div>
  );
};

export default EventDetailPage;
