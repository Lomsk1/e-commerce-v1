import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFunction } from "../../../api/user/auth";
import { UserTypes } from "../../../types/userTypes";
import { setUserCookie } from "../../../helpers/user";
import useAuthStore from "../../../store/client/user/useAuthStore";
import useForgottenPasswordStore from "../../../store/client/user/usePasswordStore";

type FormValues = {
  email: string;
  password: string;
};

interface PropTypes {
  close: () => void;
}

const LoginForm: React.FC<PropTypes> = ({ close }) => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* Stores */
  const userState = useAuthStore((state) => state.setUser);
  const { setForgottenPassword } = useForgottenPasswordStore((state) => state);

  /* Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  /* Query Mutation */
  const loginMutation = useMutation<UserTypes, Error, FormValues>({
    mutationFn: loginFunction,
    onSuccess: (data) => {
      if (data.status === "success") {
        setUserCookie(data.token);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        userState(data);
        close();
      }
    },
  });

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.email?.type === "required" && (
        <span className="error_div error">This field is required</span>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      {errors.password?.type === "required" && (
        <span className="error_div error">This field is required</span>
      )}
      <p
        onClick={() => {
          setForgottenPassword(true);
        }}
      >
        Forgot Password?
      </p>

      {loginMutation.isError ? (
        <span className="error_div error">{loginMutation.error.message}</span>
      ) : null}

      <div className="buttons">
        <button type="submit">Log in</button>
      </div>
    </form>
  );
};

export default LoginForm;
