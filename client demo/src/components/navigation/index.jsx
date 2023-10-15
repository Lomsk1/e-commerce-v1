import {
  faArrowRightFromBracket,
  faCartShopping,
  faHeart,
  faPercent,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth, loadUser } from "../../API/auth/actions";
import { getAllCategoryData } from "../../API/category/action";
import { getAllProductData } from "../../API/product/actions";
import { getWishlistByUser } from "../../API/wishlist/action";
import logo from "../../assets/images/logo.png.webp";
import logoZappy from "../../assets/images/logo.png";
import LocalContext from "../../hoc/localstore";
import { setFilteredIs } from "../../redux/client/filter/slice";
import CartWrapper from "../cart_wrapper";
import SearchBar from "../search_bar";

function Navigation({ main_page }) {
  // const navigate = useNavigate();

  // API
  const dispatch = useDispatch();
  const { categoryData, isLoading } = useSelector((state) => state.category);
  const { productData } = useSelector((state) => state.product);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const { isLoading: wishIsLoading, wishlistData } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getAllCategoryData());
    dispatch(getAllProductData());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [isAuthenticated]);

  const [checked, setChecked] = useState(false);

  ///// Admin /////
  // const [adminLong, setAdminLong] = useState(false);
  const [adminSmall, setAdminSmall] = useState(false);

  // const adminLongHandler = () => {
  //   setAdminLong(!adminLong);
  // };
  const adminSmallHandler = () => {
    setAdminSmall(!adminSmall);
  };

  ////// Profile

  // const [profileLong, setProfileLong] = useState(false);
  const [profileSmall, setProfileSmall] = useState(false);

  // const profileLongHandler = () => {
  //   setProfileLong(!profileLong);
  // };

  const profileSmallHandler = () => {
    setProfileSmall(!profileSmall);
  };

  ///// Cart
  // const [cartLong, setCartLong] = useState(false);
  // const [cartSmall, setCartSmall] = useState(false);

  // const [cartData, setCartData] = useState([]);

  // const cartLongHandler = () => {
  //   setCartLong(!cartLong);
  //   setCartData(JSON.parse(localStorage.getItem("cart")));
  // };

  // useEffect(() => {
  //   setCartData(JSON.parse(localStorage.getItem("cart")));
  // }, [localStorage.getItem("cart")]);

  // const cartSmallHandler = () => {
  //   setCartSmall(!cartSmall);
  // };

  ///// Search Bar
  const [searchLong, setSearchLong] = useState(false);
  const [searchSmall, setSearchSmall] = useState(false);

  const [searchData, setSearchData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { register: registerMobile, handleSubmit: handleSubmitMobile } =
    useForm();

  const onSearchHandler = (data) => {
    setSearchData(
      productData.filter((info) =>
        info.title.toString().toLowerCase().includes(data.search.toLowerCase())
      )
    );
  };

  const onSearchHandlerMobile = (data) => {
    setSearchData(
      productData.filter((info) =>
        info.title.toString().toLowerCase().includes(data.search.toLowerCase())
      )
    );
  };

  const searchLongHandler = () => {
    setSearchLong(!searchLong);
    setSearchData([]);
  };
  const searchSmallHandler = (e) => {
    setSearchSmall(!searchSmall);
    setSearchData([]);
  };

  // Cart & Wish

  const { cartLengthLocal } = useContext(LocalContext);

  return (
    <>
     
    </>
  );
}

export default Navigation;
