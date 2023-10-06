import {
  faFacebook,
  faFacebookF,
  faHackerNews,
  faLinkedinIn,
  faMailchimp,
} from "@fortawesome/free-brands-svg-icons";
import {
  fa5,
  faCheck,
  faFire,
  faGuaraniSign,
  faMailBulk,
  faMailForward,
  faMailReply,
  faPercent,
  faShield,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBrandData } from "../../API/brand/action";
import { getAllNewsData } from "../../API/news/action";
import { getAllProductData } from "../../API/product/actions";
import { createSubscription } from "../../API/subscription/actions";
import { getAllWeeklySaleData } from "../../API/weekly_sale/action";
import BrandSlider from "../../components/brand_slide";
import Footer from "../../components/footer";
import HeadingInformation from "../../components/heading_info";
import HotDeal from "../../components/hot_deal";
import LabelProducts from "../../components/label_product";
import MainSlide from "../../components/main_slide";
import Navigation from "../../components/navigation";
import ProductSlideContainer from "../../components/products_slide";
import ProductLongContainer from "../../components/product_container";
import LocalContext from "../../hoc/localstore";
import { ProductApi, SlideImages } from "../../local_api";
import { BgApi } from "../../local_api";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [saleData, setSaleData] = useState([]);
  const [newProductData, setNewProductData] = useState([]);

  //////////////////////// S E L E C T O R S ///////////////////////
  const { productData, isLoading } = useSelector((state) => state.product);
  const { newsData } = useSelector((state) => state.news);
  const { weeklySaleData, isLoading: weeklyIsLoading } = useSelector(
    (state) => state.weekly_sale
  );
  const { brandDataIsLoading } = useSelector((state) => state.brand);

  //////////////////////// D A T A ///////////////////////
  useEffect(() => {
    dispatch(getAllProductData());
    dispatch(getAllNewsData());
    dispatch(getAllWeeklySaleData());
    dispatch(getAllBrandData());
  }, []);

  // Sale Data
  useEffect(() => {
    let isSub = true;
    if (isSub) {
      setSaleData(productData.filter((data) => data.sale > 0));
    }
    return () => {
      isSub = false;
    };
  }, [!isLoading]);

  // New Product Data
  useEffect(() => {
    let isSub = true;
    if (isSub) {
      setNewProductData(productData.filter((data) => data.new === true));
    }
    return () => {
      isSub = false;
    };
  }, [!isLoading]);

  // Category
  const [categoryValue, setCategoryValue] = useState("top");
  const [topBg, setTopBg] = useState(true);
  const [budgetBg, setBudgetBg] = useState(false);
  const [popularBg, setPopularBg] = useState(false);

  const [topProductAPI, setTopProduct] = useState([]);
  const [budgetProductAPI, setBudgetProduct] = useState([]);
  const [popularProductAPI, setPopularProduct] = useState([]);

  useEffect(() => {
    let isSub = true;
    if (isSub) {
      setTopProduct(productData.filter((data) => data.top === true));
      setBudgetProduct(
        productData.filter(
          (data) =>
            data.price <= 1200 || (data.new_price > 0 && data.new_price <= 1200)
        )
      );
      setPopularProduct(productData.filter((data) => data.popularity === true));
    }
    return () => {
      isSub = false;
    };
  }, [!isLoading]);

  /////////////////////// S U B S C R I B E //////////////////////////////
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createSubscription(data));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      alert("Successfully Added");
    }
  }, [formState, reset]);

  return (
    <>
      <HeadingInformation />
      <Navigation main_page />

      {newsData?.length > 0 && <MainSlide />}

      {/* Hot Sales */}
      <LabelProducts icons={faFire} title="Hot Sales">
        <button
          className="sales_button"
          onClick={() => {
            navigate("/hot_deal_main_page");
          }}
        >
          More Sales
        </button>
      </LabelProducts>

      <ProductSlideContainer data={saleData} />

      {/* New Products */}
      <LabelProducts icons={faHackerNews} title="New Products">
        <button
          className="sales_button"
          onClick={() => {
            navigate("/new_product");
          }}
        >
          More Products
        </button>
      </LabelProducts>

      <ProductSlideContainer data={newProductData} />

      {/* Hot Deal */}
      {/* {weeklySaleData.length() === 1 && } */}

      {!weeklyIsLoading
        ? weeklySaleData.length === 1 && <HotDeal data={weeklySaleData[0]} />
        : ""}

      {/* By Category */}
      <LabelProducts icons={faCheck} butt>
        <form action="">
          <div style={{ backgroundColor: topBg && "#1B4353" }}>
            <label htmlFor="top_productions">Top Productions</label>
            <input
              type="radio"
              name="category"
              id="top_productions"
              value={"top"}
              onChange={(e) => {
                setCategoryValue(e.target.value);
              }}
              onClick={() => {
                setTopBg(true);
                setBudgetBg(false);
                setPopularBg(false);
              }}
            />
          </div>
          <div style={{ backgroundColor: budgetBg && "#1B4353" }}>
            <label htmlFor="budget">Budget</label>
            <input
              type="radio"
              name="category"
              id="budget"
              value={"budget"}
              onChange={(e) => {
                setCategoryValue(e.target.value);
              }}
              onClick={() => {
                setTopBg(false);
                setBudgetBg(true);
                setPopularBg(false);
              }}
            />
          </div>
          <div style={{ backgroundColor: popularBg && "#1B4353" }}>
            <label htmlFor="popular">Popular</label>
            <input
              type="radio"
              name="category"
              id="popular"
              value={"popular"}
              onChange={(e) => {
                setCategoryValue(e.target.value);
              }}
              onClick={() => {
                setTopBg(false);
                setBudgetBg(false);
                setPopularBg(true);
              }}
            />
          </div>{" "}
        </form>
      </LabelProducts>
      {categoryValue == "top" && <ProductSlideContainer data={topProductAPI} />}
      {categoryValue === "budget" && (
        <ProductSlideContainer data={budgetProductAPI} />
      )}
      {categoryValue === "popular" && (
        <ProductSlideContainer data={popularProductAPI} />
      )}

      {/* Brands */}
      <LabelProducts icons={faUserShield} title="Brands"></LabelProducts>

      {!brandDataIsLoading && <BrandSlider />}

      {/* Subscribe */}
      <section className="sub_section">
        <div className="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email..."
              {...register("email", { required: true })}
            />
            <button className="mail">
              <FontAwesomeIcon icon={faMailForward} />
            </button>
          </form>
        </div>
        <div className="right">
          <div className="container">
            <div className="icons">
              <FontAwesomeIcon icon={faFacebookF} />
            </div>
            <div className="icons">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
          </div>
          <h2>Subscribe Now!</h2>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
