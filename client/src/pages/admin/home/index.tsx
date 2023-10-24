import { SubmitHandler, useForm } from "react-hook-form";
import useAuthStore from "../../../store/client/user/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { UsersTypes } from "../../../types/userTypes";
import { getUsersByEmail } from "../../../api/user/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";

interface FormValues {
  email: string;
}

function AdminPanelPage() {
  /* States */
  const [searchedUsers, setSearchedUsers] = useState<UsersTypes | null>(null);

  /* Stores */
  const { user } = useAuthStore((state) => state);

  /* Form */
  const { register, handleSubmit } = useForm<FormValues>();
  useForm<FormValues>();

  /* Query Mutation */
  const getUsersMutation = useMutation({
    mutationFn: getUsersByEmail,
    onSuccess: (data) => {
      if (data?.status === "success") {
        setSearchedUsers(data);
      }
    },
  });

  // const getByStuffMutation = useMutation({
  //   mutationFn: getUsersByParams,
  //   onSuccess: (data) => {
  //     if (data?.status === "success") {
  //       setSearchedUsers(data);
  //     }
  //   },
  // });

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    getUsersMutation.mutate({ email: data.email });
  };
  return (
    <>
      {user?.status === "success" && (
        <>
          <section className="admin_home_introduction_section">
            <h1>Welcome to Admin Profile</h1>
          </section>

          <section className="admin_home_main_section">
            {/* Information */}
            <div className="information_container">
              <div className="name_container">
                <h2>Hello, {user.user.firstName}</h2>
              </div>

              <hr />

              <div className="profile_info">
                <div className="img_box">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                    }
                    alt=""
                  />
                </div>

                <div className="basic_info">
                  <div>
                    <p>First Name:</p> <span>{user.user.firstName}</span>
                  </div>
                  <div>
                    <p>Last Name:</p> <span>{user.user.lastName}</span>
                  </div>
                  <div>
                    <p>Email: </p>
                    <span>{user.user.email}</span>
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
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="search"
                    id="search"
                    placeholder="by Email"
                    {...register("email", { required: true })}
                  />
                  <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </form>

                <div className="sorted_users">
                  <button
                  // onClick={allUserHandler}
                  >
                    All User
                  </button>
                  <button
                    onClick={() => {
                      // getByStuffMutation.mutate({ params: "role=admin" });
                    }}
                  >
                    by Staff
                  </button>
                </div>

                {/* Table */}
                <table>
                  <thead>
                    <tr>
                      <th>Author</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedUsers ? (
                      searchedUsers.data.map((data) => (
                        <tr key={data.id}>
                          <td className="name">
                            <div className="img_div">
                              <img
                                src={
                                  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                                }
                                alt=""
                              />
                            </div>
                            <p>
                              {data.firstName} {data.lastName}
                            </p>
                          </td>
                          <td>{data.email && data.email}</td>
                          <td>
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
      )}
    </>
  );
}

export default AdminPanelPage;
