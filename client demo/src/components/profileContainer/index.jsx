import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth, logout } from "../../API/auth/actions";
import TriangleSVG from "../../assets/icons/triangle";
import Wrapper from "../wrapper";

function ProfileContainer({ visible, close }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logout());
    dispatch(checkAuth());
    navigate("/");
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
            <Link to={"/costumer/info"}>My Profile</Link>
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
}

export default ProfileContainer;
