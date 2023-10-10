import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordTypes } from "../../../types/userTypes";
import { resetPassword } from "../../../api/user/auth";
import usePopupMiddleStore from "../../../store/client/popup/useMiddleStore";
import PopupMiddle from "../../popup/middle";

type FormValues = {
  email: string;
  password: string;
};

const ForgetPasswordForm = () => {
  /* Stores */
  const { setText, popupShow, popupText, clear } = usePopupMiddleStore(
    (state) => state
  );

  /* Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  /* Query Mutation */
  const resetPasswordMutation = useMutation<
    ResetPasswordTypes,
    Error,
    FormValues
  >({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      setText(data.message);
    },
    onError: (data) => {
      setText(data.message);
    },
  });

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    resetPasswordMutation.mutate(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <span className="error_div error">This field is required</span>
        )}

        <div className="buttons">
          <button type="submit">Reset Password</button>
        </div>
      </form>

      {popupShow && <PopupMiddle text={popupText!} closeFn={clear} />}
    </>
  );
};

export default ForgetPasswordForm;
