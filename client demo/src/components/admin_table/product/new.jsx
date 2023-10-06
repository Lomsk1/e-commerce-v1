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

function AdminNewTable() {
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
            <th>New ?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!eachProductIsLoading ? (
            <tr>
              {eachProductData.id && <td>{eachProductData.id}</td>}
              {eachProductData.title && <td>{eachProductData.title}</td>}
              {<td>{`${eachProductData.new}`}</td>}
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
            <label htmlFor="new">New ?</label>
            <select
              name="new"
              id="new"
              {...register("new", { required: true })}
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

export default AdminNewTable;
