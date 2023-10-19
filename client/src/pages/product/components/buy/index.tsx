import { useContext } from "react";
import Timer from "../../../../components/timer";
import { ProductType } from "../../../../types/product";
import LocalContext from "../../../../context/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface PropTypes {
  data: ProductType["data"];
}

const ProductBuyInfo: React.FC<PropTypes> = ({ data }) => {
  /* Context */
  const { addCartLocal } = useContext(LocalContext);

  return (
    <>
      <div className="each_products_product_buy">
        {data.sale > 0 && <Timer data={data.deadline?.toString()} />}

        <div className="buying">
          <div className="price_cont">
            {data?.newPrice > 0 ? (
              <p>
                ${data?.newPrice} <span>${data?.price}</span>
              </p>
            ) : (
              <p>${data?.price}</p>
            )}
          </div>

          <div className="buttons">
            <button
              className="cart"
              onClick={() => {
                addCartLocal(data);
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <button className="buy">Buy Now</button>
          </div>

          {/* Credit Card */}
          <button className="credit_card_button">
            Buy In Credit 78$ - From
          </button>
          {/* Cards */}
          <div className="cards">
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBuyInfo;
