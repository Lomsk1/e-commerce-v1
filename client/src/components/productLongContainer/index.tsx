import { useNavigate } from "react-router-dom";
import { ProductType } from "../../types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartFlatbed,
  faCartShopping,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import LocalContext from "../../context/cart";
import useAuthStore from "../../store/client/user/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WishlistType } from "../../types/wishlist";
import { createWishlist } from "../../api/wishlist/create";
import { deleteWishlist } from "../../api/wishlist/delete";

interface PropTypes {
  data: ProductType["data"];
  style: React.CSSProperties;
  isAuthenticated: boolean;
  wishlist: WishlistType | null;
}

const ProductLongContainer: React.FC<PropTypes> = ({
  data,
  style,
  isAuthenticated,
  wishlist,
}) => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* Routes */
  const navigate = useNavigate();

  /* Stores */
  const { user } = useAuthStore((state) => state);

  /* Hover */
  const [isShownWish, setIsShownWish] = useState<boolean>(false);
  const [isShownCart, setIsShownCart] = useState<boolean>(false);
  const [isShownWatch, setIsShownWatch] = useState<boolean>(false);

  /* Product navigate */
  const enterProductHandler = () => {
    navigate(`/each_products/${data.title}/${data.id}`);
  };

  /* Query Mutation */
  const createWishlistMutation = useMutation<
    WishlistType,
    Error,
    { product: string }
  >({
    mutationFn: createWishlist,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
  });

  const deleteWishlistMutation = useMutation<
    { status: string },
    Error,
    { id: string }
  >({
    mutationFn: deleteWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  /* Wish add Handler */
  const wishAddHandler = (): void => {
    if (user && wishlist) {
      const isExist =
        wishlist?.data.map((id) => id.user).includes(user.user.id) &&
        wishlist.data.map((id) => id.product).includes(data.id);

      if (!isExist) {
        createWishlistMutation.mutate({ product: data.id });
      } else {
        const wishlistId = wishlist.data.filter(
          (wishlist) =>
            wishlist.user === user.user.id && wishlist.product === data.id
        )[0].id;
        deleteWishlistMutation.mutate({ id: wishlistId });
      }
    }
  };

  /* Local Cart */
  const { addCartLocal, cartDataLocal, removeCartLocal } =
    useContext(LocalContext);

  return (
    <>
      <div className="product" style={style}>
        <div className="img">
          <div className="all">
            {data.sale != 0 && <div className="sale">-{data.sale}%</div>}
            {data.new === true ? <div className="new">NEW</div> : ""}
          </div>

          {data.thumbnail && <img src={data.thumbnail?.url} alt="product" />}
        </div>

        <div className="category">
          <p>{data?.category?.name}</p>
        </div>

        <div className="title">
          <p>{data.title}</p>
        </div>

        <div className="price">
          {data.newPrice ? (
            <p>
              ${data.newPrice} <span>${data.price}</span>
            </p>
          ) : (
            <p>${data.price}</p>
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
                wishlist?.status === "success" &&
                (!wishlist.data
                  .map((data) => data.product)
                  .includes(data.id) ? (
                  <div>Add to Wishlist</div>
                ) : (
                  <div>Remove from Wishlist</div>
                ))}

              <FontAwesomeIcon
                icon={
                  wishlist?.data.map((data) => data.product).includes(data.id)
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
              if (!cartDataLocal.map((cart) => cart.id).includes(data.id)) {
                addCartLocal(data);
              } else {
                removeCartLocal(data.id);
              }
            }}
          >
            {isShownCart &&
              (!cartDataLocal.map((cart) => cart.id).includes(data.id) ? (
                <div>Add to Cart</div>
              ) : (
                <div>Remove from Cart</div>
              ))}
            <FontAwesomeIcon
              icon={
                cartDataLocal.map((data) => data.id).includes(data.id)
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
};

export default ProductLongContainer;
