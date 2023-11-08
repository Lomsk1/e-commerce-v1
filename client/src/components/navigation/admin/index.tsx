import { NavLink, Outlet } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <>
      <section className="admin_panel_section">
        {/* List */}
        <div className="list_container">
          <ul>
            <li>
              <NavLink to={"/admin"}>Profile</NavLink>
            </li>

            <li>
              <NavLink to={"/admin/branch"}>Branch</NavLink>
            </li>
            <li>
              <NavLink to={"/admin/brand"}>Brand</NavLink>
            </li>
            <li>
              <NavLink to={"/admin/category"}>Category</NavLink>
            </li>
            <li>
              <NavLink to={`/admin/product?page=${1}&limit=${2}`}>
                Product
              </NavLink>
            </li>
            <li>{/* <NavLink to={"/admin_news"}>News</NavLink> */}</li>
            <li>
              {/* <NavLink to={"/admin_weekly_sale"}>Weekly Sales</NavLink> */}
            </li>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
          </ul>
        </div>
        {/* 
        {statusRequest && (
          <PopupStatus condition={statusCondition} text={statusValue} />
        )} */}

        {/* Table */}
        <div className="table_container">
          <div className="title_section">
            <h1>{"section_title"}</h1>
          </div>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AdminNavigation;
