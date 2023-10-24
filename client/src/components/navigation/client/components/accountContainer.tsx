import Wrapper from "../../../wrapper";
import TriangleSVG from "../../../../assets/icons/triangle";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../../auth/forms/signin";
import useForgottenPasswordStore from "../../../../store/client/user/usePasswordStore";
import ForgetPasswordForm from "../../../auth/forms/forget-password.tsx";
import SocialAuth from "../../../auth/social/socialAuth.tsx";

interface AccountContainerTypes {
  visible: boolean;
  close: () => void;
}

const AccountContainer: React.FC<AccountContainerTypes> = ({
  visible,
  close,
}) => {
  /* Stores */
  const { forgottenPassword, setForgottenPassword } = useForgottenPasswordStore(
    (state) => state
  );

  /* Router */
  const navigate = useNavigate();

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
        {!forgottenPassword ? (
          <>
            {/* Login Form */}

            <LoginForm close={close} />

            <button
              onClick={() => {
                navigate("/register");
                close();
              }}
              className={"register_btn"}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <ForgetPasswordForm />

            <button
              onClick={() => {
                setForgottenPassword(false);
              }}
              className={"register_btn"}
            >
              Back to Log in
            </button>
          </>
        )}

        <hr />

        <div className="or">
          <p>or</p>
        </div>

        {/* Social Authorization */}
        <SocialAuth />
      </Wrapper>
    </>
  );
};

export default AccountContainer;
