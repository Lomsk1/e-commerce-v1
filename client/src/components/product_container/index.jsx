import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartFlatbed,
  faCartFlatbedSuitcase,
  faCartShopping,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createWishlist,
  deleteWishlist,
  getWishlistByUser,
} from "../../API/wishlist/action";
import LocalContext from "../../hoc/localstore";

function ProductLongContainer({
  data,
  style,
  thumbnail,
  category,
  title,
  price,
  new_price,
  new_item,
  sale,
  id,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const { isLoading, wishlistData } = useSelector((state) => state.wishlist);
  const { productData } = useSelector((state) => state.product);

  // Hover
  const [isShownWish, setIsShownWish] = useState(false);
  const [isShownCart, setIsShownCart] = useState(false);
  const [isShownWatch, setIsShownWatch] = useState(false);

  // Product Enter

  const enterProductHandler = () => {
    navigate(`/each_products/${title}/${id}`);
  };

  // wish
  const wishAddHandler = () => {
    const isExist =
      wishlistData.map((id) => id.user).includes(userInfo.id) &&
      wishlistData.map((id) => id.wished_item).includes(id);

    const product = productData.filter((data) => data.id === id)[0];

    if (!isExist) {
      dispatch(
        createWishlist({
          user: userInfo.id,
          wished_item: id,
        })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          dispatch(
            getWishlistByUser({
              id: userInfo.id,
            })
          );
        });
    } else {
      let itemID = wishlistData.filter(
        (data) => data.user === userInfo.id && data.wished_item === id
      )[0].id;
      dispatch(
        deleteWishlist({
          id: itemID,
        })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          dispatch(
            getWishlistByUser({
              id: userInfo.id,
            })
          );
        });
    }
  };

  // Local

  const { addCartLocal, cartDataLocal, removeCartLocal } =
    useContext(LocalContext);

  return (
    <>
      <div className="product" style={style}>
        <div className="img">
          <div className="all">
            {sale != 0 && <div className="sale">-{sale}%</div>}
            {new_item === true ? <div className="new">NEW</div> : ""}
          </div>

          <img src={import.meta.env.VITE_APP_BASE_URL + thumbnail} alt="" />
        </div>

        <div className="category">{/* <p>{category}</p> */}</div>

        <div className="title">
          <p>{title}</p>
        </div>

        <div className="price">
          {new_price ? (
            <p>
              ${new_price} <span>${price}</span>
            </p>
          ) : (
            <p>${price}</p>
          )}
        </div>

        <hr />

        <div className="added">
          {isAuthenticated && (
            <div
              className="wish same"
              onMouseEnter={() => setIsShownWish(true)}
              onMouseLeave={() => setIsShownWish(false)}
              onClick={wishAddHandler}
            >
              {isShownWish &&
                (!wishlistData.map((data) => data.wished_item).includes(id) ? (
                  <div>Add to Wishlist</div>
                ) : (
                  <div>Remove from Wishlist</div>
                ))}

              <FontAwesomeIcon
                icon={
                  wishlistData.map((data) => data.wished_item).includes(id)
                    ? faHeartBroken
                    : faHeart
                }
              />
            </div>
          )}

          <div
            className="compare same"
            onMouseEnter={() => setIsShownCart(true)}
            onMouseLeave={() => setIsShownCart(false)}
            onClick={() => {
              if (!cartDataLocal.map((data) => data.id).includes(id)) {
                addCartLocal(data);
              } else {
                removeCartLocal(id);
              }
            }}
          >
            {isShownCart &&
              (!cartDataLocal.map((data) => data.id).includes(id) ? (
                <div>Add to Cart</div>
              ) : (
                <div>Remove from Cart</div>
              ))}
            <FontAwesomeIcon
              icon={
                cartDataLocal.map((data) => data.id).includes(id)
                  ? faCartShopping
                  : faCartFlatbed
              }
            />
          </div>
          <div
            className="watch same"
            onMouseEnter={() => setIsShownWatch(true)}
            onMouseLeave={() => setIsShownWatch(false)}
            onClick={enterProductHandler}
          >
            {isShownWatch && <div>Quick View</div>}
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductLongContainer;
