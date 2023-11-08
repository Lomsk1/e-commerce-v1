import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import PopupMiddle from "../../../popup/middle";
import { useState } from "react";
import useAdminProductStore from "../../../../store/admin/product";
import { brandsTypes } from "../../../../types/brand";
import { CategoriesTypes } from "../../../../types/categoryTypes";
import { createProduct } from "../../../../api/products/create";
import { updateProduct } from "../../../../api/products/update";

interface FormValues {
  title: string;
  description: string;
  thumbnail: File[];
  color: string;
  price: number;
  brand: string;
  category: string;
  separate: string;
}

interface PropTypes {
  brands: brandsTypes | null | undefined;
  categories: CategoriesTypes | null | undefined;
}

const AdminProductForm: React.FC<PropTypes> = ({ brands, categories }) => {
  /* Query Client */
  const queryClient = useQueryClient();
  /* States */
  const [errorMsg, setErrorMsg] = useState<{
    message: string;
    status: string;
  } | null>(null);

  /* Stores */
  const {
    ProductId,
    // addTimeBranchId,
    clearProductId,
  } = useAdminProductStore((state) => state);

  /* Form */
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  /* Query Mutation */
  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        reset();
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["productStats"] });

        reset();
      }
      if (data.status === "error") {
        setError(data.error.errors.name.path, {
          type: "custom",
          message: data.error.errors.name.message,
        });
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const onSubmitAdd: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    const parsedBrand: { id: string; name: string; image: string } = data.brand
      ? JSON.parse(data.brand)
      : null;

    const parsedCategory: { id: string; name: string } = data.category
      ? JSON.parse(data.category)
      : null;

    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.thumbnail[0]) formData.append("thumbnail", data.thumbnail[0]);
    if (data.color) formData.append("color", data.color);
    if (data.price) formData.append("price", data.price.toString());
    if (data.separate) formData.append("separate", data.separate);

    if (data.brand) formData.append("brandId", parsedBrand.id);
    if (data.brand) formData.append("brand[id]", parsedBrand.id);
    if (data.brand) formData.append("brand[name]", parsedBrand.name);
    if (data.brand) formData.append("brand[image]", parsedBrand.image);

    if (data.category) formData.append("categoryFilter", parsedCategory.id);
    if (data.category) formData.append("category[id]", parsedCategory.id);
    if (data.category) formData.append("category[name]", parsedCategory.name);

    createMutation.mutate({
      formData: formData,
    });
  };

  const onSubmitChange: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    const parsedBrand: { id: string; name: string; image: string } = data.brand
      ? JSON.parse(data.brand)
      : null;

    const parsedCategory: { id: string; name: string } = data.category
      ? JSON.parse(data.category)
      : null;

    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.thumbnail[0]) formData.append("thumbnail", data.thumbnail[0]);
    if (data.color) formData.append("color", data.color);
    if (data.price) formData.append("price", data.price.toString());
    if (data.separate) formData.append("separate", data.separate);

    if (data.brand) formData.append("brandId", parsedBrand.id);
    if (data.brand) formData.append("brand[id]", parsedBrand.id);
    if (data.brand) formData.append("brand[name]", parsedBrand.name);
    if (data.brand) formData.append("brand[image]", parsedBrand.image);

    if (data.category) formData.append("categoryFilter", parsedCategory.id);
    if (data.category) formData.append("category[id]", parsedCategory.id);
    if (data.category) formData.append("category[name]", parsedCategory.name);

    updateMutation.mutate({
      formData: formData,
      id: ProductId!,
    });
  };

  return (
    <>
      {ProductId && (
        <button className="close_main_edit" onClick={() => clearProductId()}>
          Create
        </button>
      )}

      <form
        onSubmit={handleSubmit(!ProductId ? onSubmitAdd : onSubmitChange)}
        id="productMainForm"
      >
        <fieldset>
          {!ProductId ? (
            <legend>
              You can <span>CREATE</span> Product data here:
            </legend>
          ) : (
            <legend>
              You can <span>CHANGE</span> Product data here: (Nothing Req.)
            </legend>
          )}

          <label htmlFor="title_">Product Title:</label>
          <input
            type="text"
            id="title_"
            placeholder="Product Title ..."
            {...register("title", { required: !ProductId ? true : false })}
          />
          {errors.title?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          {errors.title?.type === "custom" && (
            <span className="error_div">{errors.title.message}</span>
          )}

          <label htmlFor="description_">Description:</label>
          <textarea
            id="description_"
            placeholder="Description ..."
            {...register("description", {
              required: !ProductId ? true : false,
            })}
          />
          {errors.description?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          {errors.description?.type === "custom" && (
            <span className="error_div">{errors.description.message}</span>
          )}

          <label htmlFor="Thumbnail_">Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            id="Thumbnail_"
            {...register("thumbnail", { required: !ProductId ? true : false })}
          />
          {errors.thumbnail?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          {errors.thumbnail?.type === "custom" && (
            <span className="error_div">{errors.thumbnail.message}</span>
          )}

          <label htmlFor="color_">Color:</label>
          <input
            type="text"
            id="color_"
            placeholder="Color ..."
            {...register("color", { required: !ProductId ? true : false })}
          />
          {errors.color?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          {errors.color?.type === "custom" && (
            <span className="error_div">{errors.color.message}</span>
          )}

          <label htmlFor="price_">Price:</label>
          <input
            type="number"
            id="price_"
            placeholder="Price ... "
            min={0}
            {...register("price", { required: !ProductId ? true : false })}
          />
          {errors.price?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          {errors.price?.type === "custom" && (
            <span className="error_div">{errors.price.message}</span>
          )}

          <label htmlFor="separate_">Separate:</label>
          <input
            type="text"
            id="separate_"
            placeholder="Separated title "
            min={0}
            {...register("separate", { required: !ProductId ? true : false })}
          />
          {errors.separate?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}
          {errors.separate?.type === "custom" && (
            <span className="error_div">{errors.separate.message}</span>
          )}

          <fieldset>
            <legend>Brand: </legend>
            {brands?.status === "success" &&
              brands.data.map((brand) => (
                <div key={brand.id} className="choice">
                  <label htmlFor={brand.id}>{brand.name}</label>
                  <input
                    type="radio"
                    id={brand.id}
                    value={JSON.stringify({
                      id: brand.id,
                      name: brand.name,
                      image: brand.thumbnail.url,
                    })}
                    {...register("brand", {
                      required: !ProductId ? true : false,
                    })}
                  />
                </div>
              ))}
          </fieldset>

          <fieldset>
            <legend>Category: </legend>
            {categories?.status === "success" &&
              categories.data.map((category) => (
                <div key={category.id} className="choice">
                  <label htmlFor={category.id}>{category.name}</label>
                  <input
                    type="radio"
                    id={category.id}
                    value={JSON.stringify({
                      id: category.id,
                      name: category.name,
                    })}
                    {...register("category", {
                      required: !ProductId ? true : false,
                    })}
                  />
                </div>
              ))}
          </fieldset>
          <input type="submit" />
        </fieldset>
      </form>
      {/* {addTimeBranchId && (
        <>
          <BranchAddWorkingTime />
        </>
      )} */}
      {/* Errors */}
      {errorMsg && (
        <PopupMiddle
          text={errorMsg.message}
          closeFn={() => setErrorMsg(null)}
        />
      )}
    </>
  );
};

export default AdminProductForm;
