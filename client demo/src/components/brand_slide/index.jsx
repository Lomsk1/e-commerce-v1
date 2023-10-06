import Slider from "react-slick";
import { BrandApi } from "../../local_api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BrandSlider() {
  const navigate = useNavigate();

  const { brandData, brandDataIsLoading } = useSelector((state) => state.brand);

  const [widthSize, setWidthSize] = useState(5);
  useEffect(() => {
    let isSub = true;

    if (isSub) {
      if (window.innerWidth <= 1600) {
        setWidthSize(4);
      }
      if (window.innerWidth <= 1310) {
        setWidthSize(3);
      }
      if (window.innerWidth <= 990) {
        setWidthSize(2);
      }
    }

    return () => {
      isSub = false;
    };
  }, []);

  const settings = {
    // dots: true,
    // accessibility:false,
    infinite: true,
    speed: 500,
    slidesToShow: widthSize,
    slidesToScroll: 1,

    adaptiveHeight: true,
    autoPlay: true,
    autoplaySpeed: 1000,
    centerMode: true,
    lazyLoad: "progressive", //ondemand
    pauseOnDotsHover: true,
  };
  return (
    <>
      <section className="brand_slider">
        <Slider {...settings}>
          {!brandDataIsLoading &&
            brandData.map((brands) => (
              <div
                key={brands.id}
                className="contain"
                onClick={() => {
                  navigate(`/brand_page/${brands.name}/${brands.id}`);
                }}
              >
                <img
                  src={import.meta.env.VITE_APP_BASE_URL + brands.thumbnail}
                  alt=""
                />
              </div>
            ))}
        </Slider>
      </section>
    </>
  );
}

export default BrandSlider;
