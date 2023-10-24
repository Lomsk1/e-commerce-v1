import { Link } from "react-router-dom";
import TriangleSVG from "../../../../assets/icons/triangle";
import Wrapper from "../../../wrapper";
import Cookies from "js-cookie";
import { UserTypes } from "../../../../types/userTypes";

interface ProfileContainerTypes {
  visible: boolean;
  close: () => void;
  user?: UserTypes["user"];
}

const ProfileContainer: React.FC<ProfileContainerTypes> = ({
  visible,
  close,
  user,
}) => {
  const logOutHandler = () => {
    Cookies.remove("jwt");
    location.reload();
  };
  return (
    <>
      <Wrapper className="profile_containers" visible={visible} close={close}>
        {/* Triangle */}
        <div className="icon">
          <TriangleSVG />
        </div>
        {/* Title */}
        <div className="title">
          <h1>Profile</h1>
        </div>

        <ul>
          <li>
            <Link to={`/profile/${user?.id}`} onClick={() => close()}>
              My Profile
            </Link>
          </li>
          <li>
            <Link to={""}>Orders</Link>
          </li>
          <li>
            <Link to={""}>Notifications</Link>
          </li>
        </ul>

        <button onClick={logOutHandler}>Log Out</button>
      </Wrapper>
    </>
  );
};

export default ProfileContainer;
