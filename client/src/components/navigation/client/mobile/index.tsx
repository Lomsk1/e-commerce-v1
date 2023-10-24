import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logos.png";
import NavMobileWishCart from "./wishCart";
import { useState } from "react";
import NavMobileSearchWrapper from "./wrapper";

const NavigationMobileVersion = () => {
  /* Routes */
  const navigate = useNavigate();

  /* States */
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <nav className="for_mobile_nav">
        {/* Burger */}
        <div className="burger">
          <input
            id="burger_1"
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
          {/* Wishlist and Cart */}
          <NavMobileWishCart />
        </div>
        {/* Burger */}
        <div className="burger">
          <input
          id="burger_2"
            type="checkbox"
            onChange={() => {
              setChecked(!checked);
            }}
            checked={checked}
          />
          <span className="hamburger"></span>
        </div>
      </nav>

      <NavMobileSearchWrapper
        setChecked={(e) => setChecked(e.check)}
        checked={checked}
      />
    </>
  );
};

export default NavigationMobileVersion;
