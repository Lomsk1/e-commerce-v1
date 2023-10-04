import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDataByID,
  updateProduct,
} from "../../../API/product/actions";

function AdminTopTable() {
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
    dispatch(updateProduct({ id: eachProductData.id, product: data }));
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
            <th>Top ?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!eachProductIsLoading ? (
            <tr>
              {<td>{eachProductData.id && eachProductData.id}</td>}
              {<td>{eachProductData.title && eachProductData.title}</td>}
              {<td>{`${eachProductData.top}`}</td>}

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

            <label htmlFor="top">Top ?</label>
            <select
              name="top"
              id="top"
              {...register("top", { required: true })}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>

            <input type="submit" />
          </fieldset>
        </form>
      )}
    </>
  );
}

export default AdminTopTable;
