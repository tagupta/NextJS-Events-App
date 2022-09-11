import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helper/api-util";

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

const HomePage = ({ events }) => {
  if (!events) {
    return <p className="center">Loading...</p>;
  }

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default HomePage;
