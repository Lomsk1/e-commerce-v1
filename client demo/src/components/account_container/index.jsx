import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wrapper from "../wrapper";
import TriangleSVG from "../../assets/icons/triangle";
import { Link, useNavigate } from "react-router-dom";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authLogin, loadUser, resetPassword } from "../../API/auth/actions";
import { useState } from "react";
import PopupMiddle from "../popup/middle";

function AccountContainer({ visible, close }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resetPass, setResetPass] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

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
        // navigate("/costumer/info");
      })
      .catch((rejectedValue) => {
        setStatusResponse("Please, check you Email or Password");
        setStatusType(true);
      });
  };

  const onSubmitRP = (data) => {
    dispatch(resetPassword(data))
      .unwrap()
      .then((originalPromiseResult) => {
        setPopupOpen(true);
      })
      .catch((rejectedValue) => {
        setStatusResponse("Something went wrong, Please try again!");
        setStatusType(true);
      });
  };

  return (
    <>
      <Wrapper className="account_containers" visible={visible} close={close}>
        {/* Triangle */}
        <div className="icon">
          <TriangleSVG />
        </div>
        {/* Title */}
        <div className="title">
          <h1>Authorization</h1>
        </div>
        {/* Form */}
        {!resetPass ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                placeholder="Email"
                onFocus={() => {
                  setStatusType(false);
                }}
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <span className="error_div error">This field is required</span>
              )}

              <input
                type="password"
                placeholder="Password"
                onFocus={() => {
                  setStatusType(false);
                }}
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <span className="error_div error">This field is required</span>
              )}
              <p
                onClick={() => {
                  setResetPass(true);
                }}
              >
                Forgot Password?
              </p>

              {statusType && (
                <span className="error_div error">{statusResponse}</span>
              )}

              <div className="buttons">
                <button type="submit">Log in</button>
              </div>
            </form>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className={"register_btn"}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmitRP)}>
              <input
                type="email"
                placeholder="Email"
                onFocus={() => {
                  setStatusType(false);
                }}
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <span className="error_div error">This field is required</span>
              )}

              {statusType && (
                <span className="error_div error">{statusResponse}</span>
              )}

              <div className="buttons">
                <button type="submit">Reset Password</button>
              </div>
            </form>
            <button
              onClick={() => {
                setResetPass(false);
              }}
              className={"register_btn"}
            >
              Back to Log in
            </button>
          </>
        )}

        {popupOpen && (
          <PopupMiddle>
            <div className="text_cont">
              <div className="text_cont">
                <div className="title">Please, Check your Email</div>

                <button
                  onClick={() => {
                    setPopupOpen(false);
                    setResetPass(false);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </PopupMiddle>
        )}

        <hr />

        <div className="or">
          <p>or</p>
        </div>

        {/* Social Authorization */}
        <button className="social_button">
          <div>
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <span>
            <p>Authorization</p>
          </span>
        </button>

        <button className="social_button">
          <div>
            <FontAwesomeIcon icon={faGoogle} />
          </div>
          <span>
            <p>Authorization</p>
          </span>
        </button>
      </Wrapper>
    </>
  );
}

export default AccountContainer;
