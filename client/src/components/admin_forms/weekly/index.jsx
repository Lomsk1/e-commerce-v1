import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createWeeklySale,
  getAllWeeklySaleData,
  updateWeeklySale,
} from "../../../API/weekly_sale/action";
import { mainFormToggle } from "../../../redux/admin/tables/slice";

function AdminWeeklyForm() {
  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const { eachWeeklySaleData, eachIsLoading } = useSelector(
    (state) => state.weekly_sale
  );

  const { mainToggleForms, mainTableID } = useSelector(
    (state) => state.adminTable
  );

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm();

  //  ////////////////////  W E E K L Y   S A L E S  ////////////////////
  const onSubmitAdd = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("deadline", data.deadline);
    formData.append("image", data.image[0]);
    dispatch(createWeeklySale(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllWeeklySaleData());
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    if (data.deadline) {
      formData.append("deadline", data.deadline);
    }
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    dispatch(updateWeeklySale({ id: mainTableID, weeklySale: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllWeeklySaleData());
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
                  `${eachWeeklySaleData.title && eachWeeklySaleData.title}`
                );
                setValue(
                  "text",
                  `${eachWeeklySaleData.text && eachWeeklySaleData.text}`
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
              You can <span>CREATE</span> Weekly Sale data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Weekly Sale data here with ID (
              {mainTableID}) :
            </legend>
          )}

          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Title..."
            {...register("title", { required: true })}
          />
          {errors.title?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="text">Text:</label>
          <input
            type="text"
            id="text"
            placeholder="Some text..."
            {...register("text", { required: true })}
          />
          {errors.text?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="image">Sale Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: !eachIsLoading ? true : false })}
          />
          {errors.image?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="deadline">Sale Deadline:</label>
          <input
            type="date"
            id="deadline"
            {...register("deadline", {
              required: eachIsLoading ? true : false,
            })}
          />

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default AdminWeeklyForm;
