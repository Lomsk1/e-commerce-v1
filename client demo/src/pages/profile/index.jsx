import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUser, loadUser } from "../../API/auth/actions";
import HeadingInformation from "../../components/heading_info";
import Navigation from "../../components/navigation";
import PopupMiddle from "../../components/popup/middle";
import ProfileSideBar from "../../components/profileSideBar";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editable, setEditable] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const [avatarError, setAvatarError] = useState("");
  const [avatarErrShow, setAvatarErrShow] = useState(false);

  const [popupShow, setPopupShow] = useState(false);

  useEffect(() => {
    dispatch(loadUser());
    if (userInfo && userInfo.is_staff === true) {
      localStorage.setItem("blob", "true");
    }
  }, []);

  ////////////////////   S E L E C T O R     ////////////////////

  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  ////////////////////   F O R M      ////////////////////

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm();

  ////////////////////   F U N C T I O N S     ////////////////////

  const editHandler = () => {
    setEditable(!editable);
    setValue("first_name", `${userInfo.first_name && userInfo.first_name}`);
    setValue("last_name", `${userInfo.last_name && userInfo.last_name}`);
    setValue("email", `${userInfo.email && userInfo.email}`);
    setValue("phone", `${userInfo.phone && userInfo.phone}`);
    setValue("country", `${userInfo.country && userInfo.country}`);
    setValue("city", `${userInfo.city && userInfo.city}`);
    setValue(
      "legal_address",
      `${userInfo.legal_address && userInfo.legal_address}`
    );
    setValue(
      "physical_address",
      `${userInfo.physical_address && userInfo.physical_address}`
    );
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("legal_address", data.legal_address);
    formData.append("physical_address", data.physical_address);
    formData.append("password", data.password);
    formData.append("email", userInfo.email);

    if (data.gender) {
      formData.append("gender", data.gender);
    }
    if (data.date) {
      formData.append("birth_day", data.date);
    }
    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    dispatch(editUser(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadUser());
        reset();
        setEditable(false);
        setAvatarErrShow(false);
        setPopupShow(true);
      })
      .catch((rejectedValue) => {
        if (rejectedValue.avatar) {
          setAvatarErrShow(true);
          setAvatarError(rejectedValue.avatar);
        }
      });
  };

  return (
    <>
      <HeadingInformation />
      <Navigation />
      <section className="costumer_section">
        {/* Side Bar */}
        <ProfileSideBar active={"profile"} />

        {/* Main information */}

        <div className="main_information">
          {/* Title */}
          <div className="title">
            <h1>
              Hello {userInfo && userInfo.first_name && userInfo.first_name}
            </h1>
          </div>

          <div className="account_info">
            <h2>Account Info:</h2>

            {isAuthenticated && userInfo && userInfo.is_superuser && (
              <div>
                <p>Main Admin</p>
                <button
                  onClick={() => {
                    navigate("/admin_home_page");
                  }}
                >
                  Admin Panel
                </button>
              </div>
            )}

            {isAuthenticated &&
              userInfo &&
              userInfo.is_staff &&
              !userInfo.is_superuser && (
                <div>
                  <p>Staff</p>
                  <button
                    onClick={() => {
                      navigate("/admin_home_page");
                    }}
                  >
                    Admin Panel
                  </button>
                </div>
              )}

            <button onClick={editHandler}>Edit Profile</button>
          </div>

          <hr />

          {/* Info */}

          <div className="info_container">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* First/Last Name */}
              <div className="box">
                <div>
                  <label htmlFor="first_name">First Name:</label>
                  {!editable ? (
                    <p>
                      {userInfo && userInfo.first_name && userInfo.first_name}
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        {...register("first_name", { required: true })}
                      />
                      {errors.first_name?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <label htmlFor="last_name">Last Name:</label>
                  {!editable ? (
                    <p>
                      {userInfo && userInfo.last_name && userInfo.last_name}
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        {...register("last_name", { required: true })}
                      />
                      {errors.last_name?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Email/Phone */}
              <div className="box">
                <div>
                  <label htmlFor="email">Email:</label>
                  {!editable ? (
                    <p>{userInfo && userInfo.email && userInfo.email}</p>
                  ) : (
                    <>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        readOnly={true}
                        {...register("email", { required: true })}
                      />
                      {errors.email?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <label htmlFor="phone">Phone:</label>
                  {!editable ? (
                    <p>{userInfo && userInfo.phone && userInfo.phone}</p>
                  ) : (
                    <>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        placeholder="(+995...)"
                        {...register("phone", { required: true })}
                      />
                      {errors.phone?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Gender/Date */}
              <div className="box">
                <div>
                  <label htmlFor="gender">Gender:</label>
                  {!editable ? (
                    <p>{userInfo && userInfo.gender && userInfo.gender}</p>
                  ) : (
                    <>
                      <select
                        name="gender"
                        id="gender"
                        {...register("gender", { required: false })}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>

                      {errors.gender?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <label htmlFor="date_of_birth">Date of Birth:</label>
                  {!editable ? (
                    <p>
                      {userInfo && userInfo.birth_day && userInfo.birth_day}
                    </p>
                  ) : (
                    <>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        {...register("date", { required: false })}
                      />
                      {errors.date?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Country/City */}
              <div className="box">
                <div>
                  <label htmlFor="country">Country:</label>
                  {!editable ? (
                    <p>{userInfo && userInfo.country && userInfo.country}</p>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        {...register("country", { required: true })}
                      />
                      {errors.country?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <label htmlFor="city">City:</label>
                  {!editable ? (
                    <p>{userInfo && userInfo.city && userInfo.city}</p>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Last Name"
                        {...register("city", { required: true })}
                      />
                      {errors.city?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="box">
                <div>
                  <label htmlFor="legal_address">Legal Address:</label>
                  {!editable ? (
                    <p>
                      {userInfo &&
                        userInfo.legal_address &&
                        userInfo.legal_address}
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="legal_address"
                        name="legal_address"
                        placeholder="Legal Address"
                        {...register("legal_address", { required: true })}
                      />
                      {errors.legal_address?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <label htmlFor="physical_address">Physical address:</label>
                  {!editable ? (
                    <p>
                      {userInfo &&
                        userInfo.physical_address &&
                        userInfo.physical_address}
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="physical_address"
                        name="physical_address"
                        placeholder="Physical Address"
                        {...register("physical_address", { required: true })}
                      />
                      {errors.physical_address?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Avatar/password */}
              <div className="box">
                {editable && (
                  <div>
                    <label htmlFor="avatar">Avatar (not required):</label>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("avatar", { required: false })}
                    />

                    {avatarErrShow &&
                      avatarError.length > 0 &&
                      avatarError.map((data, index) => (
                        <span key={index} className="error_div error">
                          {data}
                        </span>
                      ))}
                  </div>
                )}

                <div>
                  {editable && (
                    <>
                      <label htmlFor="password" style={{ color: "red" }}>
                        Warning! Enter only Valid PASSWORD:
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{
                            marginLeft: "1em",
                            color: "grey",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setPasswordShow(!passwordShow);
                          }}
                        />
                      </label>

                      <input
                        type={!passwordShow ? "password" : "text"}
                        id="password"
                        name="password"
                        placeholder="Only valid Password!"
                        {...register("password", { required: true })}
                      />
                      {errors.password?.type === "required" && (
                        <span className="error_div">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Button */}
              {editable && <button>Submit</button>}
            </form>
          </div>
        </div>
      </section>

      {popupShow && (
        <PopupMiddle>
          <div className="text_cont">
            <div>
              <p>Please, Reset your Password after Log Out</p>
            </div>
            <button
              onClick={() => {
                setPopupShow(false);
              }}
            >
              Close
            </button>
          </div>
        </PopupMiddle>
      )}
    </>
  );
}

export default ProfilePage;
