import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { registerVerification } from "../../../API/auth/actions";
import AuthHeading from "../../../components/authHeading";
import PopupMiddle from "../../../components/popup/middle";

function UserActivatePage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [statusResponse, setStatusResponse] = useState("");
  const [statusType, setStatusType] = useState(null);

  const [popupShow, setPopupShow] = useState(false);

  const submitHandler = () => {
    dispatch(
      registerVerification({
        uid: params.uid,
        token: params.token,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setPopupShow(true);
      })
      .catch((rejectedValue) => {
        setStatusResponse(["Something went wrong. Please, try again!"]);
        setStatusType("error");
      });
  };

  return (
    <>
      <AuthHeading />

      <div className="user_confirm">
        <div className="title">
          <h1>Tap the button to Confirm</h1>
        </div>
        <button onClick={submitHandler}>Confirm</button>

        {statusType === "error" &&
          statusResponse.length > 0 &&
          statusResponse.map((data, index) => (
            <span key={index} className="error_div error">
              {data}
            </span>
          ))}
      </div>

      {popupShow && (
        <PopupMiddle>
          <div className="text_cont">
            <div className="title">Congrats! Account has been Activated</div>
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
    </>
  );
}

export default UserActivatePage;
