import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordConfirm } from "../../../API/auth/actions";
import AuthHeading from "../../../components/authHeading";
import PopupMiddle from "../../../components/popup/middle";

function PasswordResetConfirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [passwordShow, setPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);

  const [statusResponse, setStatusResponse] = useState("");
  const [statusType, setStatusType] = useState(null);

  const [popupShow, setPopupShow] = useState(false);

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  ////////////////////   S U B M I T     ////////////////////
  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.new_password === data.re_new_password) {
      formData.append("new_password", data.new_password);
      formData.append("re_new_password", data.re_new_password);
      formData.append("uid", params.uid);
      formData.append("token", params.token);

      dispatch(resetPasswordConfirm(formData))
        .unwrap()
        .then((originalPromiseResult) => {
          setPopupShow(true);
        })
        .catch((rejectedValue) => {
          if (rejectedValue.new_password) {
            if (rejectedValue.new_password) {
              setStatusResponse(rejectedValue.new_password);
              setStatusType("new_password");
            }
          }
          if (rejectedValue.re_new_password) {
            setStatusResponse(rejectedValue.re_new_password);
            setStatusType("re_new_password");
          }
        });
    } else {
      setStatusResponse(["Re password is not similar"]);
      setStatusType("re_new_password");
    }
  };
  return (
    <>
      <AuthHeading />

      <div className="confirmation_form_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => {
                setNewPasswordShow(!newPasswordShow);
              }}
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="NewPassword">New Password:</label>
            <input
              type={!newPasswordShow ? "password" : "text"}
              name="newPassword"
              id="newPassword"
              placeholder="New password"
              {...register("new_password", { required: true })}
            />

            {errors.new_password?.type === "required" && (
              <span className="error_div error">This field is required</span>
            )}
            {statusType === "new_password" &&
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
                setPasswordShow(!passwordShow);
              }}
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="re_new_password">Re. New Password:</label>
            <input
              type={!passwordShow ? "password" : "text"}
              name="re_new_password"
              id="re_new_password"
              placeholder="Re. New Password"
              {...register("re_new_password", { required: true })}
            />
            {errors.re_new_password?.type === "required" && (
              <span className="error_div error">This field is required</span>
            )}
            {statusType === "re_new_password" &&
              statusResponse.length > 0 &&
              statusResponse.map((data, index) => (
                <span key={index} className="error_div error">
                  {data}
                </span>
              ))}
          </div>

          <button type="submit">Submit</button>
        </form>
        {popupShow && (
          <PopupMiddle>
            <div className="text_cont">
              <div className="title">Congrats! Password has been changed</div>
              <button
                onClick={() => {
                  navigate("/");
                  setPopupShow(false);
                }}
              >
                OK
              </button>
            </div>
          </PopupMiddle>
        )}
      </div>
    </>
  );
}

export default PasswordResetConfirmation;
