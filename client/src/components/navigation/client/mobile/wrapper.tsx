import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthStore from "../../../../store/client/user/useAuthStore";
import NavSearchFormMobile from "./searchForm";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  faArrowRightFromBracket,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import useCategoryStore from "../../../../store/client/category/category";
import { useState } from "react";
import ProfileContainer from "../components/profileContainer";
import AccountContainer from "../components/accountContainer";

interface PropTypes {
  checked: boolean;
  setChecked: ({ check }: { check: boolean }) => void;
}

const NavMobileSearchWrapper: React.FC<PropTypes> = ({
  checked,
  setChecked,
}) => {
  /* Routes */
  const navigate = useNavigate();

  /* Stores */
  const { isAuthenticated, user } = useAuthStore((state) => state);
  const categories = useCategoryStore((state) => state.categories);

  /* States */
  const [profile, setProfile] = useState<boolean>(false);
  const [admin, setAdmin] = useState(false);

  const profileHandler = () => {
    setProfile(!profile);
  };
  const adminHandler = () => {
    setAdmin(!admin);
  };

  return (
    <>
      <div
        className="mobile_section"
        style={{ display: checked ? "flex" : "none" }}
      >
        {/* Search Bar */}
        <NavSearchFormMobile setBurger={(e) => setChecked({ check: e.bol })} />

        {/* Account & Categories */}

        <div className="container">
          <div className="account_container">
            {isAuthenticated ? (
              <>
                <div className="account" onClick={profileHandler}>
                  <FontAwesomeIcon icon={faUser} />
                  <p>
                    Welcome <br />
                    {user && user.user.firstName}
                  </p>
                </div>

                {profile && (
                  <ProfileContainer visible={profile} close={profileHandler} />
                )}
              </>
            ) : (
              <>
                <div className="account">
                  <FontAwesomeIcon icon={faUser} onClick={adminHandler} />
                  <p onClick={adminHandler}>My Account</p>
                  {admin && (
                    <AccountContainer visible={admin} close={adminHandler} />
                  )}
                </div>
              </>
            )}

            <div
              className="account"
              onClick={() => {
                navigate("/hot_deal_main_page");
              }}
            >
              <FontAwesomeIcon icon={faPercent} />
              <p>All Hot Sales</p>
            </div>
          </div>

          <div className="categories_container">
            <ul>
              {categories?.status === "success" &&
                categories.data.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => {
                      navigate(
                        `/products-filter/?categoryFilter=${category.id}`
                      );
                      setChecked({ check: false });
                    }}
                  >
                    <div className="icons"></div>
                    <p>{category.name}</p>
                    <div className="arrow">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMobileSearchWrapper;
