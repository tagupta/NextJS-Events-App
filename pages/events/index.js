import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helper/api-util";

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  const searchHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventSearch onSearch={searchHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
