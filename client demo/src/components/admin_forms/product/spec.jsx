import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  createProductImage,
  createProductSpecification,
  getAllProductData,
  getProductDataByID,
  getProductImageByProduct,
  getProductSpecificationByProduct,
  updateProduct,
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

function ProductSpecForm() {
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
    formData.append("category", data.category);
    formData.append("product", mainTableID);

    dispatch(createProductSpecification(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductSpecificationByProduct({
            id: mainTableID,
          })
        );
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("product", mainTableID);

    dispatch(
      updateProductSpecification({ id: childTableID, specification: formData })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductSpecificationByProduct({
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
                You can <span>CHANGE</span> Spec. data here with ID (
                {childTableID}) :
              </legend>
            </>
          ) : (
            <legend>
              You can <span>CREATE</span> Spec. data here:
            </legend>
          )}

          <label htmlFor="category_pro">Category:</label>
          <input
            type="text"
            id="category_pro"
            placeholder="Like Specification..."
            {...register("category", { required: true })}
          />
          {errors.category?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default ProductSpecForm;
