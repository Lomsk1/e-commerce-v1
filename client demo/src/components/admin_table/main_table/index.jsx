import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductChildTablesClose,
  setProductFormsClose,
  setProductLimit,
} from "../../../redux/admin/forProduct/slice";
import {
  childFormsClose,
  childTableToggle,
  mainFormToggle,
  setMainTableID,
} from "../../../redux/admin/tables/slice";

function AdminTable({
  th_data,
  api_data,
  get_children_data,
  delete_api,
  not_child,
  no_deadline,
  eachProductData,
  product_limitation,
  stock
}) {
  // Redux
  const dispatch = useDispatch();

  //   Toggle Forms
  const editHandler = (id) => {
    dispatch(mainFormToggle(true));
    dispatch(setMainTableID(id));
    dispatch(childFormsClose());
    dispatch(childTableToggle(false));
    eachProductData(id);
  };

  //   Other Details Table
  const otherTableInfoHandler = (id) => {
    dispatch(childTableToggle(true));
    dispatch(setMainTableID(id));
    dispatch(setProductFormsClose());
    dispatch(setProductChildTablesClose());
  };

  const { productLimit } = useSelector((state) => state.productTable);

  return (
    <>
      <div className="main_table_cont">
        <table>
          <thead>
            <tr>
              {th_data &&
                th_data
                  .map((data) => data)
                  .map((data, index) => <th key={index}>{data}</th>)}
            </tr>
          </thead>
          <tbody>
            {api_data ? (
              api_data.map((data) => (
                <tr key={data.id}>
                  <td>{data.id && data.id}</td>
                  {data.name && <td>{data.name}</td>}
                  {data.title && <td>{data.title}</td>}
                  {data.separate && <td>{data.separate}</td>}
                  {data.product_model && <td>{data.product_model}</td>}
                  {data.text && <td>{data.text}</td>}
                  {data.city && <td>{data.city && data.city}</td>}
                  {data.address && <td>{data.address && data.address}</td>}
                  {data.phone && <td>{data.phone && data.phone}</td>}
                  {data.description && (
                    <td>{data.description && data.description}</td>
                  )}
                  {data.price && <td>{data.price}$</td>}
                  {data.thumbnail && (
                    <td>
                      {data.thumbnail && (
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL + data.thumbnail
                          }
                        />
                      )}
                    </td>
                  )}
                  {data.color && (
                    <td>
                      <div
                        className="color"
                        style={{ backgroundColor: `${data.color}` }}
                        title={`${data.color}`}
                      ></div>
                    </td>
                  )}
                  {data.image && (
                    <td>
                      {data.image && (
                        <img
                          src={import.meta.env.VITE_APP_BASE_URL + data.image}
                        />
                      )}
                    </td>
                  )}
                  {data.deadline && !no_deadline && (
                    <td>{data.deadline && data.deadline}</td>
                  )}

                  {stock && <td>{`${data.total_in_stock}`}</td>}

                  <td>
                    <button
                      onClick={() => {
                        editHandler(data.id);
                      }}
                    >
                      {<FontAwesomeIcon icon={faEdit} />}
                    </button>
                    <button
                      onClick={(e) => {
                        delete_api(data.id);
                        dispatch(childFormsClose());
                        dispatch(childTableToggle(false));
                      }}
                    >
                      {<FontAwesomeIcon icon={faTrash} />}
                    </button>

                    {!not_child && (
                      <button
                        onClick={() => {
                          otherTableInfoHandler(data.id);
                          get_children_data(data.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        </table>
        {product_limitation && (
          <button
            className="more_data"
            style={{ display: api_data?.length < productLimit && "none" }}
            onClick={() => {
              dispatch(setProductLimit(productLimit + 10));
            }}
          >
            More Data
          </button>
        )}
      </div>
    </>
  );
}

export default AdminTable;
