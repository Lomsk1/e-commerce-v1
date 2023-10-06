import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faClose, faListUl, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductChildTablesClose,
  setProductFormsClose,
  setSpecBasicTable,
} from "../../../redux/admin/forProduct/slice";
import {
  childFormsClose,
  childTableToggle,
  setChildTableID,
  setFatherTableID,
  setThirdNestedTableID,
} from "../../../redux/admin/tables/slice";

function AdminChildrenTable({
  table_title,
  th_data,
  api_data,
  child_form_add,
  child_form_change,
  child_form_delete,
  form_name,
  more_detail,
  moreChildTable,
  thirdChildTable,
  with_branch_data,
  with_stock
}) {
  // Redux
  const dispatch = useDispatch();
  const { mainTableID, thirdNestedTableID } = useSelector(
    (state) => state.adminTable
  );

  return (
    <>
      <div className="other_table_title">
        <h2>
          {table_title && table_title}{" "}
          <span>
            {" "}
            {thirdChildTable
              ? thirdNestedTableID && `ID: ${thirdNestedTableID}`
              : mainTableID && `ID: ${mainTableID}`}
          </span>
        </h2>
        <button
          onClick={() => {
            child_form_add();
          }}
        >
          {form_name}
        </button>
        <button
          onClick={() => {
            if (thirdChildTable) {
              dispatch(setSpecBasicTable(false));
            } else {
              dispatch(setProductChildTablesClose());
            }
            dispatch(childTableToggle(false));
            dispatch(childFormsClose());
            dispatch(setProductFormsClose());
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
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
          {api_data &&
            api_data.map((data) => (
              <tr key={data.id}>
                <td>{data.id && data.id}</td>
                {data.lat && <td>{data.lat && data.lat}</td>}
                {data.long && <td>{data.long && data.long}</td>}
                {data.week_day && <td>{data.week_day && data.week_day}</td>}
                {data.hour && <td>{data.hour && data.hour}</td>}
                {data.middle && <td>{data.middle && data.middle}</td>}
                {data.name && <td>{data.name && data.name}</td>}
                {with_stock && <td>{`${data.in_stock}`}</td>}
                {data.branch && with_branch_data && (
                  <td>{data.branch && data.branch}</td>
                )}
                {data.category && <td>{data.category && data.category}</td>}
                {data.image && (
                  <td>
                    <img src={import.meta.env.VITE_APP_BASE_URL + data.image} />
                  </td>
                )}
                <td>
                  <button
                    onClick={() => {
                      child_form_change();
                      dispatch(setChildTableID(data.id));
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(setChildTableID(data.id));
                      child_form_delete(data.id);
                      dispatch(childFormsClose());
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  {more_detail && (
                    <button
                      onClick={() => {
                        dispatch(childFormsClose());
                        moreChildTable(data.id);
                        dispatch(setThirdNestedTableID(data.id));
                        dispatch(setFatherTableID(data.id));
                      }}
                    >
                      <FontAwesomeIcon icon={faListUl} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminChildrenTable;
