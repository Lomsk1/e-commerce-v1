import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  createProductImage,
  getAllProductData,
  getProductDataByID,
  getProductImageByProduct,
  updateProduct,
  updateProductImage,
} from "../../../API/product/actions";
import {
  mainFormToggle,
  setApiCollector,
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";

function ProductImageForm() {
  //  ////////////////////  Other Infos  ////////////////////

  const [saleInfo, setSaleInfo] = useState(false);

  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const { eachProductData, eachProductIsLoading } = useSelector(
    (state) => state.product
  );

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
    formData.append("image", data.image[0]);
    formData.append("product", mainTableID);

    dispatch(createProductImage(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductImageByProduct({
            id: mainTableID,
          })
        );
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("product", mainTableID);

    dispatch(updateProductImage({ id: childTableID, image: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductImageByProduct({
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
                You can <span>CHANGE</span> Image data here with ID (
                {childTableID}) :
              </legend>
            </>
          ) : (
            <legend>
              You can <span>CREATE</span> Image data here:
            </legend>
          )}

          <label htmlFor="image">Choose Image:</label>
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

export default ProductImageForm;
