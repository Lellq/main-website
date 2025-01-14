import Link from "next/link";
import { EventObject } from "src/api/EventsAPI";
import { isURL, getAbsoluteURL, getDateTime, formatURLEventTitle } from "src/utils/general";

const HomeEvents: React.FC<{ events: Array<EventObject> }> = ({ events }) => {
  return (
    <section className="home__events">
      <div className="home__events__grid">
        <div className="home__events__grid__header">
          <h1>Events</h1>
          <p>ACM at UCSD hosts 120+ events for our diverse array of students.</p>
        </div>
      </div>
      <div className="home__events__grid__container" tabIndex={0}>
        {events && events.length > 0 ? (
          events.map((value, index) => {
            const timing = getDateTime(value);
            const eventLink = `/events/${formatURLEventTitle(value.title)}-${value.uuid}`;
            return (
              <Link href={eventLink} key={value.uuid} passHref>
                <div className="home__events__grid__container__event" key={index}>
                  <img src={value.cover} alt={value.title} />
                  <h2>
                    <span>{timing.date}</span>
                    {timing.time}
                  </h2>
                  {isURL(value.location.trim()) ? (
                    <a className="link" href={getAbsoluteURL(value.location.trim())}>
                      <h3>{value.location}</h3>
                    </a>
                  ) : (
                    <h3>{value.location}</h3>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="home__events__grid__container__event--default">
            <p>
              No events this week. <br /> Check back later!
            </p>
          </div>
        )}
        <div aria-hidden="true" className="event end" />
      </div>
      <Link href="/events">
        <a className="home__events__see-all">See All Events &gt;</a>
      </Link>
    </section>
  );
};

export default HomeEvents;
