import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helper/api-util";
import Head from "next/head";
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
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <EventList items={events} />
    </div>
  );
};

export default HomePage;
