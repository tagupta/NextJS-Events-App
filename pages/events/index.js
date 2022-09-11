import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { useRouter } from "next/router";
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

  return {
    props: {
      events: transformedData,
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
      return transformedData;
    });

const AllEventsPage = ({ events }) => {
  const [eventList, setEventList] = useState(events);

  const { data, error } = useSWR(
    "https://nextjs-course-41eb5-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      setEventList(data);
    }
  }, [data]);

  const router = useRouter();

  const searchHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  if (error) {
    return <p>Failed to load..</p>;
  }

  if (!data && !eventList) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventSearch onSearch={searchHandler} />
      <EventList items={eventList} />
    </div>
  );
};

export default AllEventsPage;
