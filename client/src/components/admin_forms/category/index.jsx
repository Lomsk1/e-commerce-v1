import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getAllCategoryData,
  updateCategory,
} from "../../../API/category/action";
import { mainFormToggle } from "../../../redux/admin/tables/slice";

function AdminCategoryForm() {
  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const { eachCategoryData, eachIsLoading } = useSelector(
    (state) => state.category
  );

  const {
    mainToggleForms,
    mainTableID,
    otherTableToggle,
    childTableID,
    childFormName,
    childFormAdd,
    childFormChange,
  } = useSelector((state) => state.adminTable);

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm();

  //  ////////////////////  C A T E G O R Y  ////////////////////

  const onSubmitAdd = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image[0]);
    dispatch(createCategory(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllCategoryData());
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    dispatch(updateCategory({ id: mainTableID, category: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllCategoryData());
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
          {!eachIsLoading && (
            <button
              className="all_value_button"
              onClick={() => {
                setValue(
                  "title",
                  `${eachCategoryData.title && eachCategoryData.title}`
                );
                setValue(
                  "description",
                  `${
                    eachCategoryData.description && eachCategoryData.description
                  }`
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
              You can <span>CREATE</span> Category data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Category data here with ID (
              {mainTableID}) :
            </legend>
          )}

          <label htmlFor="title">Category Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Category title"
            {...register("title", { required: true })}
          />
          {errors.title?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="image">Category Image(Like an Icon):</label>
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

export default AdminCategoryForm;
