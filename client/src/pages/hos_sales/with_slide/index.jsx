import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlideImages } from "../../../local_api";

function EachSale() {
  const params = useParams();

  const [slideData, setSlideData] = useState(null);
  useEffect(() => {
    let isSub = true;
    if (isSub) {
      setSlideData(SlideImages.filter((slide) => slide.id == params.id));
    }

    return () => {
      isSub = false;
    };
  }, [SlideImages]);

  return (
    <>
      <h1 style={{ color: "white" }}>This Page Will Come Soon</h1>
    </>
  );
}

export default EachSale;
