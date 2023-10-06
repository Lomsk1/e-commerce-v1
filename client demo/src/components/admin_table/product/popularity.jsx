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

function AdminPopularityTable() {
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
            <th>Popularity ?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!eachProductIsLoading ? (
            <tr>
              {<td>{eachProductData.id && eachProductData.id}</td>}
              {<td>{eachProductData.title && eachProductData.title}</td>}
              {<td>{`${eachProductData.popularity}`}</td>}

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

            <label htmlFor="popularity">Popularity ?</label>
            <select
              name="popularity"
              id="popularity"
              {...register("popularity", { required: true })}
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

export default AdminPopularityTable;
