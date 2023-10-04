import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBranch,
  deleteBranchCoords,
  deleteBranchWorkingHours,
  getAllBranchData,
  getBranchCoordsByBranch,
  getBranchDataByID,
  getBranchWorkingHoursByBranch,
} from "../../../API/branch/action";
import AdminBranchForm from "../../../components/admin_forms/branch";
import AdminCoordForm from "../../../components/admin_forms/branch/coord";
import AdminWorkingHourForm from "../../../components/admin_forms/branch/working";
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

function AdminBranch() {
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

  const {
    branchWorkingData,
    branchData,
    isLoading,
    branchCoordData,
    branchCoordIsLoading,
  } = useSelector((state) => state.branch);

  const {
    mainTableID,
    otherTableToggle,
    childFormName,
    childFormAdd,
    childFormChange,
  } = useSelector((state) => state.adminTable);

  //  ////////////////////  B R A N C H  ////////////////////

  useEffect(() => {
    dispatch(getAllBranchData());
  }, []);

  const deleteBranchHandler = (id) => {
    dispatch(
      deleteBranch({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllBranchData());
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  //  ////////////////////    C H I L D R E N  D A T A     ////////////////////
  const getChildrenData = (id) => {
    dispatch(
      getBranchCoordsByBranch({
        id: id,
      })
    );
    dispatch(
      getBranchWorkingHoursByBranch({
        id: id,
      })
    );
  };

  //////////////////////// C O O R D S //////////////////////////////

  const coordDeleteHandler = (id) => {
    dispatch(
      deleteBranchCoords({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        statusMessage(originalPromiseResult, "success");
        dispatch(
          getBranchCoordsByBranch({
            id: mainTableID,
          })
        );
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  //////////////////////// W O R K I N G    H O U R S  //////////////////////////////
  const deleteWorkingHourHandler = (id) => {
    dispatch(
      deleteBranchWorkingHours({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getBranchWorkingHoursByBranch({
            id: mainTableID,
          })
        );
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };
  return (
    <>
      <AdminNavigation section_title={"Branch"}>
        {!isLoading ? (
          <AdminTable
            th_data={["ID", "Name", "City", "Address", "Phone", "Actions"]}
            api_data={branchData}
            get_children_data={(id) => {
              getChildrenData(id);
            }}
            delete_api={(id) => {
              deleteBranchHandler(id);
            }}
            eachProductData={(id) => {
              dispatch(
                getBranchDataByID({
                  id: id,
                })
              );
            }}
          />
        ) : (
          <div>Loading</div>
        )}

        {/* Coord Table */}

        {otherTableToggle &&
          (!branchCoordIsLoading ? (
            <AdminChildrenTable
              table_title={"Coord Table"}
              th_data={["ID", "Latitude", "Longitude", "Actions"]}
              api_data={branchCoordData}
              form_name={"Add Coord"}
              child_form_add={() => {
                dispatch(childFormPost("coord"));
                dispatch(mainFormToggle(false));
              }}
              child_form_change={() => {
                dispatch(childFormPut("coord"));
                dispatch(mainFormToggle(false));
              }}
              child_form_delete={(id) => {
                coordDeleteHandler(id);
              }}
            />
          ) : (
            <div></div>
          ))}

        {/* Coord Forms */}

        {childFormAdd && childFormName === "coord" && <AdminCoordForm />}
        {childFormChange && childFormName === "coord" && <AdminCoordForm />}

        {/* Working Hour Table */}

        {otherTableToggle &&
          (!branchCoordIsLoading ? (
            <AdminChildrenTable
              table_title={"Working Hour Table"}
              th_data={["ID", "Week Day", "Hour", "Actions"]}
              api_data={branchWorkingData}
              form_name={"Add Hours"}
              child_form_add={() => {
                dispatch(childFormPost("working_hour"));
                dispatch(mainFormToggle(false));
              }}
              child_form_change={() => {
                dispatch(childFormPut("working_hour"));
                dispatch(mainFormToggle(false));
              }}
              child_form_delete={(id) => {
                deleteWorkingHourHandler(id);
              }}
            />
          ) : (
            <div></div>
          ))}

        {/* Working Hour Forms */}

        {childFormAdd && childFormName === "working_hour" && (
          <AdminWorkingHourForm />
        )}
        {childFormChange && childFormName === "working_hour" && (
          <AdminWorkingHourForm />
        )}

        {/* Branch Forms */}
        <AdminBranchForm />
      </AdminNavigation>
    </>
  );
}

export default AdminBranch;
