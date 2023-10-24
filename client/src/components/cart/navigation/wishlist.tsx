import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthStore from "../../../store/client/user/useAuthStore";
import { useNavigate } from "react-router-dom";
import useWishlistStore from "../../../store/client/wishlist/wishlist";

const WishlistForNavigation = () => {
  /* Route */
  const navigate = useNavigate();

  /* Stores */
  const { isAuthenticated } = useAuthStore((state) => state);
  const wishlist =  useWishlistStore((state) => state.wishlist);
  return (
    <>
      <div
        className="main wish"
        onClick={() => {
          if (isAuthenticated) {
            navigate("/wishlist");
          } else {
            navigate("/login");
          }
        }}
      >
        <div className="svg">
          <FontAwesomeIcon icon={faHeart} />
          <div className="amount">
            <p>{wishlist?.status === "success" ? wishlist.result : 0}</p>
          </div>
        </div>
        <p className="title">Wishlist</p>
      </div>
    </>
  );
};

export default WishlistForNavigation;
