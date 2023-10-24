import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateBranch } from "../../../../api/branch/update";
import { createBranch } from "../../../../api/branch/create";
import BranchAddWorkingTime from "./addWorkingTime";
import useAdminBranchStore from "../../../../store/admin/branch";

interface FormValues {
  name: string;
  address: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  weekDay: string;
  hour: string;
}

const AdminBranchForm = () => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* States */
  const { branchId, addTimeBranchId, clearBranchId } = useAdminBranchStore(
    (state) => state
  );

  /* Form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  /* Query Mutation */
  const updateMutation = useMutation({
    mutationFn: updateBranch,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
        reset();
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: createBranch,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
        reset();
      }
    },
  });

  const onSubmitAdd: SubmitHandler<FormValues> = (data) => {
    createMutation.mutate({
      city: data.city,
      address: data.address,
      name: data.name,
      phone: data.phone,
      branchCoord: {
        lat: data.lat,
        long: data.long,
      },
    });
  };

  const onSubmitChange: SubmitHandler<FormValues> = (data) => {
    updateMutation.mutate({
      id: branchId!,
      city: data.city ? data.city : undefined,
      address: data.address ? data.address : undefined,
      name: data.name ? data.name : undefined,
      phone: data.phone ? data.phone : undefined,
      branchCoord:
        data.lat || data.long
          ? {
              lat: data.lat ? data.lat : undefined,
              long: data.long ? data.long : undefined,
            }
          : undefined,
    });
  };

  return (
    <>
      {branchId && (
        <button className="close_main_edit" onClick={() => clearBranchId()}>
          Create
        </button>
      )}
      x
      <form
        onSubmit={handleSubmit(!branchId ? onSubmitAdd : onSubmitChange)}
        id="branchMainForm"
      >
        <fieldset>
          {!branchId ? (
            <legend>
              You can <span>CREATE</span> Branch data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Branch data here: (Nothing Req.)
            </legend>
          )}

          <label htmlFor="name">Branch Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Branch Name..."
            {...register("name", { required: !branchId ? true : false })}
          />
          {errors.name?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="City..."
            {...register("city", { required: !branchId ? true : false })}
          />
          {errors.city?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            placeholder="Branch Address..."
            {...register("address", { required: !branchId ? true : false })}
          />
          {errors.address?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            placeholder="Phone (+995...)"
            {...register("phone", { required: !branchId ? true : false })}
          />
          {errors.phone?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <fieldset>
            <legend>Coords</legend>
            <label htmlFor="lat">Coord - lat:</label>
            <input
              type="text"
              id="lat"
              placeholder="54.1231..."
              {...register("lat", { required: !branchId ? true : false })}
            />
            {errors.lat?.type === "required" && (
              <span className="error_div">This field is required</span>
            )}

            <label htmlFor="long">Coord - long:</label>
            <input
              type="text"
              id="long"
              placeholder="54.1231..."
              {...register("long", { required: !branchId ? true : false })}
            />
            {errors.long?.type === "required" && (
              <span className="error_div">This field is required</span>
            )}
          </fieldset>
          <input type="submit" />
        </fieldset>
      </form>
      {addTimeBranchId && (
        <>
          <BranchAddWorkingTime />
        </>
      )}
    </>
  );
};

export default AdminBranchForm;
