import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getBrandCategoryByBrand } from "../../../API/brand/action";
import {
  createProduct,
  getAllProductData,
  updateProduct,
} from "../../../API/product/actions";
import { mainFormToggle } from "../../../redux/admin/tables/slice";

function ProductForm() {
  //  ////////////////////  Other Infos  ////////////////////

  const [saleInfo, setSaleInfo] = useState(false);

  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const { eachProductData, eachProductIsLoading } = useSelector(
    (state) => state.product
  );

  const {
    brandData,
    brandDataIsLoading,
    brandCategoryData,
    brandCategoryDataIsLoading,
  } = useSelector((state) => state.brand);

  const { categoryData, categoryIsLoading } = useSelector(
    (state) => state.category
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

  ////////////////////   F U N C T I O N S     ////////////////////

  const onSubmitAdd = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("separate", data.separate);
    formData.append("description", data.description);
    formData.append("amount", 1);
    formData.append("new", true);
    formData.append("price", data.price);
    formData.append("total_price", data.price);
    formData.append("color", data.color);
    formData.append("product_model", data.product_model);
    formData.append("top", data.top);
    formData.append("popularity", data.popularity);
    formData.append("sale", data.sale);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("total_in_stock", data.total_in_stock);
    if (saleInfo === "true") {
      formData.append("sale", data.sale);
      formData.append("new_price", data.new_price);
      formData.append("total_new_price", data.new_price);
      formData.append("deadline", data.deadline);
    } else {
      formData.append("sale", 0);
      formData.append("new_price", 0);
      formData.append("total_new_price", 0);
      formData.append("deadline", "2099-10-10");
    }
    if (data.thumbnail != undefined) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    dispatch(createProduct(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllProductData());
      });
  };

  const onSubmitChange = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("separate", data.separate);
    formData.append("description", data.description);
    formData.append("amount", 1);
    formData.append("new", true);
    formData.append("price", data.price);
    formData.append("total_price", data.price);
    formData.append("color", data.color);
    formData.append("product_model", data.product_model);
    formData.append("top", data.top);
    formData.append("popularity", data.popularity);
    formData.append("sale", data.sale);
    formData.append("total_in_stock", data.total_in_stock);
    if (data.brand) {
      formData.append("brand", data.brand);
    }
    if (data.category) {
      formData.append("category", data.category);
    }
    if (saleInfo === "true") {
      formData.append("sale", data.sale);
      formData.append("new_price", data.new_price);
      formData.append("total_new_price", data.new_price);
      formData.append("deadline", data.deadline);
    } else {
      formData.append("sale", 0);
      formData.append("new_price", 0);
      formData.append("total_new_price", 0);
      formData.append("deadline", "2099-10-10");
    }
    if (data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    dispatch(updateProduct({ id: mainTableID, product: formData }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllProductData());
      });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      {/*from Change to Create Button  */}
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
          {!eachProductIsLoading && (
            <button
              className="all_value_button"
              onClick={() => {
                setValue(
                  "title",
                  `${eachProductData.title && eachProductData.title}`
                );
                setValue(
                  "separate",
                  `${eachProductData.separate && eachProductData.separate}`
                );
                setValue(
                  "description",
                  `${
                    eachProductData.description && eachProductData.description
                  }`
                );
                setValue(
                  "product_model",
                  `${
                    eachProductData.product_model &&
                    eachProductData.product_model
                  }`
                );
                setValue(
                  "price",
                  `${eachProductData.price && eachProductData.price}`
                );
                setValue(
                  "sale",
                  `${eachProductData.sale && eachProductData.sale}`
                );
                setValue(
                  "new_price",
                  `${eachProductData.new_price && eachProductData.new_price}`
                );
                setValue(
                  "deadline",
                  `${eachProductData.deadline && eachProductData.deadline}`
                );
                setValue(
                  "color",
                  `${eachProductData.color && eachProductData.color}`
                );
                setValue(
                  "top",
                  `${eachProductData.top && eachProductData.top}`
                );
                setValue(
                  "popularity",
                  `${eachProductData.popularity && eachProductData.popularity}`
                );
              }}
            >
              Set All Value Automatically
            </button>
          )}
        </>
      )}

      {/* Main Form */}

      <form
        onSubmit={handleSubmit(!mainToggleForms ? onSubmitAdd : onSubmitChange)}
      >
        <fieldset>
          {mainToggleForms ? (
            <>
              <legend>
                You can <span>CHANGE</span> Product data here with ID (
                {mainTableID}) :
              </legend>
            </>
          ) : (
            <legend>
              You can <span>CREATE</span> Product data here:
            </legend>
          )}

          <label htmlFor="title">Product Name:</label>
          <input
            type="text"
            id="title"
            placeholder="Product Title"
            {...register("title", { required: true })}
          />
          {errors.title?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="separate">Separate:</label>
          <input
            type="text"
            id="separate"
            placeholder="Separate, like some words, that are similar for several products"
            {...register("separate", { required: true })}
          />
          {errors.separate?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="product_model">Product Model:</label>
          <input
            type="text"
            id="product_model"
            placeholder="Product Model"
            {...register("product_model", { required: true })}
          />
          {errors.product_model?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Product Description"
            {...register("description", { required: true })}
          />
          {errors.description?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            {...register("price", { required: true })}
          />
          {errors.price?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            placeholder="Color: Ex: white, black... #eeeeee..."
            {...register("color", { required: true })}
          />
          {errors.color?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            {...register("thumbnail", { required: true })}
          />
          {errors.thumbnail?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="sale_choose">Sale ?:</label>
          <select
            name="sale_choose"
            id="sale_choose"
            onClick={(e) => {
              setSaleInfo(e.target.value);
            }}
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>

          {saleInfo === "true" && (
            <>
              <label htmlFor="sale">Sale:</label>
              <input
                type="number"
                id="sale"
                placeholder="Sale %..."
                {...register("sale", { required: true })}
              />
              {errors.sale?.type === "required" && (
                <span className="error_div">This field is required</span>
              )}

              <label htmlFor="new_price">New Price:</label>
              <input
                type="number"
                id="new_price"
                placeholder="New Price"
                {...register("new_price", { required: true })}
              />
              {errors.new_price?.type === "required" && (
                <span className="error_div">This field is required</span>
              )}

              <label htmlFor="deadline">Sales Deadline:</label>
              <input
                type="date"
                id="deadline"
                placeholder="Choose Deadline"
                {...register("deadline", { required: true })}
              />
              {errors.deadline?.type === "required" && (
                <span className="error_div">This field is required</span>
              )}
            </>
          )}

          <label htmlFor="top">Top ?:</label>
          <select name="top" id="top" {...register("top", { required: true })}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {errors.top?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="popularity">Popular ?:</label>
          <select
            name="popularity"
            id="popularity"
            {...register("popularity", { required: true })}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {errors.popularity?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          <label htmlFor="total_in_stock">Is it in Stock ?:</label>
          <select
            name="total_in_stock"
            id="total_in_stock"
            {...register("total_in_stock", { required: true })}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {errors.total_in_stock?.type === "required" && (
            <span className="error_div">This field is required</span>
          )}

          {/* Brand Choose */}
          <fieldset className="inner_fieldset">
            <legend className="inner_legend">Choose Brand</legend>
            <select
              name="brand"
              id="brand"
              onChange={(e) => {
                dispatch(
                  getBrandCategoryByBrand({
                    id: e.target.value,
                  })
                );
              }}
            >
              <option value="">Please, Choose a Brand</option>
              {!brandDataIsLoading &&
                brandData.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
            </select>

            {!brandCategoryDataIsLoading && (
              <select
                name="brand_category"
                id="brand_category"
                {...register("brand", {
                  required: !mainToggleForms ? true : false,
                })}
              >
                <option value="">Please, Choose a Category</option>
                {!brandCategoryDataIsLoading &&
                  brandCategoryData.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
              </select>
            )}
          </fieldset>

          {/* Category Choose */}
          <fieldset className="inner_fieldset">
            <legend className="inner_legend">Choose Category</legend>

            <select
              name="category"
              id="category"
              {...register("category", {
                required: !mainToggleForms ? true : false,
              })}
            >
              <option value="">Please, Choose a Category</option>
              {!categoryIsLoading &&
                categoryData.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.title}
                  </option>
                ))}
            </select>
          </fieldset>

          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
}

export default ProductForm;
