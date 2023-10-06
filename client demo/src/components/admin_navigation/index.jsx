import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../redux/admin/tables/slice";
import PopupStatus from "../popup/status";

function AdminNavigation({ children, section_title }) {
  const { statusValue, statusRequest, statusCondition } = useSelector(
    (state) => state.adminTable
  );

  return (
    <>
      <section className="admin_panel_section">
        {/* List */}
        <div className="list_container">
          <ul>
            <li>
              <Link to={"/admin_home_page"}>Profile</Link>
            </li>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/admin_branch"}>Branch</Link>
            </li>
            <li>
              <Link to={"/admin_brand"}>Brand</Link>
            </li>
            <li>
              <Link to={"/admin_category"}>Category</Link>
            </li>
            <li>
              <Link to={"/admin_news"}>News</Link>
            </li>
            <li>
              <Link to={"/admin_product"}>Product</Link>
            </li>
            <li>
              <Link to={"/admin_weekly_sale"}>Weekly Sales</Link>
            </li>
          </ul>
        </div>

        {statusRequest && (
          <PopupStatus condition={statusCondition} text={statusValue} />
        )}

        {/* Table */}
        <div className="table_container">
          <div className="title_section">
            <h1>{section_title}</h1>
          </div>
          {children}
        </div>
      </section>
    </>
  );
}

export default AdminNavigation;
