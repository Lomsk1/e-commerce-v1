import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PopupStatus({
  condition,
  text,
}: {
  condition: "success" | "error";
  text: string;
}) {
  return (
    <>
      <div
        className="popup_status_container"
        style={{ borderColor: condition === "success" ? "#27a300" : "#C81D25" }}
      >
        <div className="icon_box">
          {condition === "success" && (
            <FontAwesomeIcon icon={faCheckCircle} color={"#27a300"} />
          )}
          {condition === "error" && (
            <FontAwesomeIcon icon={faExclamationCircle} color="#C81D25" />
          )}
        </div>

        <div className="txt_box">
          <p style={{ color: condition === "success" ? "#319C41" : "#C81D25" }}>
            {text}
          </p>
        </div>
      </div>
    </>
  );
}

export default PopupStatus;
