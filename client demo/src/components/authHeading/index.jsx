import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png.webp";

function AuthHeading() {
  const navigate = useNavigate();

  return (
    <>
      <header className="nav">
        <div
          className="img_cont"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="" />
        </div>
      </header>
    </>
  );
}

export default AuthHeading;
