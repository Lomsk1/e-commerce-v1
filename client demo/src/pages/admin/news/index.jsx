import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNewsData } from "../../../API/news/action";
import AdminNavigation from "../../../components/admin_navigation";
import AdminTable from "../../../components/admin_table/main_table";
import {
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";
import AdminNewsForm from "../../../components/admin_forms/news";

function AdminNews() {
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
  const { newsData, isLoading } = useSelector((state) => state.news);

  //  ////////////////////  N E W S  ////////////////////
  useEffect(() => {
    dispatch(getAllNewsData());
  }, []);

  const deleteNewsHandler = (id) => {
    dispatch(
      deleteNews({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(getAllNewsData());
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  return (
    <>
      <AdminNavigation section_title={"News"}>
        {!isLoading ? (
          <AdminTable
            th_data={["ID", "Name", "Image", "Deadline", "Actions"]}
            api_data={newsData}
            not_child
            delete_api={(id) => {
              deleteNewsHandler(id);
            }}
            eachProductData={() => {}}
          />
        ) : (
          <div>Loading</div>
        )}

        {/* News Form */}
        <AdminNewsForm />
      </AdminNavigation>
    </>
  );
}

export default AdminNews;
