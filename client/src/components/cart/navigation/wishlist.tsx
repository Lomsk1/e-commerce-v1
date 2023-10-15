import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthStore from "../../../store/client/user/useAuthStore";
import { useNavigate } from "react-router-dom";
import useWishlistStore from "../../../store/client/wishlist/wishlist";

const WishlistForNavigation: React.FC = () => {
  /* Route */
  const navigate = useNavigate();

  /* Stores */
  const { isAuthenticated } = useAuthStore((state) => state);
  const { wishlist } = useWishlistStore((state) => state);
  return (
    <>
      <div
        className="main wish"
        onClick={() => {
          if (isAuthenticated) {
            navigate("/wishlist_main_page");
          } else {
            navigate("/log_in");
          }
        }}
      >
        <div className="svg">
          <FontAwesomeIcon icon={faHeart} />
          <div className="amount">
            <p>{wishlist?.result}</p>
          </div>
        </div>
        <p className="title">Wishlist</p>
      </div>
    </>
  );
};

export default WishlistForNavigation;
