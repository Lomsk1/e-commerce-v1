import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-scroll";
import { useState } from "react";
import PopupMiddle from "../../popup/middle";
import { ProductType } from "../../../types/product";
// import useAdminProductStore from "../../../store/admin/product";

interface PropTypes {
  data: ProductType["data"]["specifications"];
  statusData: string;
}

const AdminProductSpecTable: React.FC<PropTypes> = ({ data, statusData }) => {
  /* Query Client */
  //   const queryClient = useQueryClient();

  /* States */
  const [errorMsg, setErrorMsg] = useState<{
    message: string;
    status: string;
  } | null>(null);

  /* Stores */
  //   const {
  //     // setAddTimeBranchId,
  //     setProductId,
  //     setForMoreProductId,
  //     setMoreProductAddFormId,
  //     // setEditTimeBranchId,
  //     // editTimeBranchId,
  //     setSpecificationsProductId,
  //   } = useAdminProductStore((state) => state);

  return (
    <>
      {statusData === "success" && (
        <>
          <div className="main_table_cont" id="productSpecTable">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Basic</th>
                  <th>.</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((spec) => (
                  <tr key={spec._id}>
                    <td>{spec.category}</td>
                    <td className="child_actions">
                      {spec.specificationBasics.map((basic) => (
                        <fieldset key={basic._id}>
                          <p>Name - {basic.name}</p>
                          <p>Middle - {basic.middle}</p>
                          <p>{basic.top ? "Yes" : "No"}</p>
                          <div>
                            <button
                              className="edit"
                              //   onClick={() =>
                              //     deleteBrandCategoryFunc({
                              //       categoryId: h._id,
                              //       brandId: data.id,
                              //     })
                              //   }
                            >
                              Edit
                            </button>
                            <button
                              className="delete"
                              //   onClick={() =>
                              //     deleteBrandCategoryFunc({
                              //       categoryId: h._id,
                              //       brandId: data.id,
                              //     })
                              //   }
                            >
                              Del
                            </button>
                          </div>
                        </fieldset>
                      ))}
                    </td>
                    <td>.</td>
                    <td className="actions">
                      <Link
                        activeClass="active"
                        to="productMoreMainForm"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        delay={300}
                        //   onClick={() => setMoreProductAddFormId(data.data.id)}
                        className="edit"
                      >
                        Add Spec
                      </Link>
                      <Link
                        activeClass="active"
                        to="productMoreMainForm"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        delay={300}
                        //   onClick={() => setMoreProductAddFormId(data.data.id)}
                        className="edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button
                        className="del"
                        //   onClick={() => setSpecificationsProductId(data.data.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
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

export default AdminProductSpecTable;
