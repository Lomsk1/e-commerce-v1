import { SubmitHandler, useForm } from "react-hook-form";
import useCategoryStore from "../../../store/client/category/category";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSearchWrapperStore from "../../../store/client/search/search";
import { useMutation } from "@tanstack/react-query";
import { ProductsType } from "../../../types/product";
import { getSearchProducts } from "../../../api/products/get";
import useSearchProductStore from "../../../store/client/search/products";

interface FormValues {
  slug: string;
}

const NavigationSearchForm: React.FC = () => {
  /* Router */
  const navigate = useNavigate();

  /* States */
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);

  /* Query Client */
  // const queryClient = useQueryClient();

  /* Store */
  const categoriesStore = useCategoryStore((state) => state.categories);
  const searchWrapper = useSearchWrapperStore(
    (state) => state.setSearchWrapperIsShow
  );
  const { setProducts, clear } = useSearchProductStore((state) => state);

  /* Form */
  const { register, handleSubmit } = useForm<FormValues>();

  /* Query Mutation */
  const searchMutation = useMutation<ProductsType, Error, FormValues>({
    mutationFn: getSearchProducts,
    onSuccess: (data) => {
      if (data.status === "success") {
        setProducts(data);
      }
    },
  });

  if (searchMutation.isError) {
    clear();
  }

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    searchMutation.mutate(data);
    searchWrapper(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          name="category"
          id="category"
          onChange={(e) => {
            if (e.target.value) {
              navigate(
                `/filer_page/${e.target.value.split(",")[1]}/${
                  e.target.value.split(",")[0]
                }`
              );
            }
          }}
          onClick={() => setSelectIsOpen(true)}
        >
          <option value={``} disabled={selectIsOpen}>
            Categories
          </option>
          {categoriesStore?.status === "success" &&
            categoriesStore.data.map((category) => (
              <option
                key={category.id}
                value={category.id && `${category.id},${category.name}`}
              >
                {category.name && category.name}
              </option>
            ))}
        </select>
        <input
          type="search"
          placeholder="Search Here"
          onFocus={() => searchWrapper(true)}
          onClick={() => searchWrapper(true)}
          {...register("slug", { required: true })}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default NavigationSearchForm;
