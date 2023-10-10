// import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  search: string;
}

const NavigationSearchForm: React.FC = () => {
  /* Query Client */
  //   const queryClient = useQueryClient();

  /* Form */
  const { register, handleSubmit } = useForm<FormValues>();

  /* Query Mutation */
  //   const loginMutation = useMutation<UserTypes, Error, FormValues>({
  //     mutationFn: loginFunction,
  //     onSuccess: (data) => {
  //       if (data.status === "success") {

  //       }
  //     },
  //   });

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // loginMutation.mutate(data);
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          name="category"
          id="category"
          onChange={(e) => {
            if (e.target.value) {
                // navigate(
                //   `/filer_page/${e.target.value.split(",")[1]}/${
                //     e.target.value.split(",")[0]
                //   }`
                // );
                // dispatch(setFilteredIs(false));
            }
          }}
        >
          {/* {main_page && <option value={null}>Choose Category</option>} */}

          {/* {!isLoading ? (
            categoryData.map((category) => (
              <option
                key={category.id}
                value={category.id && `${category.id},${category.title}`}
              >
                {category.title && category.title}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )} */}
        </select>
        <input
          type="search"
          placeholder="Search Here"
          //   onFocus={searchLongHandler}
          {...register("search", { required: true })}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default NavigationSearchForm;
