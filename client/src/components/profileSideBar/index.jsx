import {
  faEnvelope,
  faEye,
  faHeart,
  faPaperPlane,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileSideBar({ active }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="side_bar_profile">
        {/* Avatar */}
        <div className="avatar_box">
          <img
            src={
              userInfo && userInfo.avatar != null
                ? userInfo.avatar
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
          />
          <p>
            {userInfo && userInfo.first_name && userInfo.first_name}{" "}
            {userInfo && userInfo.last_name && userInfo.last_name}
          </p>
        </div>

        {/* List */}
        <ul>
          <li style={{ borderLeft: active === "profile" && "2px solid red" }}>
            <Link to={"/costumer/info"}>
              <FontAwesomeIcon icon={faPerson} /> Account Info
            </Link>
          </li>
          <li
            style={{ borderLeft: active === "notification" && "2px solid red" }}
          >
            <Link to={""}>
              <FontAwesomeIcon icon={faPaperPlane} /> Notifications
            </Link>
          </li>
          <li style={{ borderLeft: active === "wishlist" && "2px solid red" }}>
            <Link to={""}>
              <FontAwesomeIcon icon={faHeart} /> Wishlist
            </Link>
          </li>
          <li style={{ borderLeft: active === "password" && "2px solid red" }}>
            <Link to={"/password_change"}>
              <FontAwesomeIcon icon={faEye} /> Password
            </Link>
          </li>
          <li style={{ borderLeft: active === "email" && "2px solid red" }}>
            <Link to={"/email_change"}>
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProfileSideBar;
