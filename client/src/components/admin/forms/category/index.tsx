import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import PopupMiddle from "../../../popup/middle";
import { useState } from "react";
import useAdminCategoryStore from "../../../../store/admin/category";
import { createCategory } from "../../../../api/category/create";
import { updateCategory } from "../../../../api/category/update";

interface FormValues {
  name: string;
}

const AdminCategoryForm = () => {
  /* Query Client */
  const queryClient = useQueryClient();
  /* States */
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* Stores */
  const { categoryId, clearCategoryId } = useAdminCategoryStore(
    (state) => state
  );

  /* Form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  /* Query Mutation */
  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        reset();
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        reset();
      }
      if (data.status === "error") {
        setErrorMsg(data.message);
      }
    },
  });

  const onSubmitAdd: SubmitHandler<FormValues> = (data) => {
    createMutation.mutate({
      name: data.name,
    });
  };

  const onSubmitChange: SubmitHandler<FormValues> = (data) => {
    updateMutation.mutate({
      id: categoryId!,
      name: data.name ? data.name : undefined,
    });
  };

  return (
    <>
      {categoryId && (
        <button className="close_main_edit" onClick={() => clearCategoryId()}>
          Create
        </button>
      )}
      x
      <form
        onSubmit={handleSubmit(!categoryId ? onSubmitAdd : onSubmitChange)}
        id="categoryMainForm"
      >
        <fieldset>
          {!categoryId ? (
            <legend>
              You can <span>CREATE</span> Category data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Category data here: (Nothing Req.)
            </legend>
          )}

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name..."
            {...register("name", { required: !categoryId ? true : false })}
          />
          {errors.name?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          <input type="submit" />
        </fieldset>
      </form>
      {/* Errors */}
      {errorMsg && (
        <PopupMiddle
          text={errorMsg}
          closeFn={() => setErrorMsg(null)}
        />
      )}
    </>
  );
};

export default AdminCategoryForm;
