import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  getAllBrandData,
  updateBrand,
} from "../../../API/brand/action";
import { mainFormToggle } from "../../../redux/admin/tables/slice";

function AdminBrandForm() {
  ///////////////////////// R E D U X /////////////////////////
  const dispatch = useDispatch();

  ///////////////////////// R E D U X   S E L E C T O R S  /////////////////////////

  const { mainToggleForms, mainTableID } = useSelector(
    (state) => state.adminTable
  );

  const { eachBrandData, eachBrandIsLoading } = useSelector(
    (state) => state.brand
  );

  ///////////////////////// F O R M   /////////////////////////

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm();

  ///////////////////// F U N C T I O N S /////////////////////
  const onSubmitAdd = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("image", data.image[0]);

    dispatch(createBrand(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllBrandData());
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    dispatch(updateBrand({ id: mainTableID, brand: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllBrandData());
      });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      {mainToggleForms && (
        <>
          <button
            className="create_request_button"
            onClick={() => {
              dispatch(mainFormToggle(false));
            }}
          >
            Create Requests
          </button>
          {!eachBrandIsLoading && (
            <button
              className="all_value_button"
              onClick={() => {
                setValue("name", `${eachBrandData.name && eachBrandData.name}`);
                setValue(
                  "description",
                  `${eachBrandData.description && eachBrandData.description}`
                );
              }}
            >
              Set All Value Automatically
            </button>
          )}
        </>
      )}

      <form
        onSubmit={handleSubmit(!mainToggleForms ? onSubmitAdd : onSubmitChange)}
      >
        <fieldset>
          {!mainToggleForms ? (
            <legend>
              You can <span>CREATE</span> Brand data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Branch data here with ID (
              {mainTableID}) :
            </legend>
          )}

          <label htmlFor="name">Brand Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Brand Name..."
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Description..."
            {...register("description", { required: true })}
          />
          {errors.description?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            {...register("thumbnail", { required: true })}
          />
          {errors.thumbnail?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="image">Poster Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: true })}
          />
          {errors.image?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default AdminBrandForm;
