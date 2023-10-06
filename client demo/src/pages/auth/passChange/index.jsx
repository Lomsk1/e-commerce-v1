import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loadUser, setNewPassword } from "../../../API/auth/actions";
import HeadingInformation from "../../../components/heading_info";
import Navigation from "../../../components/navigation";
import PopupMiddle from "../../../components/popup/middle";
import ProfileSideBar from "../../../components/profileSideBar";

function PasswordChangePage() {
  const dispatch = useDispatch();

  const [new_passwordShow, setNew_password] = useState(false);
  const [re_new_passwordShow, setRe_new_passwordShow] = useState(false);
  const [current_passwordShow, setCurrent_passwordShow] = useState(false);

  const [statusResponse, setStatusResponse] = useState("");
  const [statusType, setStatusType] = useState(null);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

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
    if (data.new_password === data.current_password) {
      setStatusResponse(["New password can not be same as Current Password"]);
      setStatusType("new_password");
    } else {
      if (data.new_password === data.re_new_password) {
        dispatch(setNewPassword(data))
          .unwrap()
          .then((originalPromiseResult) => {
            setStatusResponse("Congratulation! New Password has been changed");
            setStatusType("status_200");
          })
          .catch((rejectedValue) => {
            if (rejectedValue.new_password) {
              setStatusResponse(rejectedValue.new_password);
              setStatusType("new_password");
            }
            if (rejectedValue.re_new_password) {
              setStatusResponse(rejectedValue.re_new_password);
              setStatusType("re_new_password");
            }
            if (rejectedValue.current_password) {
              setStatusResponse(rejectedValue.current_password);
              setStatusType("current_password");
            }
          });
      } else {
        setStatusResponse(["Re new password is not same as New password"]);
        setStatusType("re_new_password");
      }
    }
  };
  return (
    <>
      <HeadingInformation />
      <Navigation />
      <section className="password_change">
        {/* Side bar */}
        <ProfileSideBar active={"password"} />

        <div className="main_information">
          {/* Title */}
          <div className="title">
            <h1>Password Change:</h1>
          </div>

          <hr />

          {/* Form */}
          <div className="form_container">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*  */}
              <div>
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => {
                    setCurrent_passwordShow(!current_passwordShow);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor="current_password">Current Password:</label>
                <input
                  type={current_passwordShow ? "text" : "password"}
                  id="current_password"
                  name="current_password"
                  placeholder="Current Password"
                  {...register("current_password", { required: true })}
                />
                {errors.current_password?.type === "required" && (
                  <span className="error_div error">
                    This field is required
                  </span>
                )}
                {statusType === "current_password" &&
                  statusResponse.length > 0 &&
                  statusResponse.map((data, index) => (
                    <span key={index} className="error_div error">
                      {data}
                    </span>
                  ))}
              </div>
              {/*  */}
              <div>
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => {
                    setNew_password(!new_passwordShow);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor="new_password">New Password:</label>
                <input
                  type={new_passwordShow ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  placeholder="New password"
                  {...register("new_password", { required: true })}
                />
                {errors.new_password?.type === "required" && (
                  <span className="error_div error">
                    This field is required
                  </span>
                )}
                {statusType === "new_password" &&
                  statusResponse.length > 0 &&
                  statusResponse.map((data, index) => (
                    <span key={index} className="error_div error">
                      {data}
                    </span>
                  ))}
              </div>
              {/*  */}
              <div>
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => {
                    setRe_new_passwordShow(!re_new_passwordShow);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor="re_new_password">Re. New Password:</label>
                <input
                  type={re_new_passwordShow ? "text" : "password"}
                  id="re_new_password"
                  name="re_new_password"
                  placeholder="re. your password"
                  {...register("re_new_password", { required: true })}
                />
                {errors.re_new_password?.type === "required" && (
                  <span className="error_div error">
                    This field is required
                  </span>
                )}
                {statusType === "re_new_password" &&
                  statusResponse.length > 0 &&
                  statusResponse.map((data, index) => (
                    <span key={index} className="error_div error">
                      {data}
                    </span>
                  ))}
              </div>

              <button>Submit</button>
            </form>
          </div>
        </div>

        {statusType === "status_200" && (
          <PopupMiddle>
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
          </PopupMiddle>
        )}
      </section>
    </>
  );
}

export default PasswordChangePage;
