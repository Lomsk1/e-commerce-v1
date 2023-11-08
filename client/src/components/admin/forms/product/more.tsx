import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import PopupMiddle from "../../../popup/middle";
import { useState } from "react";
import useAdminProductStore from "../../../../store/admin/product";
import { updateProductMore } from "../../../../api/products/update";

interface FormValues {
  sale: number;
  newPrice: number;
  top: boolean;
  popularity: boolean;
  productModel: string;
  totalInStock: boolean;
}

const AdminProductMoreForm = () => {
  /* Query Client */
  const queryClient = useQueryClient();
  /* States */
  const [errorMsg, setErrorMsg] = useState<{
    message: string;
    status: string;
  } | null>(null);

  /* Stores */
  const { moreProductAddFormId, clearMoreProductAddFormId } =
    useAdminProductStore((state) => state);

  /* Form */
  const { register, handleSubmit, reset, setError } = useForm<FormValues>();

  /* Query Mutation */
  const createMutation = useMutation({
    mutationFn: updateProductMore,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        clearMoreProductAddFormId();
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
    createMutation.mutate({
      sale: data.sale ? Number(data.sale) : undefined,
      newPrice: data.newPrice ? Number(data.newPrice) : undefined,
      top: data.top,
      popularity: data.popularity,
      productModel: data.productModel ? data.productModel : undefined,
      totalInStock: data.totalInStock,
      id: moreProductAddFormId!,
    });
  };

  return (
    <>
      {moreProductAddFormId && (
        <button
          className="close_main_edit"
          onClick={() => clearMoreProductAddFormId()}
        >
          Close
        </button>
      )}

      <form onSubmit={handleSubmit(onSubmitAdd)} id="productMoreMainForm">
        <fieldset>
          <legend>
            You can <span>CREATE/Change</span> Product More data here:
          </legend>

          <label htmlFor="sale_">Sale:</label>
          <input
            type="number"
            min={0}
            id="sale_"
            placeholder="New price ..."
            {...register("sale")}
          />

          <label htmlFor="newPrice_">New Price:</label>
          <input
            type="number"
            min={0}
            id="newPrice_"
            placeholder="new Price ..."
            {...register("newPrice")}
          />

          <div className="choice">
            <label htmlFor="top_">Top:</label>
            <input type="checkbox" id="top_" {...register("top")} />
          </div>
          <div className="choice">
            <label htmlFor="popularity_">Popularity:</label>
            <input
              type="checkbox"
              id="popularity_"
              {...register("popularity")}
            />
          </div>

          <label htmlFor="productModel_">Product Model:</label>
          <input
            type="text"
            id="productModel_"
            placeholder="Product Model ... "
            min={0}
            {...register("productModel")}
          />
          <div className="choice">
            <label htmlFor="inStock_">In Stock:</label>
            <input
              type="checkbox"
              id="inStock_"
              {...register("totalInStock")}
            />
          </div>
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

export default AdminProductMoreForm;
