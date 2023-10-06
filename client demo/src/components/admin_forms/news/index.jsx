import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createNews,
  getAllNewsData,
  updateNews,
} from "../../../API/news/action";
import { mainFormToggle } from "../../../redux/admin/tables/slice";

function AdminNewsForm() {
  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const { mainToggleForms, mainTableID } = useSelector(
    (state) => state.adminTable
  );

  ////////////////////   F O R M      ////////////////////
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  //  ////////////////////  N E W S  ////////////////////

  const onSubmitAdd = (data) => {
    const formData = new FormData();
    // moment.locale("en");
    // let deadlineFormat = moment(data.deadline).format("MMMM, DD, YYYY");
    formData.append("name", data.name);
    formData.append("deadline", data.deadline);
    formData.append("image", data.image[0]);
    dispatch(createNews(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllNewsData());
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    if (data.deadline) {
      formData.append("deadline", data.deadline);
    }
    dispatch(updateNews({ id: mainTableID, news: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllNewsData());
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
        <button
          className="create_request_button"
          onClick={() => {
            dispatch(mainFormToggle(false));
          }}
        >
          Create Requests
        </button>
      )}
      <form
        onSubmit={handleSubmit(!mainToggleForms ? onSubmitAdd : onSubmitChange)}
      >
        <fieldset>
          {!mainToggleForms ? (
            <legend>
              You can <span>CREATE</span> News data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> News data here with ID ({mainTableID})
              :
            </legend>
          )}

          <label htmlFor="name">News Name:</label>
          <input
            type="text"
            id="name"
            placeholder="News name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="image">News Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: mainToggleForms ? false : true })}
          />
          {errors.image?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="deadline">News Deadline:</label>
          <input
            type="date"
            id="deadline"
            {...register("deadline", {
              required: mainToggleForms ? false : true,
            })}
          />
          {errors.deadline?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default AdminNewsForm;
