import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function MainSlide() {
  const navigate = useNavigate();

  const { newsData, isLoading } = useSelector((state) => state.news);

  const [widthSize, setWidthSize] = useState(true);
  useEffect(() => {
    let isSub = true;

    if (isSub) {
      if (window.innerWidth <= 600) {
        setWidthSize(false);
      }
    }

    return () => {
      isSub = false;
    };
  }, []);
  return (
    <>
      {/* home scss */}
      <section className="slide_section">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          adaptiveHeight={true}
          arrows={false}
          centerMode={widthSize}
          autoplay={true}
          autoplaySpeed={4000}
          pauseOnHover={true}
        >
          {!isLoading &&
            newsData.map((images) => (
              <div
                key={images.id}
                className="image_div"
                // onClick={() => {
                //   navigate(`/each_sale/${images.id}`);
                // }}
              >
                <img
                  src={import.meta.env.VITE_APP_BASE_URL + images.image}
                  alt=""
                />
              </div>
            ))}
        </Slider>
      </section>
    </>
  );
}

export default MainSlide;
