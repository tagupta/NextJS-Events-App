import EventList from "../components/events/event-list";
import useSWR from "swr";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  const data = await response.json();

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

  const featuredEvents = transformedData.filter(
    (data) => data.isFeatured === true
  );

  return {
    props: {
      events: featuredEvents,
    },
  };
}

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
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
      const featuredEvents = transformedData.filter(
        (data) => data.isFeatured === true
      );

      return featuredEvents;
    });

const HomePage = ({ events }) => {
  const [featuredEvents, setFeaturedEvents] = useState(events);

  const { data, error } = useSWR(
    "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      setFeaturedEvents(data);
    }
  }, [data]);

  if (error) {
    return <p className="center">Failed to load.</p>;
  }

  if (!data && !featuredEvents) {
    return <p className="center">Loading...</p>;
  }

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
