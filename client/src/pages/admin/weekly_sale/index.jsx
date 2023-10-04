import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWeeklySale,
  getAllWeeklySaleData,
  getWeeklySaleByID,
} from "../../../API/weekly_sale/action";
import AdminWeeklyForm from "../../../components/admin_forms/weekly";
import AdminNavigation from "../../../components/admin_navigation";
import AdminTable from "../../../components/admin_table/main_table";
import {
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";

function AdminWeeklySale() {
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

  const { weeklySaleData, isLoading } = useSelector(
    (state) => state.weekly_sale
  );

  //  ////////////////////  W E E K L Y   S A L E S  ////////////////////

  useEffect(() => {
    dispatch(getAllWeeklySaleData());
  }, []);

  const deleteWeeklyHandler = (id) => {
    dispatch(
      deleteWeeklySale({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllWeeklySaleData());
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  return (
    <>
      <AdminNavigation section_title={"Weekly Sales"}>
        {!isLoading ? (
          <AdminTable
            th_data={["ID", "Title", "Text", "Image", "Deadline", "Actions"]}
            api_data={weeklySaleData}
            not_child
            delete_api={(id) => {
              deleteWeeklyHandler(id);
            }}
            eachProductData={(id) => {
              dispatch(
                getWeeklySaleByID({
                  id: id,
                })
              );
            }}
          />
        ) : (
          <div>Loading</div>
        )}

        {/* Weekly Form */}
        <AdminWeeklyForm />
      </AdminNavigation>
    </>
  );
}

export default AdminWeeklySale;
