import EventContent from "../../components/event-details/event-content";
import EventLogistics from "../../components/event-details/event-logistics";
import EventSummary from "../../components/event-details/event-summary";
import styles from "../../styles/EventDetailPage.module.css";

const getData = async () => {
  const response = await fetch(
    "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = await response.json();
  return data;
};

export async function getStaticPaths() {
  const data = await getData();
  const ids = [];

  for (const key in data) {
    ids.push(key);
  }

  const pathsWithParams = ids.map((id) => ({
    params: { eventId: id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;

  const data = await getData();

  const transformedData = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    });
  }

  const event = transformedData.find((data) => data.id === eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedEvent: event,
    },
  };
}

const EventDetailPage = ({ loadedEvent }) => {
  if (!loadedEvent) {
    return <p className="center">Loading...</p>;
  }
  const { title, date, location, image, description } = loadedEvent;
  return (
    <div>
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
    </div>
  );
};

export default EventDetailPage;
