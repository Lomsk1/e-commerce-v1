import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../../../store/client/user/useAuthStore";
import useWishlistStore from "../../../../store/client/wishlist/wishlist";
import { ProductType } from "../../../../types/product";
import { WishlistType } from "../../../../types/wishlist";
import { createWishlist } from "../../../../api/wishlist/create";
import { deleteWishlist } from "../../../../api/wishlist/delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken, faStore } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

interface PropTypes {
  data: ProductType["data"];
}

const ProductStockInformation: React.FC<PropTypes> = ({ data }) => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* Routes */
  const navigate = useNavigate();

  /* Stores */
  const { isAuthenticated, user } = useAuthStore((state) => state);
  const { wishlist } = useWishlistStore((state) => state);

  /* Mutation */
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

  /* Wishlist Function */
  const wishAddHandler = (): void => {
    if (data) {
      if (user && wishlist) {
        const isExist =
          wishlist?.data.wishlistItems
            .map((id) => id.user)
            .includes(user.user.id) &&
          wishlist.data.wishlistItems.map((id) => id.product).includes(data.id);

        if (!isExist) {
          createWishlistMutation.mutate({ product: data.id });
        } else {
          const wishlistId = wishlist.data.wishlistItems.filter(
            (wishlist) =>
              wishlist.user === user.user.id && wishlist.product === data.id
          )[0].id;
          deleteWishlistMutation.mutate({ id: wishlistId });
        }
      }
    }
  };
  return (
    <>
      <div className="store">
        {isAuthenticated ? (
          <div onClick={wishAddHandler}>
            <FontAwesomeIcon
              icon={
                wishlist?.data.wishlistItems
                  .map((data) => data.product)
                  .includes(data.id)
                  ? faHeartBroken
                  : faHeart
              }
            />
            {wishlist?.status === "success" &&
              (!wishlist.data.wishlistItems
                .map((data) => data.product)
                .includes(data.id) ? (
                <p>Add to Wishlist</p>
              ) : (
                <p>Remove from Wishlist</p>
              ))}
          </div>
        ) : (
          <div
            onClick={() => {
              navigate("/login");
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
            <p>Log in to add </p>
          </div>
        )}

        {data.totalInStock === true ? (
          <div>
            <FontAwesomeIcon icon={faStore} />
            <p>In Stock</p>
          </div>
        ) : (
          <div>
            <FontAwesomeIcon icon={faStore} style={{ color: "red" }} />
            <p style={{ color: "red" }}>Out of Stock</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductStockInformation;
