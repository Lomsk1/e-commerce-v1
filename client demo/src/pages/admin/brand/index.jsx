import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  deleteBrandCategory,
  getAllBrandData,
  getBrandByID,
  getBrandCategoryByBrand,
} from "../../../API/brand/action";
import AdminBrandForm from "../../../components/admin_forms/brand";
import AdminBrandCategoryForm from "../../../components/admin_forms/brand/category";
import AdminNavigation from "../../../components/admin_navigation";
import AdminChildrenTable from "../../../components/admin_table/children_table";
import AdminTable from "../../../components/admin_table/main_table";
import {
  childFormPost,
  childFormPut,
  mainFormToggle,
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";

function AdminBrand() {
  ///////////////////////// O T H E R    I N F O S  /////////////////////////
  const statusMessage = (info, condition) => {
    dispatch(setStatusValue(info));
    dispatch(statusRequestToggle(true));
    dispatch(setStatusCondition(condition));

    const timer = setTimeout(() => {
      dispatch(statusRequestToggle(false));
    }, 3000);
    return () => clearTimeout(timer);
  };

  ///////////////////////// R E D U X /////////////////////////
  const dispatch = useDispatch();

  ///////////////////////// R E D U X   S E L E C T O R S  /////////////////////////

  const {
    brandData,
    brandDataIsLoading,
    brandCategoryData,
    brandCategoryDataIsLoading,
  } = useSelector((state) => state.brand);

  const {
    mainTableID,
    otherTableToggle,
    childFormName,
    childFormAdd,
    childFormChange,
  } = useSelector((state) => state.adminTable);
  ///////////////////////// A L L   B R A N D  /////////////////////////

  useEffect(() => {
    dispatch(getAllBrandData());
  }, []);

  const deleteBrandHandler = (id) => {
    dispatch(
      deleteBrand({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllBrandData());
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  ////////////////////    C A T E G O R Y      ////////////////////
  const getChildrenData = (id) => {
    dispatch(
      getBrandCategoryByBrand({
        id: id,
      })
    );
  };

  const categoryDeleteHandler = (id) => {
    dispatch(
      deleteBrandCategory({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        getChildrenData(mainTableID);
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  return (
    <>
      <AdminNavigation section_title={"Brand"}>
        {!brandDataIsLoading ? (
          <AdminTable
            th_data={[
              "ID",
              "Name",
              "Description",
              "Thumbnail",
              "Image",
              "Actions",
            ]}
            api_data={brandData}
            get_children_data={(id) => {
              getChildrenData(id);
            }}
            delete_api={(id) => {
              deleteBrandHandler(id);
            }}
            eachProductData={(id) => {
              dispatch(
                getBrandByID({
                  id: id,
                })
              );
            }}
          />
        ) : (
          <div>Loading...</div>
        )}

        {/* Category Table */}

        {otherTableToggle &&
          (!brandCategoryDataIsLoading ? (
            <AdminChildrenTable
              table_title={"Category Table"}
              th_data={["ID", "Name", "Actions"]}
              api_data={brandCategoryData}
              form_name={"Add Category"}
              child_form_add={() => {
                dispatch(childFormPost("category"));
                dispatch(mainFormToggle(false));
              }}
              child_form_change={() => {
                dispatch(childFormPut("category"));
                dispatch(mainFormToggle(false));
              }}
              child_form_delete={(id) => {
                categoryDeleteHandler(id);
              }}
            />
          ) : (
            <div></div>
          ))}

        {/* Category Forms */}

        {childFormAdd && childFormName === "category" && (
          <AdminBrandCategoryForm />
        )}

        {childFormChange && childFormName === "category" && (
          <AdminBrandCategoryForm />
        )}

        {/* Main Table Form */}

        <AdminBrandForm />
      </AdminNavigation>
    </>
  );
}

export default AdminBrand;
