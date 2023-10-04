import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBranchWorkingHours,
  getBranchWorkingHoursByBranch,
  updateBranchWorkingHours,
} from "../../../API/branch/action";
import { childFormsClose } from "../../../redux/admin/tables/slice";

function AdminWorkingHourForm() {
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
  const { mainTableID, childTableID, childFormAdd } = useSelector(
    (state) => state.adminTable
  );

  //  //////////////////// Requests     ////////////////////

  const onSubmitAdd = (data) => {
    const formData = new FormData();
    formData.append("week_day", data.week_day);
    formData.append("hour", data.hour);
    formData.append("branch", mainTableID);

    dispatch(createBranchWorkingHours(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getBranchWorkingHoursByBranch({
            id: mainTableID,
          })
        );
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("week_day", data.week_day);
    formData.append("hour", data.hour);
    formData.append("branch", mainTableID);
    dispatch(
      updateBranchWorkingHours({
        id: childTableID,
        branch: formData,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getBranchWorkingHoursByBranch({
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
              You can <span>CREATE</span> Working Hour data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Working Hour data here with ID (
              {childTableID}
              ):
            </legend>
          )}

          <label htmlFor="week_day">Week Day:</label>
          <input
            type="text"
            id="week_day"
            placeholder="Working Day..."
            {...register("week_day", { required: true })}
          />
          {errors.week_day?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="hour">Working Hour:</label>
          <input
            type="text"
            id="hour"
            placeholder="Working Hour..."
            {...register("hour", { required: true })}
          />
          {errors.hour?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default AdminWorkingHourForm;
