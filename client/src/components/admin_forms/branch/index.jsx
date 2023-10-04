import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBranch,
  getAllBranchData,
  updateBranch,
} from "../../../API/branch/action";
import { mainFormToggle } from "../../../redux/admin/tables/slice";

function AdminBranchForm() {
  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm();

  //  ////////////////////  Data Selector     ////////////////////

  const { mainToggleForms, mainTableID } = useSelector(
    (state) => state.adminTable
  );

  const { eachBranchData, eachBranchIsLoading } = useSelector(
    (state) => state.branch
  );

  //  ////////////////////  B R A N C H  ////////////////////

  const onSubmitAdd = (data) => {
    dispatch(createBranch(data))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllBranchData());
      });
  };

  const onSubmitChange = (data) => {
    dispatch(updateBranch({ id: mainTableID, branch: data }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllBranchData());
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
          {!eachBranchIsLoading && (
            <button
              className="all_value_button"
              onClick={() => {
                setValue(
                  "name",
                  `${eachBranchData.name && eachBranchData.name}`
                );
                setValue(
                  "city",
                  `${eachBranchData.city && eachBranchData.city}`
                );
                setValue(
                  "address",
                  `${eachBranchData.address && eachBranchData.address}`
                );
                setValue(
                  "phone",
                  `${eachBranchData.phone && eachBranchData.phone}`
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
              You can <span>CREATE</span> Branch data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Branch data here with ID (
              {mainTableID}) :
            </legend>
          )}

          <label htmlFor="name">Branch Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Branch Name..."
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="City..."
            {...register("city", { required: true })}
          />
          {errors.city?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            placeholder="Branch Address..."
            {...register("address", { required: true })}
          />
          {errors.address?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            placeholder="Phone (+995...)"
            {...register("phone", { required: true })}
          />
          {errors.phone?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default AdminBranchForm;
