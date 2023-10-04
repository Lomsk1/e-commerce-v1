import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  createProductBasics,
  createProductImage,
  createProductSpecification,
  getAllProductData,
  getProductBasicsByProduct,
  getProductDataByID,
  getProductImageByProduct,
  getProductSpecificationByProduct,
  updateProduct,
  updateProductBasics,
  updateProductImage,
  updateProductSpecification,
} from "../../../API/product/actions";
import {
  mainFormToggle,
  setApiCollector,
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";

function ProductBasicForm() {
  //  ////////////////////  Other Infos  ////////////////////

  const [saleInfo, setSaleInfo] = useState(false);

  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const {
    mainToggleForms,
    mainTableID,
    otherTableToggle,
    childTableID,
    childFormName,
    childFormAdd,
    childFormChange,
    apiCollector,
    thirdNestedTableID,
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

  ////////////////////   F U N C T I O N S     ////////////////////

  const onSubmitAdd = (data) => {
    const formData = new FormData();
    formData.append("middle", data.middle);
    formData.append("name", data.name);
    formData.append("basic", thirdNestedTableID);

    dispatch(createProductBasics(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductBasicsByProduct({
            id: thirdNestedTableID,
          })
        );
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("middle", data.middle);
    formData.append("name", data.name);
    formData.append("basic", thirdNestedTableID);

    dispatch(updateProductBasics({ id: childTableID, basic: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductBasicsByProduct({
            id: thirdNestedTableID,
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
      {/*from Change to Create Button  */}
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
        </>
      )}

      {/* Main Form */}

      <form
        onSubmit={handleSubmit(childFormAdd ? onSubmitAdd : onSubmitChange)}
      >
        <fieldset>
          {!childFormAdd ? (
            <>
              <legend>
                You can <span>CHANGE</span> Spec. Basics data here with ID (
                {childTableID}) :
              </legend>
            </>
          ) : (
            <legend>
              You can <span>CREATE</span> Spec. Basics data here:
            </legend>
          )}

          <label htmlFor="middle">Title:</label>
          <input
            type="text"
            id="middle"
            placeholder="Title of Basic"
            {...register("middle", { required: true })}
          />
          {errors.middle?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Type full name..."
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

export default ProductBasicForm;
