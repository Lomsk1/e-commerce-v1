import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { RemoveScroll } from "react-remove-scroll";
import useAdminBranchStore from "../../../../store/admin/branch";
import { updateBranchTime } from "../../../../api/branch/workingTime/update";

interface FormValues {
  weekDay: string;
  hour: string;
}

const BranchEditWorkingTime = () => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* State */
  const { editTimeBranchId, clearEditTimeBranchId, branchId } =
    useAdminBranchStore((state) => state);

  /* Form */
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const updateWeekTimeMutation = useMutation({
    mutationFn: updateBranchTime,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
        reset();
      }
    },
  });

  const onSubmitUpdateWeekTime: SubmitHandler<FormValues> = (data) => {
    updateWeekTimeMutation.mutate({
      id: branchId!,
      timeId: editTimeBranchId!,
      weekDay: data.weekDay ? data.weekDay : undefined,
      hour: data.hour ? data.hour : undefined,
    });
    clearEditTimeBranchId();
  };
  return (
    <>
      <div className="popup_forms_">
        <RemoveScroll className="container_pop">
          <>
            <button className="close_" onClick={() => clearEditTimeBranchId()}>
              Close
            </button>
            <form onSubmit={handleSubmit(onSubmitUpdateWeekTime)}>
              <label htmlFor="weekDay">Week Day:</label>
              <input
                type="text"
                id="weekDay"
                placeholder="monday - sunday ..."
                {...register("weekDay")}
              />
              <label htmlFor="hour">Hour:</label>
              <input
                type="text"
                id="hour"
                placeholder="10:00 - 18:00 ... "
                {...register("hour")}
              />

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

export default BranchEditWorkingTime;
