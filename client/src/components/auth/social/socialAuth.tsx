import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialAuth = () => {
  return (
    <>
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
    </>
  );
};

export default SocialAuth;
