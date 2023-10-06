import { faArrowsToEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import HeadingInformation from "../../components/heading_info";
import Navigation from "../../components/navigation";
import LocalContext from "../../hoc/localstore";

function WishlistPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishDataLocal, addCartLocal, wishRemoveFromLocal } =
    useContext(LocalContext);

  const { isLoading: wishIsLoading, wishlistData } = useSelector(
    (state) => state.wishlist
  );
  const { isLoading, productData } = useSelector((state) => state.product);

  const [selectValue, setSelectValue] = useState("recently");
  const [selectChange, setSelectChange] = useState(false);
  const [dataSorting, setDataSorting] = useState([]);

  useEffect(() => {
    // console.log(wishlistData);
    // let wishID = wishlistData.forEach((data) => {
    //   console.log(data.wished_item);
    // });
    // let pro = productData.forEach((data) => {
    //   console.log(data);
    // });
    setSelectChange(!selectChange);
    // setDataSorting(productData.filter((data) => data.id > 0));
    // console.log(wishlistProduct);
  }, []);

  useEffect(() => {
    if (selectValue === "recently") {
      setDataSorting(wishDataLocal);
    }
    if (selectValue === "low") {
      if (wishDataLocal.includes((info) => info.sale > 0)) {
        setDataSorting(
          dataSorting
            .map((info) => info)
            .sort((a, b) => a.new_price - b.new_price)
        );
      } else {
        setDataSorting(
          dataSorting.map((info) => info).sort((a, b) => a.price - b.price)
        );
      }
    }
    if (selectValue === "high") {
      if (wishDataLocal.includes((info) => info.sale > 0)) {
        setDataSorting(
          dataSorting
            .map((info) => info)
            .sort((a, b) => b.new_price - a.new_price)
        );
      } else {
        setDataSorting(
          dataSorting.map((info) => info).sort((a, b) => b.price - a.price)
        );
      }
    }
    if (selectValue === "byName") {
      setDataSorting(
        dataSorting
          .map((info) => info)
          .sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
      );
    }
  }, [selectChange]);

  return (
    <>
      <HeadingInformation />
      <Navigation />

      <section className="wishlist_section">
        <div className="title_div">
          <h1>
            Your <span>Wishlist</span>
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="action_buttons">
          <div className="left">
            <div className="checkbox_cont">
              <label className="checkbox bounce">
                <input type="checkbox" />
                <svg viewBox="0 0 21 21">
                  <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
              </label>
            </div>

            <button>Checkout</button>
            <button>Add to Cart</button>
          </div>

          <select
            name="sort"
            id="sort_item"
            onChange={(e) => {
              setSelectChange(!selectChange);
              setSelectValue(e.target.value);
            }}
          >
            <option value="recently">Recently Add</option>
            <option value="byName">By Alphabet</option>
            <option value="low">Price Lowest</option>
            <option value="high">Price Highest</option>
          </select>
        </div>
        {/* Product Container */}
        <section className="product_show_section">
          {/* Product Box */}
          {dataSorting && dataSorting.length > 0 ? (
            dataSorting.map((data) => (
              <div className="product_box" key={data.id}>
                <div className="check_div">
                  <input type="checkBox" name="" id="" />
                </div>

                <div className="img_cont">
                  <img
                    src="https://d28i4xct2kl5lp.cloudfront.net/product_images/None_2ae6696d-dbb2-4df1-a4c1-9fb38df0b5a9.jpg"
                    alt=""
                  />
                </div>

                <div className="information">
                  <div className="title_info">
                    <p>{data.title && data.title}</p>
                  </div>

                  <div className="price_info">
                    {data.sale > 0 ? (
                      <div className="price">
                        <p>ITEM PRICE:</p>
                        <p>$ {data.new_price && data.new_price}</p>
                        <span>$ {data.price && data.price}</span>
                      </div>
                    ) : (
                      <div className="price">
                        <p>ITEM PRICE:</p>
                        <p>$ {data.price && data.price}</p>
                      </div>
                    )}

                    <hr className="hr_wish" />

                    <div className="button">
                      <button
                        onClick={() => {
                          navigate(`/each_products/${data.title}/${data.id}`);
                        }}
                      >
                        Quick View
                        <FontAwesomeIcon icon={faArrowsToEye} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="actions">
                  <button>Buy it Now</button>
                  <button
                    onClick={() => {
                      addCartLocal(data);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      wishRemoveFromLocal(data.id);
                    }}
                  >
                    Delete from Wishlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="error_div">No Data Found</div>
          )}
        </section>
      </section>

      <Footer />
    </>
  );
}

export default WishlistPage;
