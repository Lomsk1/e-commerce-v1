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
import AccountContainer from "../account_container";
import CartWrapper from "../cart_wrapper";
import ProfileContainer from "../profileContainer";
import SearchBar from "../search_bar";

function Navigation({ main_page }) {
  const navigate = useNavigate();

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
  const [adminLong, setAdminLong] = useState(false);
  const [adminSmall, setAdminSmall] = useState(false);

  const adminLongHandler = () => {
    setAdminLong(!adminLong);
  };
  const adminSmallHandler = () => {
    setAdminSmall(!adminSmall);
  };

  ////// Profile

  const [profileLong, setProfileLong] = useState(false);
  const [profileSmall, setProfileSmall] = useState(false);

  const profileLongHandler = () => {
    setProfileLong(!profileLong);
  };

  const profileSmallHandler = () => {
    setProfileSmall(!profileSmall);
  };

  ///// Cart
  const [cartLong, setCartLong] = useState(false);
  const [cartSmall, setCartSmall] = useState(false);

  const [cartData, setCartData] = useState([]);

  const cartLongHandler = () => {
    setCartLong(!cartLong);
    setCartData(JSON.parse(localStorage.getItem("cart")));
  };

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cart")));
  }, [localStorage.getItem("cart")]);

  const cartSmallHandler = () => {
    setCartSmall(!cartSmall);
  };

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
      <nav className="big_width">
        <div className="left">
          {/* logo */}
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="" />
          </div>

          {/* search bar */}
          <div className="search_bar">
            <form onSubmit={handleSubmit(onSearchHandler)}>
              <select
                name="category"
                id="category"
                onChange={(e) => {
                  if (e.target.value) {
                    navigate(
                      `/filer_page/${e.target.value.split(",")[1]}/${
                        e.target.value.split(",")[0]
                      }`
                    );
                    dispatch(setFilteredIs(false));
                  }
                }}
              >
                {main_page && <option value={null}>Choose Category</option>}

                {!isLoading ? (
                  categoryData.map((category) => (
                    <option
                      key={category.id}
                      value={category.id && `${category.id},${category.title}`}
                    >
                      {category.title && category.title}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
              <input
                type="search"
                placeholder="Search Here"
                onFocus={searchLongHandler}
                {...register("search", { required: true })}
              />
              <button type="submit">Search</button>
            </form>
            {searchLong && (
              <SearchBar
                data={searchData}
                visible={searchLong}
                close={searchLongHandler}
              />
            )}
          </div>
        </div>

        <div className="right">
          {/* account */}

          {isAuthenticated ? (
            <>
              <div className="account" onClick={profileLongHandler}>
                <FontAwesomeIcon icon={faUser} />
                <p>
                  Welcome <br />
                  {userInfo && userInfo.first_name}
                </p>
              </div>

              {profileLong && (
                <ProfileContainer
                  visible={profileLong}
                  close={profileLongHandler}
                />
              )}
            </>
          ) : (
            <>
              <div className="account" onClick={adminLongHandler}>
                <FontAwesomeIcon icon={faUser} />
                <p>My Account</p>
              </div>

              {adminLong && (
                <AccountContainer
                  visible={adminLong}
                  close={adminLongHandler}
                />
              )}
            </>
          )}

          {/* wish list & cart */}
          <div className="wish_cart">
            <div className="main cart">
              <div className="svg" onClick={cartLongHandler}>
                <FontAwesomeIcon icon={faCartShopping} />
                <div className="amount">
                  <p>{cartLengthLocal}</p>
                </div>
              </div>
              <p className="title" onClick={cartLongHandler}>
                Your Cart
              </p>
              {cartLong && (
                <CartWrapper
                  data={cartData}
                  visible={cartLong}
                  close={cartLongHandler}
                />
              )}
            </div>

            <div
              className="main wish"
              onClick={() => {
                if (isAuthenticated) {
                  navigate("/wishlist_main_page");
                } else {
                  navigate("/log_in");
                }
              }}
            >
              <div className="svg">
                <FontAwesomeIcon icon={faHeart} />
                <div className="amount">
                  <p>{!wishIsLoading ? wishlistData.length : 0}</p>
                </div>
              </div>
              <p className="title">Wishlist</p>
            </div>
          </div>
        </div>
      </nav>

      {/* for mobile version */}

      <nav className="for_mobile_nav">
        {/* Burger */}
        <div className="burger">
          <input
            type="checkbox"
            onChange={() => {
              setChecked(!checked);
            }}
            checked={checked}
          />
          <span className="hamburger"></span>
        </div>
        {/* Main */}
        <div className="middle">
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="" />
          </div>
          <div className="wish_cart">
            <div className="wish_cart">
              <div className="main cart">
                <div className="svg" onClick={cartSmallHandler}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <div className="amount">
                    <p>{cartLengthLocal}</p>
                  </div>
                </div>
                <p className="title">Your Cart</p>
                {cartSmall && (
                  <CartWrapper
                    visible={cartSmall}
                    close={cartSmallHandler}
                    data={cartData}
                  />
                )}
              </div>

              <div
                className="main wish"
                onClick={() => {
                  navigate("/wishlist_main_page");
                }}
              >
                <div className="svg">
                  <FontAwesomeIcon icon={faHeart} />
                  <div className="amount">
                    <p>{!wishIsLoading ? wishlistData.length : 0}</p>
                  </div>
                </div>
                <p className="title">Wishlist</p>
              </div>
            </div>
          </div>
        </div>
        {/* Burger */}
        <div className="burger">
          <input
            type="checkbox"
            onChange={() => {
              setChecked(!checked);
            }}
            checked={checked}
          />
          <span className="hamburger"></span>
        </div>
      </nav>
      <div className="mobile_section" style={{ display: checked && "flex" }}>
        {/* Search Bar */}
        <div className="search_bar little">
          <form onSubmit={handleSubmitMobile(onSearchHandlerMobile)}>
            <input
              type="search"
              placeholder="Searching..."
              onFocus={(e) => {
                searchSmallHandler(e);
              }}
              {...registerMobile("search", { required: true })}
            />
            {searchSmall && (
              <SearchBar
                data={searchData}
                visible={searchSmall}
                close={searchSmallHandler}
              />
            )}
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>

        {/* Account & Categories */}
        <div className="container">
          <div className="account_container">
            {isAuthenticated ? (
              <>
                <div className="account" onClick={profileSmallHandler}>
                  <FontAwesomeIcon icon={faUser} />
                  <p>
                    Welcome <br />
                    {userInfo && userInfo.first_name}
                  </p>
                </div>

                {profileSmall && (
                  <ProfileContainer
                    visible={profileSmall}
                    close={profileSmallHandler}
                  />
                )}
              </>
            ) : (
              <>
                <div className="account">
                  <FontAwesomeIcon icon={faUser} onClick={adminSmallHandler} />
                  <p onClick={adminSmallHandler}>My Account</p>
                  {adminSmall && (
                    <AccountContainer
                      visible={adminSmall}
                      close={adminSmallHandler}
                    />
                  )}
                </div>
              </>
            )}

            <div
              className="account"
              onClick={() => {
                navigate("/hot_deal_main_page");
              }}
            >
              <FontAwesomeIcon icon={faPercent} />
              <p>All Hot Sales</p>
            </div>
          </div>

          <div className="categories_container">
            <ul>
              {!isLoading ? (
                categoryData.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => {
                      navigate(`/filer_page/${category.title}/${category.id}`);
                      dispatch(setFilteredIs(false));
                      setChecked(false);
                    }}
                  >
                    <div className="icons">
                      <img
                        src={import.meta.env.VITE_APP_BASE_URL + category.image}
                        alt=""
                      />
                    </div>
                    <p>{category.title}</p>
                    <div className="arrow">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>
                  </li>
                ))
              ) : (
                <li>loading...</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
