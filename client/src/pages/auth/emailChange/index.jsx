import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadUser,
  logout,
  setNewEmail,
  setNewPassword,
} from "../../../API/auth/actions";
import HeadingInformation from "../../../components/heading_info";
import Navigation from "../../../components/navigation";
import PopupMiddle from "../../../components/popup/middle";
import ProfileSideBar from "../../../components/profileSideBar";

function EmailChangeHandler() {
  const dispatch = useDispatch();
  const [current_passwordShow, setCurrent_passwordShow] = useState(false);
  const [statusResponse, setStatusResponse] = useState("");
  const [statusType, setStatusType] = useState(null);
  const [statusResponseMail, setStatusResponseMail] = useState("");
  const [statusTypeMail, setStatusTypeMail] = useState(null);

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
    dispatch(setNewEmail(data))
      .unwrap()
      .then((originalPromiseResult) => {
        setStatusResponse(
          "Email has been changed."
        );
        setStatusType("status_200");
      })
      .catch((rejectedValue) => {
        setStatusResponse(rejectedValue.current_password);
        setStatusType("current_password");
        setStatusResponseMail(rejectedValue.new_email);
        setStatusTypeMail("mail");
      });
  };
  return (
    <>
      <HeadingInformation />
      <Navigation />
      <section className="email_change">
        {/* Side bar */}
        <ProfileSideBar active={"email"} />

        <div className="main_information">
          {/* Title */}
          <div className="title">
            <h1>EMail Change:</h1>
          </div>

          <hr />

          {/* Form */}
          <div className="form_container">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*  */}
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <label htmlFor="new_email">New Email:</label>
                <input
                  type="email"
                  id="new_email"
                  name="new_email"
                  placeholder="New Email"
                  {...register("new_email", { required: true })}
                />
                {errors.new_email?.type === "required" && (
                  <span className="error_div error">
                    This field is required
                  </span>
                )}
                {statusTypeMail === "mail" &&
                  statusResponseMail.length > 0 &&
                  statusResponseMail.map((data, index) => (
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

export default EmailChangeHandler;
