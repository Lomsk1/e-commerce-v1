import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-scroll";
import { useState } from "react";
import PopupMiddle from "../../popup/middle";
import { ProductType, } from "../../../types/product";
import useAdminProductStore from "../../../store/admin/product";

interface PropTypes {
  data: ProductType;
}

const AdminProductMoreInfoTable: React.FC<PropTypes> = ({ data }) => {
  /* Query Client */

  /* States */
  const [errorMsg, setErrorMsg] = useState<{
    message: string;
    status: string;
  } | null>(null);

  /* Stores */
  const {
    // setAddTimeBranchId,
    setMoreProductAddFormId,
    // setEditTimeBranchId,
    // editTimeBranchId,
    setSpecificationsProductId,
  } = useAdminProductStore((state) => state);

  /* Mutations */
  /* Query Mutation */
  //   const deleteBranchTimeMutation = useMutation({
  //     mutationFn: deleteBranchTime,
  //     onSuccess: (data) => {
  //       console.log(data);
  //       if (data.status === "success") {
  //         queryClient.invalidateQueries({ queryKey: ["branch"] });
  //       }
  //       if (data.status === "error") {
  //         setErrorMsg({ message: data.message, status: data.status });
  //       }
  //     },
  //   });

  /* Branch Working Time */
  //   const deleteBranchWorkingTime = ({
  //     timeId,
  //     branchId,
  //   }: {
  //     timeId: string;
  //     branchId: string;
  //   }): void => {
  //     deleteBranchTimeMutation.mutate({
  //       timeId: timeId,
  //       id: branchId,
  //     });
  //   };

  /* Branch Delete */
  //   const deleteBranchMutation = useMutation({
  //     mutationFn: deleteBranch,
  //     onSuccess: (data) => {
  //       if (data.status === "success") {
  //         queryClient.invalidateQueries({ queryKey: ["branch"] });
  //       } else {
  //         setErrorMsg(data);
  //       }
  //     },
  //   });

  //   const branchDelate = (id: string): void => {
  //     deleteBranchMutation.mutate({ id: id });
  //   };

  return (
    <>
      {data.status === "success" && (
        <>
          <div className="main_table_cont" id="productMoreTable">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Sale</th>
                  <th>New Price</th>
                  <th>Top</th>
                  <th>Popularity</th>
                  <th>Product Model</th>
                  <th>in Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.data.title}</td>
                  <td>{data.data.sale ? data.data.sale : 0}</td>
                  <td>{data.data.newPrice ? data.data.newPrice : 0}</td>
                  <td>{data.data.top ? "Yes" : "No"}</td>
                  <td>{data.data.popularity ? "Yes" : "No"}</td>
                  <td>{data.data.productModel}</td>
                  <td>{data.data.totalInStock ? "Yes" : "No"}</td>
                  <td className="actions">
                    <Link
                      activeClass="active"
                      to="productMoreMainForm"
                      spy={true}
                      smooth={true}
                      offset={-20}
                      duration={500}
                      delay={300}
                      onClick={() => setMoreProductAddFormId(data.data.id)}
                      className="edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      className="del"
                      onClick={() => setSpecificationsProductId(data.data.id)}
                    >
                      Spec
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* {editTimeBranchId && <BranchEditWorkingTime />} */}
          {/* Errors */}
          {errorMsg && (
            <PopupMiddle
              text={errorMsg.message}
              closeFn={() => setErrorMsg(null)}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminProductMoreInfoTable;
