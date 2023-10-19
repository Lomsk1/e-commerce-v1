import React, { useEffect, useState } from "react";

const Timer: React.FC<{ data: string }> = ({ data }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(data) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    // Make sure to clear the interval to prevent memory leaks
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // Re-run the effect when `data` changes

  return (
    <>
      <div className="hot_sale_time">
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
    </>
  );
};

export default Timer;
