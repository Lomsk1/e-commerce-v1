import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataByID, updateProduct } from "../../../API/product/actions";

function AdminSaleTable() {
  const { eachProductData, eachProductIsLoading } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  const [formShow, setFormShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("sale", data.sale);
    formData.append("new_price", data.new_price);
    formData.append("total_new_price", data.new_price);
    if (data.deadline.length > 0) {
      formData.append("deadline", data.deadline);
    }
    dispatch(updateProduct({ id: eachProductData.id, product: formData }));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      dispatch(getProductDataByID({ id: eachProductData.id }));
    }
  }, [formState, reset]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Sale</th>
            <th>New Price</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!eachProductIsLoading ? (
            <tr>
              {<td>{eachProductData.id && eachProductData.id}</td>}
              {<td>{eachProductData.title && eachProductData.title}</td>}
              {<td>{`${eachProductData.sale} %`}</td>}
              {
                <td>
                  {eachProductData.new_price && eachProductData.new_price}
                </td>
              }
              {<td>{eachProductData.deadline && eachProductData.deadline}</td>}
              <td>
                <button
                  onClick={() => {
                    setFormShow(!formShow);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      {formShow && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>
              You Can <span>CHANGE</span> Data here
            </legend>
            <label htmlFor="sale">Sale:</label>
            <input
              type="number"
              name="sale"
              id="sale"
              placeholder="Percentage..."
              {...register("sale", { required: true })}
            />

            <label htmlFor="new_price">New Price:</label>
            <input
              type="number"
              name="new_price"
              id="new_price"
              placeholder="New Price"
              {...register("new_price", { required: true })}
            />

            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              {...register("deadline", { required: false })}
            />

            <input type="submit" />
          </fieldset>
        </form>
      )}
    </>
  );
}

export default AdminSaleTable;
