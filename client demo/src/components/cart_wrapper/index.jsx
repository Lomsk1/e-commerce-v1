import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { map } from "leaflet";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TriangleSVG from "../../assets/icons/triangle";
import LocalContext from "../../hoc/localstore";
import Wrapper from "../wrapper";

function CartWrapper({ close, visible, data }) {
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
              <div className="product_div" key={product.id}>
                <div
                  className="cancel"
                  onClick={() => {
                    removeCartLocal(product.id);
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </div>

                <div className="image">
                  <img
                    src={
                      product.thumbnail &&
                      import.meta.env.VITE_APP_BASE_URL + product.thumbnail
                    }
                    alt=""
                  />
                </div>

                <div className="infos">
                  <div className="up">
                    <p>{product.title && product.title}</p>
                  </div>
                  <div className="down">
                    <div className="left">
                      <button
                        className="but"
                        onClick={() => {
                          decreaseAmount(product.id);
                        }}
                      >
                        -
                      </button>
                      <p>{product.amount && product.amount}</p>
                      <button
                        className="but"
                        onClick={() => {
                          increaseAmount(product.id);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="right">
                      {product.sale > 0 ? (
                        <p>
                          {product.total_new_price ?? product.new_price}{" "}
                          <span>$</span>
                        </p>
                      ) : (
                        <p>
                          {product.total_price && product.total_price}{" "}
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
}

export default CartWrapper;
