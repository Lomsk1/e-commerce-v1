import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LocalContext from "../../../context/cart";
import Wrapper from "../../wrapper";
import TriangleSVG from "../../../assets/icons/triangle";
import { ProductType } from "../../../types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface PropTypes {
  close: () => void;
  visible: boolean;
  data: ProductType["data"][] | [];
}

const CartWrapper: React.FC<PropTypes> = ({ close, visible, data }) => {
  const navigate = useNavigate();

  const { removeCartLocal, increaseAmount, decreaseAmount, totalPrice } =
    useContext(LocalContext);

  // Price

  return (
    <>
      <Wrapper className="cart_Wrapper" visible={visible} close={close}>
        {/* Icon */}
        <div className="icon">
          <TriangleSVG />
        </div>
        {/* Title */}
        <div className="title_cart">
          <h1>Products</h1>
        </div>
        {/* Products */}
        <div className="product_container">
          {data && data.length > 0 ? (
            data.map((product) => (
              <div className="product_div" key={product?.id}>
                <div
                  className="cancel"
                  onClick={() => {
                    removeCartLocal(product?.id);
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </div>

                <div className="image">
                  <img src={product?.thumbnail?.url} alt="product" />
                </div>

                <div className="infos">
                  <div className="up">
                    <p>{product?.title && product.title}</p>
                  </div>
                  <div className="down">
                    <div className="left">
                      <button
                        className="but"
                        onClick={() => {
                          decreaseAmount(product?.id);
                        }}
                      >
                        -
                      </button>
                      <p>{product?.amount && product.amount}</p>
                      <button
                        className="but"
                        onClick={() => {
                          increaseAmount(product?.id);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="right">
                      {product.sale > 0 ? (
                        <p>
                          {product?.totalNewPrice ?? product.newPrice}{" "}
                          <span>$</span>
                        </p>
                      ) : (
                        <p>
                          {product?.totalPrice && product.totalPrice}{" "}
                          <span>$</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="error_div">No Data Found</div>
          )}
        </div>
        {/* Total_price */}
        <div className="total_price">
          <p>
            <span>Price:</span> {totalPrice}$
          </p>
        </div>

        <button
          className="button_cart"
          onClick={() => {
            navigate("/cart_main_page");
          }}
        >
          Your Cart
        </button>
      </Wrapper>
    </>
  );
};

export default CartWrapper;
