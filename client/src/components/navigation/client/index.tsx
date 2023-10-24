import React from "react";
import { useNavigate } from "react-router-dom";
import AuthClientNavigation from "./components/auth";
import useAuthStore from "../../../store/client/user/useAuthStore";
import logo from "../../../assets/images/logos.png";
import SearchBarNavigation from "./components/searchBar";
import CartsNavigationComponent from "./components/wishlist";
import HeadingInformation from "../../headingInfo";
import NavigationMobileVersion from "./mobile";

const ClientNavigation: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore((state) => state);

  const navigate = useNavigate();
  return (
    <>
      <HeadingInformation />

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
          <CartsNavigationComponent />
        </div>
      </nav>

      {/* for mobile version */}
      <NavigationMobileVersion />

     
    </>
  );
};

export default ClientNavigation;
