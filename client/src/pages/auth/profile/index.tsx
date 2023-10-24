import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PopupMiddle from "../../../components/popup/middle";
import useAuthStore from "../../../store/client/user/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserTypes } from "../../../types/userTypes";
import { updateUser } from "../../../api/user/auth";
import ProfileSideBar from "../../../components/profileSidebar";

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
};

function ProfilePage() {
  /* Query Client */
  const queryClient = useQueryClient();

  /* Routes */
  const navigate = useNavigate();

  /* States */
  const [editable, setEditable] = useState(false);
  const [popupShow, setPopupShow] = useState(false);

  /* Stores */
  const { user, setUser } = useAuthStore((state) => state);

  const editHandler = () => {
    setEditable(!editable);
    setValue("firstName", `${user?.user.firstName}`);
    setValue("lastName", `${user?.user.firstName}`);
    setValue("email", `${user?.user.email}`);
  };

  /* Form */
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  /* Query Mutation */
  const updateMutation = useMutation<UserTypes, Error, FormValues>({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setUser({
          user: data.user,
          status: data.status,
          token: user ? user.token : "",
        });
      }
    },
  });

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
  };

  return (
    <>
      {user?.status === "success" && (
        <>
          <section className="costumer_section">
            {/* Side Bar */}
            <ProfileSideBar user={user.user} active={"profile"} />

            {/* Main information */}

            <div className="main_information">
              {/* Title */}
              <div className="title">
                <h1>Hello {user.user.firstName}</h1>
              </div>

              <div className="account_info">
                <h2>Account Info:</h2>

                {user.user.role === "" ? (
                  <div>
                    <p>Main Admin</p>
                    <button
                      onClick={() => {
                        navigate(`/admin/${user.user.id}`);
                      }}
                    >
                      Admin Panel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Main Admin - Demo</p>
                    <button
                      onClick={() => {
                        navigate(`/admin/${user.user.id}`);
                      }}
                    >
                      Admin Panel
                    </button>
                  </div>
                )}

                {
                  <div>
                    <p>Staff</p>
                    <button
                      onClick={() => {
                        navigate(`/admin/${user.user.id}`);
                      }}
                    >
                      Admin Panel
                    </button>
                  </div>
                }

                <button onClick={editHandler}>Edit Profile</button>
              </div>

              <hr />

              {/* Info */}

              <div className="info_container">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* First/Last Name */}
                  <div className="box">
                    <div>
                      <label htmlFor="first_name_p">First Name:</label>
                      {!editable ? (
                        <p>{user.user.firstName}</p>
                      ) : (
                        <>
                          <input
                            type="text"
                            id="first_name_p"
                            placeholder="First Name"
                            {...register("firstName")}
                          />
                        </>
                      )}
                    </div>
                    <div>
                      <label htmlFor="last_name">Last Name:</label>
                      {!editable ? (
                        <p>{user.user.lastName}</p>
                      ) : (
                        <>
                          <input
                            type="text"
                            id="last_name"
                            placeholder="Last Name"
                            {...register("lastName")}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Email/Phone */}
                  <div className="box">
                    <div>
                      <label htmlFor="email">Email:</label>
                      {!editable ? (
                        <p>{user.user.email}</p>
                      ) : (
                        <>
                          <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            readOnly={true}
                            {...register("email")}
                          />
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
            <PopupMiddle
              text="Please, Reset your Password after Log Out"
              closeFn={() => setPopupShow(false)}
            />
          )}
        </>
      )}
    </>
  );
}

export default ProfilePage;
