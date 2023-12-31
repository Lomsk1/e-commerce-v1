import { useContext, useEffect, useState } from "react";
import LocalContext from "../../context/cart";
import { ProductType } from "../../types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartFlatbed,
  faMagnifyingGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const CartPage: React.FC = () => {
  const [cartInfos, setCartInfos] = useState<ProductType["data"][] | []>([]);

  useEffect(() => {
    setCartInfos(JSON.parse(localStorage.getItem("cart") || "[]"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("cart")]);

  const {
    removeCartLocal,
    totalPrice,
    increaseAmount,
    decreaseAmount,
    removeAllFromLocal,
  } = useContext(LocalContext);

  return (
    <>
      <section className="cart_main_section">
        {/* Table */}
        <div className="table_main">
          <div className="mark">
            <button onClick={removeAllFromLocal}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
          {cartInfos && cartInfos.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>image</th>
                  <th>Product Name</th>
                  <th>Sale</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sum</th>
                </tr>
              </thead>
              <tbody>
                {cartInfos &&
                  cartInfos.length > 0 &&
                  cartInfos.map((infos) => (
                    <tr key={infos.id}>
                      <td>
                        <div className="image_cont">
                          <div
                            className="clear"
                            onClick={() => {
                              removeCartLocal(infos.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faX} />
                          </div>
                          <img src={infos.thumbnail.url} alt="image" />
                        </div>
                      </td>
                      <td>{infos.title && infos.title}</td>
                      <td>{infos.sale > 0 ? <p>Yes</p> : <p>No</p>}</td>
                      <td>
                        {infos.sale > 0 ? (
                          <p>
                            {infos.newPrice} <span>$</span>
                          </p>
                        ) : (
                          <p>
                            {infos.price && infos.price} <span>$</span>
                          </p>
                        )}
                      </td>

                      <td>
                        <div className="quantity_div">
                          <button
                            onClick={() => {
                              increaseAmount(infos.id);
                            }}
                          >
                            +
                          </button>
                          <p>{infos.amount && infos.amount}</p>
                          <button
                            onClick={() => {
                              decreaseAmount(infos.id);
                            }}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>
                        {infos.sale > 0 ? (
                          <p>
                            {infos.totalNewPrice && infos.totalNewPrice}{" "}
                            <span>$</span>
                          </p>
                        ) : (
                          <p>
                            {infos.totalPrice && infos.totalPrice}{" "}
                            <span>$</span>
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <>
              <div className="zero_data">
                <div className="icon_zero">
                  <FontAwesomeIcon icon={faCartFlatbed} />
                  <div className="second_svg">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                </div>
                <div className="your">
                  <p>Your Product Cart is Empty</p>
                  <p>Please, Add Some Product</p>
                </div>
                <div className="add_cart_product">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates, ducimus commodi numquam ex maiores dolore
                    incidunt sapiente non recusandae laboriosam.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Total Cost */}
        <div className="total_cost_main">
          <div className="title_total">
            <h1>Total Amount</h1>
          </div>

          <div className="total_amount">
            <span>Total:</span>
            <p>{totalPrice} $</p>
          </div>

          <hr className="hr" />
          <button>Check Out</button>
        </div>
      </section>
    </>
  );
};

export default CartPage;
