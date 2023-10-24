import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { RemoveScroll } from "react-remove-scroll";
import useAdminBranchStore from "../../../../store/admin/branch";
import { createBranchWorkingTime } from "../../../../api/branch/workingTime/create";

interface FormValues {
  weekDay: string;
  hour: string;
}

const BranchAddWorkingTime = () => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* State */
  const { addTimeBranchId, clearAddTimeBranchId } = useAdminBranchStore(
    (state) => state
  );

  /* Form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const addWeekTimeMutation = useMutation({
    mutationFn: createBranchWorkingTime,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
        reset();
      }
    },
  });

  const onSubmitAddWeekTime: SubmitHandler<FormValues> = (data) => {
    addWeekTimeMutation.mutate({
      id: addTimeBranchId!,
      weekDay: data.weekDay,
      hour: data.hour,
    });
    clearAddTimeBranchId();
  };
  return (
    <>
      <div className="popup_forms_">
        <RemoveScroll className="container_pop">
          <>
            <button onClick={() => clearAddTimeBranchId()}>Close</button>
            <form onSubmit={handleSubmit(onSubmitAddWeekTime)}>
              <label htmlFor="weekDay">Week Day:</label>
              <input
                type="text"
                id="weekDay"
                placeholder="monday - sunday ..."
                {...register("weekDay", { required: true })}
              />
              {errors.weekDay?.type === "required" && (
                <span className="error_div">This field is required</span>
              )}

              <label htmlFor="hour">Hour:</label>
              <input
                type="text"
                id="hour"
                placeholder="10:00 - 18:00 ... "
                {...register("hour", { required: true })}
              />
              {errors.hour?.type === "required" && (
                <span className="error_div">This field is required</span>
              )}

              <div className="but">
                <button type="submit">Send</button>
              </div>
            </form>
          </>
        </RemoveScroll>
      </div>
    </>
  );
};

export default BranchAddWorkingTime;
