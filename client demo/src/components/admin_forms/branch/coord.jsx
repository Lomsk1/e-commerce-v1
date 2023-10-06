import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBranchCoords,
  getBranchCoordsByBranch,
  updateBranchCoords,
} from "../../../API/branch/action";
import { childFormsClose } from "../../../redux/admin/tables/slice";

function AdminCoordForm() {
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
    formData.append("lat", data.lat);
    formData.append("long", data.long);
    formData.append("branch", mainTableID);
    dispatch(createBranchCoords(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getBranchCoordsByBranch({
            id: mainTableID,
          })
        );
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("lat", data.lat);
    formData.append("long", data.long);
    formData.append("branch", mainTableID);
    dispatch(
      updateBranchCoords({
        id: childTableID,
        branch: formData,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getBranchCoordsByBranch({
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
              You can <span>CREATE</span> Coords data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Coords data here with ID (
              {childTableID}
              ):
            </legend>
          )}

          <label htmlFor="lat">Coord Lat. :</label>
          <input
            type="text"
            id="lat"
            placeholder="Latitude..."
            {...register("lat", { required: true })}
          />
          {errors.lat?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="long">Coord Long. :</label>
          <input
            type="text"
            id="long"
            placeholder="Longitude..."
            {...register("long", { required: true })}
          />
          {errors.long?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default AdminCoordForm;
