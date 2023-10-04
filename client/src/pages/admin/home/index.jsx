import {
  faDeleteLeft,
  faFingerprint,
  faMagnifyingGlass,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllUser, loadUser } from "../../../API/auth/actions";
import HeadingInformation from "../../../components/heading_info";
import Navigation from "../../../components/navigation";

function AdminHomePage() {
  const dispatch = useDispatch();

  const [usersInfo, setUsersInfo] = useState([]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAllUser());
  }, []);

  ////////////////////   S E L E C T O R     ////////////////////

  const { isAuthenticated, userInfo, allUserInfo } = useSelector(
    (state) => state.auth
  );

  ////////////////////   F O R M     ////////////////////

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  ////////////////////   F U N C T I O N S      ////////////////////

  const onSearchHandler = (data) => {
    setUsersInfo(
      allUserInfo.filter((info) =>
        info.email.toString().toLowerCase().includes(data.search.toLowerCase())
      )
    );
  };

  const allUserHandler = () => {
    setUsersInfo(allUserInfo);
  };

  const byStaffHandler = () => {
    setUsersInfo(
      allUserInfo.filter(
        (data) => data.is_staff === true || data.is_superuser === true
      )
    );
  };

  return (
    <>
      <section className="admin_home_introduction_section">
        <h1>Welcome to Admin Profile</h1>
      </section>

      <section className="admin_home_main_section">
        {/* Navigation */}
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/admin_branch"}>Branch</Link>
          </li>
          <li>
            <Link to={"/admin_brand"}>Brand</Link>
          </li>
          <li>
            <Link to={"/admin_category"}>Category</Link>
          </li>
          <li>
            <Link to={"/admin_news"}>News</Link>
          </li>
          <li>
            <Link to={"/admin_product"}>Product</Link>
          </li>
          <li>
            <Link to={"/admin_weekly_sale"}>Weekly Sales</Link>
          </li>
        </ul>

        {/* Information */}
        <div className="information_container">
          <div className="name_container">
            <h2>Hello, {isAuthenticated && userInfo && userInfo.first_name}</h2>
          </div>

          <hr />

          <div className="profile_info">
            <div className="img_box">
              <img
                src={
                  userInfo && userInfo.avatar != null
                    ? import.meta.env.VITE_APP_BASE_URL + userInfo.avatar
                    : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                }
                alt=""
              />
            </div>

            <div className="basic_info">
              <div>
                <p>First Name:</p>{" "}
                <span>
                  {isAuthenticated && userInfo && userInfo.first_name}
                </span>
              </div>
              <div>
                <p>Last Name:</p>{" "}
                <span>{isAuthenticated && userInfo && userInfo.last_name}</span>
              </div>
            </div>
          </div>

          {/* Table Title */}
          <div className="member_statistic">
            <div className="title_box">
              <h2>Members Statistics</h2>
            </div>

            <form
              className="user_search_form"
              onSubmit={handleSubmit(onSearchHandler)}
            >
              <input
                type="search"
                name="search"
                id="search"
                placeholder="by Email"
                {...register("search", { required: true })}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>

            <div className="sorted_users">
              <button onClick={allUserHandler}>All User</button>
              <button onClick={byStaffHandler}>by Staff</button>
            </div>

            {/* Table */}
            <table>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isAuthenticated && usersInfo && usersInfo.length > 0 ? (
                  usersInfo.map((data) => (
                    <tr key={data.id}>
                      <td className="name">
                        <div className="img_div">
                          <img
                            src={
                              data.avatar != null
                                ? import.meta.env.VITE_APP_BASE_URL +
                                  data.avatar
                                : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                            }
                            alt=""
                          />
                        </div>
                        <p>
                          {data.first_name && data.first_name}{" "}
                          {data.last_name && data.last_name}
                        </p>
                      </td>
                      <td>{data.email && data.email}</td>
                      <td>*************</td>
                      <td>
                        <button>
                          {<FontAwesomeIcon icon={faFingerprint} />}{" "}
                          <div>Password</div>
                        </button>
                        <button>
                          {<FontAwesomeIcon icon={faUser} />}{" "}
                          <div>User Info</div>
                        </button>
                        <button>
                          {<FontAwesomeIcon icon={faTrash} />}{" "}
                          <div>User Del.</div>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      Please, first choose which categories do you prefer!
                    </td>
                  </tr>
                )}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminHomePage;
