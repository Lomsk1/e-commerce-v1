import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartForNavigation: React.FC = () => {
  return (
    <>
      <div className="main cart">
        <div className="svg" 
        // onClick={cartLongHandler}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <div className="amount">
            {/* <p>{cartLengthLocal}</p> */}
          </div>
        </div>
        <p className="title" 
        // onClick={cartLongHandler}
        >
          Your Cart
        </p>
        {/* {cartLong && (
          <CartWrapper
            data={cartData}
            visible={cartLong}
            close={cartLongHandler}
          />
        )} */}
      </div>
    </>
  );
};

export default CartForNavigation;
