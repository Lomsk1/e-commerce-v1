import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { RemoveScroll } from "react-remove-scroll";
import useAdminBrandStore from "../../../../store/admin/brand";
import { createBrandCategory } from "../../../../api/brand/category/create";
import useCategoryStore from "../../../../store/client/category/category";

interface FormValues {
  category: string;
}

const BrandAddCategory = () => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* State */
  const { addCategoryBrandId, clearAddCategoryBrandId } = useAdminBrandStore(
    (state) => state
  );
  const categories = useCategoryStore((state) => state.categories);

  /* Form */
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const addCategoryMutation = useMutation({
    mutationFn: createBrandCategory,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        reset();
      }
    },
  });

  const onSubmitAddCategory: SubmitHandler<FormValues> = (data) => {
    addCategoryMutation.mutate({
      id: addCategoryBrandId!,
      data: data.category,
    });
    clearAddCategoryBrandId();
  };
  return (
    <>
      <div className="popup_forms_">
        <RemoveScroll className="container_pop">
          <>
            <button onClick={() => clearAddCategoryBrandId()}>Close</button>
            <form onSubmit={handleSubmit(onSubmitAddCategory)}>
              {categories?.status === "success" &&
                categories.data.map((info) => (
                  <div className="choice" key={info.id}>
                    <label htmlFor={info.id}>{info.name}</label>
                    <input
                      type="radio"
                      id={info.id}
                      value={JSON.stringify({
                        categoryId: info.id,
                        name: info.name,
                      })}
                      {...register("category", { required: true })}
                    />
                  </div>
                ))}
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

export default BrandAddCategory;
