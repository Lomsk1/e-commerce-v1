import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-scroll";
import { useState } from "react";
import PopupMiddle from "../../popup/middle";
import { CategoriesTypes } from "../../../types/categoryTypes";
import { deleteCategory } from "../../../api/category/delete";
import useAdminCategoryStore from "../../../store/admin/category";

interface PropTypes {
  data: CategoriesTypes;
}

const AdminCategoryTable: React.FC<PropTypes> = ({ data }) => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* States */
  const [errorMsg, setErrorMsg] = useState<{
    message: string;
    status: string;
  } | null>(null);

  /* Stores */
  const  setCategoryId  = useAdminCategoryStore((state) => state.setCategoryId);

  /* Mutations */
  /* Branch Delete */
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        setErrorMsg(data);
      }
    },
  });

  const categoryDelate = (id: string): void => {
    deleteCategoryMutation.mutate({ id: id });
  };

  return (
    <>
      {data.status === "success" && (
        <>
          <div className="main_table_cont">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>

                    <td className="actions">
                      <Link
                        activeClass="active"
                        to="categoryMainForm"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        delay={300}
                        onClick={() => setCategoryId(data.id)}
                        className="edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button
                        className="del"
                        onClick={() => categoryDelate(data.id)}
                      >
                        {<FontAwesomeIcon icon={faTrash} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*Errors  */}
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

export default AdminCategoryTable;
