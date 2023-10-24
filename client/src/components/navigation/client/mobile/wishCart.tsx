import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalContext from "../../../../context/cart";
import { ProductType } from "../../../../types/product";
import CartWrapper from "../../../cart/wrapper";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import useAuthStore from "../../../../store/client/user/useAuthStore";
import useWishlistStore from "../../../../store/client/wishlist/wishlist";

const NavMobileWishCart = () => {
  /* Routes */
  const navigate = useNavigate();

  /* States */
  const [cartSmall, setCartSmall] = useState<boolean>(false);
  const [cartData, setCartData] = useState<ProductType["data"][] | []>([]);

  /* Stores */
  const { isAuthenticated } = useAuthStore((state) => state);
  const { wishlist } = useWishlistStore((state) => state);

  /* Functions */
  const cartSmallHandler = () => {
    setCartSmall(!cartSmall);
    setCartData(JSON.parse(localStorage.getItem("cart") || "[]"));
  };

  /* UseEffect */
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cart") || "[]"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("cart")]);

  /* Context */
  const { cartLengthLocal } = useContext(LocalContext);

  return (
    <>
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
              if (isAuthenticated) {
                navigate("/wishlist");
              } else {
                navigate("/login");
              }
            }}
          >
            <div className="svg">
              <FontAwesomeIcon icon={faHeart} />
              <div className="amount">
                <p>{wishlist?.result}</p>
              </div>
            </div>
            <p className="title">Wishlist</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMobileWishCart;
