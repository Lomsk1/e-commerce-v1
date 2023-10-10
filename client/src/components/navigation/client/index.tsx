import React from "react";
import { useNavigate } from "react-router-dom";
import AuthClientNavigation from "./components/auth";
import useAuthStore from "../../../store/client/user/useAuthStore";
import logo from "../../../assets/images/logos.png";
import SearchBarNavigation from "./components/searchBar";

const ClientNavigation: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore((state) => state);

  const navigate = useNavigate();
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
          <SearchBarNavigation />
        </div>

        <div className="right">
          {/* account */}

          <AuthClientNavigation
            isAuthenticated={isAuthenticated}
            userInfo={user?.user}
          />

          {/* wish list & cart */}
          <div className="wish_cart">
            <div className="main cart">
              {/* <div className="svg" onClick={cartLongHandler}>
                <FontAwesomeIcon icon={faCartShopping} />
                <div className="amount">
                  <p>{cartLengthLocal}</p>
                </div>
              </div> */}
              {/* <p className="title" onClick={cartLongHandler}>
                Your Cart
              </p> */}
              {/* {cartLong && (
                <CartWrapper
                  data={cartData}
                  visible={cartLong}
                  close={cartLongHandler}
                />
              )} */}
            </div>

            <div
              className="main wish"
              //   onClick={() => {
              //     if (isAuthenticated) {
              //       navigate("/wishlist_main_page");
              //     } else {
              //       navigate("/log_in");
              //     }
              //   }}
            >
              <div className="svg">
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                <div className="amount">
                  {/* <p>{!wishIsLoading ? wishlistData.length : 0}</p> */}
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
            // onChange={() => {
            //   setChecked(!checked);
            // }}
            // checked={checked}
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
            {/* <img src={logo} alt="" /> */}
          </div>
          <div className="wish_cart">
            <div className="wish_cart">
              <div className="main cart">
                {/* <div className="svg" onClick={cartSmallHandler}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <div className="amount">
                    <p>{cartLengthLocal}</p>
                  </div>
                </div> */}
                <p className="title">Your Cart</p>
                {/* {cartSmall && (
                  <CartWrapper
                    visible={cartSmall}
                    close={cartSmallHandler}
                    data={cartData}
                  />
                )} */}
              </div>

              <div
                className="main wish"
                onClick={() => {
                  navigate("/wishlist_main_page");
                }}
              >
                <div className="svg">
                  {/* <FontAwesomeIcon icon={faHeart} /> */}
                  <div className="amount">
                    {/* <p>{!wishIsLoading ? wishlistData.length : 0}</p> */}
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
            // onChange={() => {
            //   setChecked(!checked);
            // }}
            // checked={checked}
          />
          <span className="hamburger"></span>
        </div>
      </nav>

      {/* <div className="mobile_section" style={{ display: checked && "flex" }}> */}

      {/* Search Bar */}

      {/* <div className="search_bar little">
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
        </div> */}

      {/* Account & Categories */}

      {/* <div className="container">
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
      </div> */}
    </>
  );
};

export default ClientNavigation;
