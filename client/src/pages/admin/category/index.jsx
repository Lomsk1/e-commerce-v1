import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategoryData,
  getCategoryByID,
} from "../../../API/category/action";
import AdminCategoryForm from "../../../components/admin_forms/category";
import AdminNavigation from "../../../components/admin_navigation";
import AdminTable from "../../../components/admin_table/main_table";
import {
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";

function AdminCategory() {
  //  ////////////////////  Other Infos  ////////////////////
  const statusMessage = (info, condition) => {
    dispatch(setStatusValue(info));
    dispatch(statusRequestToggle(true));
    dispatch(setStatusCondition(condition));

    const timer = setTimeout(() => {
      dispatch(statusRequestToggle(false));
    }, 3000);
    return () => clearTimeout(timer);
  };

  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const { categoryData, isLoading } = useSelector((state) => state.category);

  //  ////////////////////  C A T E G O R Y  ////////////////////

  useEffect(() => {
    dispatch(getAllCategoryData());
  }, []);

  const deleteCategoryHandler = (id) => {
    dispatch(
      deleteCategory({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllCategoryData());
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  return (
    <>
      <AdminNavigation section_title={"Category"}>
        {!isLoading ? (
          <AdminTable
            th_data={["ID", "Title", "Image", "Actions"]}
            api_data={categoryData}
            not_child
            delete_api={(id) => {
              deleteCategoryHandler(id);
            }}
            eachProductData={(id) => {
              dispatch(
                getCategoryByID({
                  id: id,
                })
              );
            }}
          />
        ) : (
          <div>Loading</div>
        )}

        {/* Category Form */}
        <AdminCategoryForm />
      </AdminNavigation>
    </>
  );
}

export default AdminCategory;
