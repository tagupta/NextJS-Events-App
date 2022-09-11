import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../dummy-data";

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  const filteredData = params.slug;
  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  )
    return {
      notFound: true,
    };

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

  let filteredEvents = transformedData.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      filteredEvents,
      year: numYear,
      month: numMonth,
    },
  };
}
const FilteredEventsPage = ({ filteredEvents, year, month }) => {
  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

  const date = new Date(year, month - 1);
  // const router = useRouter();

  // const filteredData = router.query.slug;
  // if (!filteredData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // if (
  //   isNaN(numYear) ||
  //   isNaN(numMonth) ||
  //   numYear > 2030 ||
  //   numYear < 2021 ||
  //   numMonth > 12 ||
  //   numMonth < 1
  // ) {
  //   return (
  //     <Fragment>
  //       <p className="center">Invalid filter. Please adjust your values.</p>
  //       <div className="center">
  //         <Button link="/events">Show all events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  // if (!filteredEvents || filteredEvents.length === 0) {
  //   return (
  //     <Fragment>
  //       <p className="center">No events found for the chosen filter.</p>
  //       <div className="center">
  //         <Button link="/events">Show all events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // const date = new Date(numYear, numMonth - 1);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
