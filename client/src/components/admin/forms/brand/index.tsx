import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import PopupMiddle from "../../../popup/middle";
import { useState } from "react";
import useAdminBrandStore from "../../../../store/admin/brand";
import { updateBrand } from "../../../../api/brand/update";
import { createBrand } from "../../../../api/brand/create";
import BrandAddCategory from "./addCategory";

interface FormValues {
  name: string;
  description: string;
  image: File[];
  thumbnail: File[];
}

const AdminBrandForm = () => {
  /* Query Client */
  const queryClient = useQueryClient();
  /* States */
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* Stores */
  const { brandId, clearBrandId, addCategoryBrandId } = useAdminBrandStore(
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
    mutationFn: updateBrand,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        reset();
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        reset();
      } else {
        setErrorMsg(data.message);
      }
    },
  });

  const onSubmitAdd: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("image", data.image[0]);

    createMutation.mutate({ formData: formData });
  };

  const onSubmitChange: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.thumbnail[0]) formData.append("thumbnail", data.thumbnail[0]);
    if (data.image[0]) formData.append("image", data.image[0]);
    updateMutation.mutate({ id: brandId!, formData: formData });
  };

  return (
    <>
      {brandId && (
        <button className="close_main_edit" onClick={() => clearBrandId()}>
          Create
        </button>
      )}
      x
      <form
        onSubmit={handleSubmit(!brandId ? onSubmitAdd : onSubmitChange)}
        id="categoryMainForm"
      >
        <fieldset>
          {!brandId ? (
            <legend>
              You can <span>CREATE</span> Category data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Category data here: (Nothing Req.)
            </legend>
          )}

          {/* Name */}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name..."
            {...register("name", { required: !brandId ? true : false })}
          />
          {errors.name?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          {/* Description */}
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="description..."
            {...register("description", { required: !brandId ? true : false })}
          />
          {errors.description?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          {/* Thumbnail */}
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            {...register("thumbnail", { required: !brandId ? true : false })}
          />
          {errors.thumbnail?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          {/* Image */}
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            accept="image/*"
            id="image"
            {...register("image", { required: !brandId ? true : false })}
          />
          {errors.image?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          <input type="submit" />
        </fieldset>
      </form>
      {addCategoryBrandId && (
        <>
          <BrandAddCategory />
        </>
      )}
      {/* Errors */}
      {errorMsg && (
        <PopupMiddle text={errorMsg} closeFn={() => setErrorMsg(null)} />
      )}
    </>
  );
};

export default AdminBrandForm;
