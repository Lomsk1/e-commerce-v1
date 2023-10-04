import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrandCategory,
  getBrandCategoryByBrand,
  updateBrandCategory,
} from "../../../API/brand/action";
import { childFormsClose } from "../../../redux/admin/tables/slice";

function AdminBrandCategoryForm() {
  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  //  ////////////////////  Data Selector     ////////////////////
  const { mainTableID, childTableID, childFormAdd, childFormChange } =
    useSelector((state) => state.adminTable);

  //  //////////////////// Requests     ////////////////////

  const onSubmitAdd = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brands", mainTableID);

    dispatch(createBrandCategory(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getBrandCategoryByBrand({
            id: mainTableID,
          })
        );
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brands", mainTableID);
    dispatch(
      updateBrandCategory({
        id: childTableID,
        brand_category: formData,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getBrandCategoryByBrand({
            id: mainTableID,
          })
        );
      });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(childFormAdd ? onSubmitAdd : onSubmitChange)}
      >
        <button
          onClick={() => {
            dispatch(childFormsClose());
          }}
        >
          Close
        </button>
        <fieldset>
          {childFormAdd ? (
            <legend>
              You can <span>CREATE</span> Category data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Category data here with ID (
              {childTableID}
              ):
            </legend>
          )}

          <label htmlFor="category_name">Category name. :</label>
          <input
            type="text"
            id="category_name"
            placeholder="Category Name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default AdminBrandCategoryForm;
