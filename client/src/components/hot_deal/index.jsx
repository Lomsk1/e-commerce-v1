import { useEffect } from "react";
import { useState } from "react";

function HotDeal({ data }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(data.deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(data.deadline), 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section
        className="hot_deal"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_APP_BASE_URL + data.image
          })`,
        }}
      >
        <div className="center">
          <div className="timer">
            <div>
              <p>{days < 10 ? "0" + days : days}</p>
              <span>DAYS</span>
            </div>
            <div>
              <p>{hours < 10 ? "0" + hours : hours}</p>
              <span>HOURS</span>
            </div>
            <div>
              <p>{minutes < 10 ? "0" + minutes : minutes}</p>
              <span>MINS</span>
            </div>
            <div>
              <p>{seconds < 10 ? "0" + seconds : seconds}</p>
              <span>SECS</span>
            </div>
          </div>

          <div className="title">
            <h1>{data.title && data.title}</h1>
          </div>

          <div className="sales">
            <p>{data.text && data.text}</p>
          </div>

          <button>Shop Now</button>
        </div>
      </section>
    </>
  );
}

export default HotDeal;
