import HeadingInformation from "../../../components/heading_info";
import Navigation from "../../../components/navigation";
import MainSlide from "../../../components/main_slide";
import HotDeal from "../../../components/hot_deal";
import { useEffect } from "react";
import ProductLongContainer from "../../../components/product_container";
import Footer from "../../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllNewsData } from "../../../API/news/action";
import { getAllWeeklySaleData } from "../../../API/weekly_sale/action";

function HotDealMain() {
  const dispatch = useDispatch();
  
  const { productData, isLoading } = useSelector((state) => state.product);
  const { newsData, isLoading: newsIsLoading } = useSelector(
    (state) => state.news
  );
  const { weeklySaleData, isLoading: weeklyIsLoading } = useSelector(
    (state) => state.weekly_sale
  );

  useEffect(() => {
    let isSub = true;
    if (isSub) {
      dispatch(getAllNewsData());
      dispatch(getAllWeeklySaleData());
    }
    return () => {
      isSub = false;
    };
  }, []);
  return (
    <>
      <HeadingInformation />
      <Navigation />

      <section className="hot_deal_main_section">
        {/* Presents for Slide */}
        {!newsIsLoading && newsData.length > 0 && (
          <>
            <div className="title_for_every">
              <h1>Present Time</h1>
            </div>

            <div className="present_slide_cont">
              <MainSlide />
            </div>
          </>
        )}

        {!weeklyIsLoading && weeklySaleData.length === 1 && (
          <>
            <div className="title_for_every second">
              <h1>Hot Deal This Week</h1>
            </div>

            <div className="present_slide_cont">
              {!weeklyIsLoading && <HotDeal data={weeklySaleData[0]} />}
            </div>
          </>
        )}

        {!isLoading && (
          <>
            <div className="title_for_every second">
              <h1>Hot Sails</h1>
            </div>
            <div className="sales_box">
              {productData &&
                productData
                  .filter((data) => data.sale > 0)
                  .map((sale) => (
                    <ProductLongContainer
                      style={{ margin: "1em" }}
                      thumbnail={sale.thumbnail}
                      category={sale.category}
                      title={sale.title}
                      price={sale.price}
                      new_price={sale.new_price}
                      new_item={sale.new_item}
                      sale={sale.sale}
                      id={sale.id}
                      key={sale.id}
                    />
                  ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

export default HotDealMain;
