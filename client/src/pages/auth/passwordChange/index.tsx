// import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { loadUser, setNewPassword } from "../../../API/auth/actions";
// import HeadingInformation from "../../../components/heading_info";
// import Navigation from "../../../components/navigation";
// import PopupMiddle from "../../../components/popup/middle";
// import ProfileSideBar from "../../../components/profileSideBar";

import { useState } from "react";
import useAuthStore from "../../../store/client/user/useAuthStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserTypes } from "../../../types/userTypes";
import { updatePassword } from "../../../api/user/auth";
import ProfileSideBar from "../../../components/profileSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import PopupMiddle from "../../../components/popup/middle";

interface FormValues {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

function PasswordChangePage() {
  /* Query Client */
  const queryClient = useQueryClient();

  /* States */
  const [new_passwordShow, setNew_password] = useState<boolean>(false);
  const [re_new_passwordShow, setRe_new_passwordShow] =
    useState<boolean>(false);
  const [current_passwordShow, setCurrent_passwordShow] =
    useState<boolean>(false);

  const [statusType, setStatusType] = useState<string | null>(null);

  /* Stores */
  const { user, setUser } = useAuthStore((state) => state);

  ////////////////////   F O R M      ////////////////////
  /* Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  /* Query Mutation */
  const updatePasswordMutation = useMutation<UserTypes, Error, FormValues>({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      if (data.status === "success") {
        setStatusType(
          "Password has been changed successfully, Please login again"
        );
      }
    },
    onError: (data) => {
      setStatusType(data.message);
    },
  });

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updatePasswordMutation.mutate(data);
  };

  return (
    <>
      {user?.status === "success" && (
        <section className="password_change">
          {/* Side bar */}
          <ProfileSideBar user={user["user"]} active={"password"} />

          <div className="main_information">
            {/* Title */}
            <div className="title">
              <h1>Password Change:</h1>
            </div>

            <hr />

            {/* Form */}
            <div className="form_container">
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder="Current Password"
                    {...register("passwordCurrent", { required: true })}
                  />
                  {errors.passwordCurrent?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                  {/* {statusType === "current_password" &&
                    statusResponse.length > 0 &&
                    statusResponse.map((data, index) => (
                      <span key={index} className="error_div error">
                        {data}
                      </span>
                    ))} */}
                </div>
                {/*  */}
                <div>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => {
                      setNew_password(!new_passwordShow);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <label htmlFor="new_password">New Password:</label>
                  <input
                    type={new_passwordShow ? "text" : "password"}
                    id="new_password"
                    placeholder="New password"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                  {/* {statusType === "new_password" &&
                    statusResponse.length > 0 &&
                    statusResponse.map((data, index) => (
                      <span key={index} className="error_div error">
                        {data}
                      </span>
                    ))} */}
                </div>
                {/*  */}
                <div>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => {
                      setRe_new_passwordShow(!re_new_passwordShow);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <label htmlFor="re_new_password">Re. New Password:</label>
                  <input
                    type={re_new_passwordShow ? "text" : "password"}
                    id="re_new_password"
                    placeholder="re. your password"
                    {...register("passwordConfirm", { required: true })}
                  />
                  {errors.passwordConfirm?.type === "required" && (
                    <span className="error_div error">
                      This field is required
                    </span>
                  )}
                  {/* {statusType === "re_new_password" &&
                    statusResponse.length > 0 &&
                    statusResponse.map((data, index) => (
                      <span key={index} className="error_div error">
                        {data}
                      </span>
                    ))} */}
                </div>

                <button>Submit</button>
              </form>
            </div>
          </div>

          {statusType && (
            <PopupMiddle
              text={statusType}
              closeFn={() => {
                queryClient.invalidateQueries({ queryKey: ["user"] });
                setUser(null);
                setStatusType(null);
              }}
            />
          )}
        </section>
      )}
    </>
  );
}

export default PasswordChangePage;
