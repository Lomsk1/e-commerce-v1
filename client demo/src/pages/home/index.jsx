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


  return (
    <>
    
    </>
  );
}

export default Home;
