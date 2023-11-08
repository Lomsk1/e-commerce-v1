import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-scroll";
import { useState } from "react";
import PopupMiddle from "../../popup/middle";
import { brandsTypes } from "../../../types/brand";
import { deleteBrand } from "../../../api/brand/delete";
import useAdminBrandStore from "../../../store/admin/brand";
import { deleteBrandCategory } from "../../../api/brand/category/delete";

interface PropTypes {
  data: brandsTypes;
}

const AdminBrandTable: React.FC<PropTypes> = ({ data }) => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* States */
  const [errorMsg, setErrorMsg] = useState<{
    message: string;
    status: string;
  } | null>(null);

  /* Stores */
  const { setAddCategoryBrandId, setBrandId } = useAdminBrandStore(
    (state) => state
  );

  /* Mutations */
  /* Query Mutation */
  const deleteBrandCategoryMutation = useMutation({
    mutationFn: deleteBrandCategory,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      }
      if (data.status === "error") {
        setErrorMsg({ message: data.message, status: data.status });
      }
    },
  });

  /* Brand Category */
  const deleteBrandCategoryFunc = ({
    categoryId,
    brandId,
  }: {
    categoryId: string;
    brandId: string;
  }): void => {
    deleteBrandCategoryMutation.mutate({
      categoryId: categoryId,
      id: brandId,
    });
  };

  /* Brand delete */
  const deleteBrandMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      } else {
        setErrorMsg(data);
      }
    },
  });

  const brandDelete = (id: string): void => {
    deleteBrandMutation.mutate({ id: id });
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
                  <th>Description</th>
                  <th>Category</th>
                  <th>Thumbnail</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td className="child_actions">
                      {data.brandCategory.map((h) => (
                        <fieldset key={h._id}>
                          <p>{h.name}</p>
                          <div>
                            <button
                              className="delete"
                              onClick={() =>
                                deleteBrandCategoryFunc({
                                  categoryId: h._id,
                                  brandId: data.id,
                                })
                              }
                            >
                              Del
                            </button>
                          </div>
                        </fieldset>
                      ))}
                    </td>
                    <td>
                      <img src={data.thumbnail?.url} alt="th" />
                    </td>
                    <td>
                      <img src={data.image?.url} alt="th" />
                    </td>

                    <td className="actions">
                      <button
                        className="other"
                        onClick={() => setAddCategoryBrandId(data.id)}
                      >
                        Add Categories
                      </button>
                      <Link
                        activeClass="active"
                        to="branchMainForm"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        delay={300}
                        onClick={() => setBrandId(data.id)}
                        className="edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button
                        className="del"
                        onClick={() => brandDelete(data.id)}
                      >
                        {<FontAwesomeIcon icon={faTrash} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

export default AdminBrandTable;
