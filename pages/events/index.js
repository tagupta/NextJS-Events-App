import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const searchHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
    // const events = getFilteredEvents({year, month})
  };

  return (
    <div>
      <EventSearch onSearch={searchHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
