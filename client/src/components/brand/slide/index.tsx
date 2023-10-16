import Slider from "react-slick";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { brandsTypes } from "../../../types/brand";

const BrandSlider: React.FC<{ brandData: brandsTypes }> = ({ brandData }) => {
  //   const navigate = useNavigate();

  const [widthSize, setWidthSize] = useState<number>(5);
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

  return (
    <>
      <section className="brand_slider">
        <Slider
          lazyLoad="progressive"
          pauseOnDotsHover
          centerMode
          autoplaySpeed={1000}
          autoplay
          adaptiveHeight
          slidesToScroll={1}
          slidesToShow={widthSize}
          speed={500}
          infinite
        >
          {/* {brandData?.data.map((brands) => (
            <div
              key={brands.id}
              className="contain"
              onClick={() => {
                //   navigate(`/brand_page/${brands.name}/${brands.id}`);
              }}
            >
              <img src={brands.thumbnail.url} alt="thumbnail" />
            </div>
          ))} */}
        </Slider>
      </section>
    </>
  );
};

export default BrandSlider;
