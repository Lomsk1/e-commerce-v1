import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocalContext from "../../../context/cart";
import { useContext, useEffect, useState } from "react";
import { ProductType } from "../../../types/product";
import CartWrapper from "../wrapper";

const CartForNavigation: React.FC = () => {
  /* Context Local */
  const { cartLengthLocal } = useContext(LocalContext);

  /* States */
  const [cartLong, setCartLong] = useState<boolean>(false);
  // const [cartSmall, setCartSmall] = useState(false);

  const [cartData, setCartData] = useState<ProductType["data"][] | []>([]);

  /* Functions */
  const cartLongHandler = (): void => {
    setCartLong(!cartLong);
    setCartData(JSON.parse(localStorage.getItem("cart") || "[]"));
  };

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cart") || "[]"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("cart")]);

  // const cartSmallHandler = () => {
  //   setCartSmall(!cartSmall);
  // };

  return (
    <>
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
    </>
  );
};

export default CartForNavigation;
