import {
  faEye,
  faHeart,
  faPaperPlane,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { UserTypes } from "../../types/userTypes";

interface PropTypes {
  active: string;
  user: UserTypes["user"];
}

const ProfileSideBar: React.FC<PropTypes> = ({ active, user }) => {
  return (
    <>
      <div className="side_bar_profile">
        {/* Avatar */}
        <div className="avatar_box">
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>

        {/* List */}
        <ul>
          <li
            style={{ borderLeft: active === "profile" ? "2px solid red" : "" }}
          >
            <Link to={`/profile/${user.id}`}>
              <FontAwesomeIcon icon={faPerson} /> Account Info
            </Link>
          </li>
          <li
            style={{
              borderLeft: active === "notification" ? "2px solid red" : "",
            }}
          >
            <Link to={""}>
              <FontAwesomeIcon icon={faPaperPlane} /> Notifications
            </Link>
          </li>
          <li
            style={{ borderLeft: active === "wishlist" ? "2px solid red" : "" }}
          >
            <Link to={"/wishlist"}>
              <FontAwesomeIcon icon={faHeart} /> Wishlist
            </Link>
          </li>
          <li
            style={{ borderLeft: active === "password" ? "2px solid red" : "" }}
          >
            <Link to={`/profile/${user.id}/password-change`}>
              <FontAwesomeIcon icon={faEye} /> Password
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileSideBar;
