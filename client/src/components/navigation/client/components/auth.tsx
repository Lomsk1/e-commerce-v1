import React, { useState } from "react";
import ProfileContainer from "./profileContainer";
import AccountContainer from "./accountContainer";
import { UserTypes } from "../../../../types/userTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
// import { useQueryClient } from "@tanstack/react-query";

interface AuthTypes {
  isAuthenticated: boolean;
  userInfo?: UserTypes["user"];
}

const AuthClientNavigation: React.FC<AuthTypes> = ({
  isAuthenticated,
  userInfo,
}) => {
  const [profileLong, setProfileLong] = useState<boolean>(false);
  const [adminLong, setAdminLong] = useState(false);

  const profileLongHandler = () => {
    setProfileLong(!profileLong);
  };

  const adminLongHandler = () => {
    setAdminLong(!adminLong);
  };

  // const queryClient = useQueryClient();
  // console.log(queryClient.invalidateQueries({ queryKey: ["user"] }));
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="account" onClick={profileLongHandler}>
            <FontAwesomeIcon icon={faUser} />
            <p>
              Welcome <br />
              {userInfo?.firstName}
            </p>
          </div>

          {profileLong && (
            <ProfileContainer
              visible={profileLong}
              close={profileLongHandler}
            />
          )}
        </>
      ) : (
        <>
          <div className="account" onClick={adminLongHandler}>
            <FontAwesomeIcon icon={faUser} />
            <p>My Account</p>
          </div>

          {adminLong && (
            <AccountContainer visible={adminLong} close={adminLongHandler} />
          )}
        </>
      )}
    </>
  );
};

export default AuthClientNavigation;
