import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RemoveScroll } from "react-remove-scroll";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../../API/auth/actions";
import logo from "../../../assets/images/logo.png.webp";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);
  const [rePasswordShow, setRePasswordShow] = useState(false);

  const [statusResponse, setStatusResponse] = useState("");
  const [statusType, setStatusType] = useState(null);

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  ////////////////////   S U B M I T     ////////////////////

  const onSubmit = (data) => {
    dispatch(signUp(data))
      .unwrap()
      .then((originalPromiseResult) => {
        setStatusResponse("Congratulation! Please, check your Email");
        setStatusType("status_200");
      })
      .catch((rejectedValue) => {
        if (rejectedValue.password) {
          if (rejectedValue.password) {
            setStatusResponse(rejectedValue.password);
            setStatusType("password");
          }
        }
        if (rejectedValue.email) {
          setStatusResponse(rejectedValue.email);
          setStatusType("email");
        }
        if (rejectedValue.non_field_errors) {
          setStatusResponse([`Re_password is not as same as Password`]);
          setStatusType("re_password");
        }
      });
  };

  return (
    <>
      <section className="register_container">
        <header className="register_nav">
          <div
            className="img_cont"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="" />
          </div>
        </header>

        <div className="register_box">
          {/* Title */}
          <div className="title">
            <h1>
              Create New Account<span>.</span>
            </h1>
          </div>

          {/* Member */}
          <div className="already_member_div">
            <p>
              Already a Member? <Link to={"/log_in"}>Log In</Link>
            </p>
          </div>

          {/* Form */}
          <div className="form_box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="small_inputs">
                <div>
                  <FontAwesomeIcon icon={faIdCard} />
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="first name..."
                    {...register("first_name", { required: true })}
                  />
                  {errors.first_name?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <FontAwesomeIcon icon={faIdCard} />
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="last name..."
                    {...register("last_name", { required: true })}
                  />
                  {errors.last_name?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              {/* Long Inputs */}
              <div className="long_inputs">
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email..."
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                  {statusType === "email" &&
                    statusResponse.length > 0 &&
                    statusResponse.map((data, index) => (
                      <span key={index} className="error_div error">
                        {data}
                      </span>
                    ))}
                </div>
                <div>
                  {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
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
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                  {statusType === "password" &&
                    statusResponse.length > 0 &&
                    statusResponse.map((data, index) => (
                      <span key={index} className="error_div error">
                        {data}
                      </span>
                    ))}
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => {
                      setRePasswordShow(!rePasswordShow);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <label htmlFor="re_password">Re. Password:</label>
                  <input
                    type={rePasswordShow ? "text" : "password"}
                    id="re_password"
                    name="re_password"
                    placeholder="re. your password"
                    {...register("re_password", { required: true })}
                  />
                  {errors.re_password?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                  {statusType === "re_password" &&
                    statusResponse.length > 0 &&
                    statusResponse.map((data, index) => (
                      <span key={index} className="error_div error">
                        {data}
                      </span>
                    ))}
                </div>
              </div>

              <div className="terms_conditions">
                <p>
                  By clicking Agree & Join, you agree to the Site{" "}
                  <Link to={"/terms_and_privacy"}>User Agreement</Link>,{" "}
                  <Link to={""}>Privacy Policy</Link>
                </p>
              </div>
              <button type="submit">Agree & Join</button>
            </form>
          </div>
        </div>

        {statusType === "status_200" && (
          <div className={"status_200"}>
            <RemoveScroll>
              <div className="text_cont">
                <div>
                  <p>{statusResponse}</p>
                </div>
                <button
                  onClick={() => {
                    setStatusType(null);
                    if (formState.isSubmitSuccessful) {
                      reset();
                    }
                  }}
                >
                  Close
                </button>
              </div>
            </RemoveScroll>
          </div>
        )}
      </section>
    </>
  );
}

export default RegisterPage;
