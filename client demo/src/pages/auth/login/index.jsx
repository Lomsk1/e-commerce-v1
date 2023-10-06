import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../../../API/auth/actions";
import logo from "../../../assets/images/logo.png.webp";
import AuthHeading from "../../../components/authHeading";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);

  const [statusResponse, setStatusResponse] = useState("");
  const [statusType, setStatusType] = useState(false);

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  ////////////////////   S U B M I T     ////////////////////

  const onSubmit = (data) => {
    dispatch(authLogin(data))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadUser());
        reset();
        window.location.reload(false);
        navigate("/");
      })
      .catch((rejectedValue) => {
        setStatusResponse("Please, check you Email or Password");
        setStatusType(true);
      });
  };

  return (
    <>
      <section className="log_in_section">
        <AuthHeading />

        <div className="log_in_box">
          {/* Title */}
          <div className="title">
            <h1>
              Log In<span>.</span>
            </h1>
          </div>

          {/* Member */}
          <div className="member_div">
            <p>
              Don't Have an Account? <Link to={"/register"}>Register now!</Link>
            </p>
          </div>

          {/* Form */}
          <div className="form_box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email..."
                  onFocus={() => {
                    setStatusType(false);
                  }}
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <span className="error_div error">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => {
                    setPasswordShow(!passwordShow);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type={passwordShow ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="password"
                  onFocus={() => {
                    setStatusType(false);
                  }}
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <span className="error_div error">
                    This field is required
                  </span>
                )}
              </div>
              {statusType && (
                <span className="error_div error">{statusResponse}</span>
              )}

              <button type="submit">Log In</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
