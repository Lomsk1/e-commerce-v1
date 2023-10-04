import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  createProductImage,
  createProductSpecification,
  createProductStock,
  getAllProductData,
  getProductDataByID,
  getProductImageByProduct,
  getProductSpecificationByProduct,
  getProductStockByProduct,
  updateProduct,
  updateProductImage,
  updateProductSpecification,
  updateProductStock,
} from "../../../API/product/actions";
import {
  mainFormToggle,
  setApiCollector,
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";

function ProductStockForm() {
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

  const { branchData, isLoading } = useSelector((state) => state.branch);
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
    formData.append("in_stock", data.in_stock);
    formData.append("product", mainTableID);
    formData.append("branch", data.branch);

    dispatch(createProductStock(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductStockByProduct({
            id: mainTableID,
          })
        );
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("in_stock", data.in_stock);
    formData.append("product", mainTableID);
    formData.append("branch", data.branch);

    dispatch(updateProductStock({ id: childTableID, stock: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductStockByProduct({
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
                You can <span>CHANGE</span> Stock data here with ID (
                {childTableID}) :
              </legend>
            </>
          ) : (
            <legend>
              You can <span>CREATE</span> Stock data here:
            </legend>
          )}

          <label htmlFor="branch">Choose Branch</label>
          <select
            name="branch"
            id="branch"
            {...register("branch", { required: true })}
          >
            {!isLoading ? (
              branchData.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))
            ) : (
              <option>No Data Found</option>
            )}
          </select>

          <label htmlFor="in_stock">Stock ?</label>
          <select
            name="in_stock"
            id="in_stock"
            {...register("in_stock", { required: true })}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default ProductStockForm;
