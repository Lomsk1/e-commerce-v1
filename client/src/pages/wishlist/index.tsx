import useWishlistStore from "../../store/client/wishlist/wishlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlist } from "../../api/wishlist/delete";

const WishlistPage: React.FC = () => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* Stores */
  const { wishlist } = useWishlistStore((state) => state);

  /* Mutation */
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

  const navigate = useNavigate();

  return (
    <>
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
        </div>

        {/* Product Container */}
        <section className="product_show_section">
          {/* Product Box */}
          {wishlist?.status === "success" ? (
            wishlist?.data?.productDetails?.map((data) => (
              <div className="product_box" key={data.data?.id}>
                {data.status === "success" && (
                  <>
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
                        <p>{data.data?.title}</p>
                      </div>

                      <div className="price_info">
                        {data.data?.sale > 0 ? (
                          <div className="price">
                            <p>ITEM PRICE:</p>
                            <p>$ {data.data?.newPrice}</p>
                            <span>$ {data.data?.price}</span>
                          </div>
                        ) : (
                          <div className="price">
                            <p>ITEM PRICE:</p>
                            <p>$ {data.data?.price}</p>
                          </div>
                        )}

                        <hr className="hr_wish" />

                        <div className="button">
                          <button
                            onClick={() => {
                              navigate(
                                `/product-detail/${data.data?.title}/${data.data.id}`
                              );
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
                          const wishlistId = wishlist.data.wishlistItems.filter(
                            (wishlist) => wishlist.product === data.data.id
                          )[0].id;
                          deleteWishlistMutation.mutate({ id: wishlistId });
                        }}
                      >
                        Delete from Wishlist
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="error_div">No Data Found</div>
          )}
        </section>
      </section>
    </>
  );
};

export default WishlistPage;
