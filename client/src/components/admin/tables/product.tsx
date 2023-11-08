import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { useState } from "react";
import PopupMiddle from "../../popup/middle";
import { ProductsType } from "../../../types/product";
import useAdminProductStore from "../../../store/admin/product";

interface PropTypes {
  data: ProductsType;
}

const AdminProductTable: React.FC<PropTypes> = ({ data }) => {
  /* Query Client */

  /* States */
  const [errorMsg, setErrorMsg] = useState<{
    message: string;
    status: string;
  } | null>(null);

  /* Stores */
  const {
    // setAddTimeBranchId,
    setProductId,
    setForMoreProductId,
    clearForMoreProductId,
    // setEditTimeBranchId,
    // editTimeBranchId,
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
          <div className="main_table_cont">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Desc</th>
                  <th>Sep</th>
                  <th>Thumb</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((data) => (
                  <tr key={data.id}>
                    <td>{data.title && data.title}</td>
                    <td>{data.description}</td>
                    <td>{data.separate}</td>
                    <td>
                      <img src={data.thumbnail.url} alt="url" />
                    </td>
                    <td>{data.color}</td>
                    <td>{data.price}</td>
                    <td>{data.brand.name}</td>
                    <td>{data.category.name}</td>
                    <td className="actions">
                      <Link
                        activeClass="active"
                        to="productMoreTable"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        delay={300}
                        onClick={async () => {
                          clearForMoreProductId();
                          setForMoreProductId(data.id);
                        }}
                        className="edit"
                        style={{ backgroundColor: "ActiveCaption" }}
                      >
                        More
                      </Link>
                      <Link
                        activeClass="active"
                        to="productMainForm"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        delay={300}
                        onClick={() => {
                          setProductId(data.id);
                          clearForMoreProductId();
                        }}
                        className="edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button
                        className="del"
                        // onClick={() => branchDelate(data.id)}
                      >
                        {<FontAwesomeIcon icon={faTrash} />}
                      </button>
                    </td>
                  </tr>
                ))}
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

export default AdminProductTable;
