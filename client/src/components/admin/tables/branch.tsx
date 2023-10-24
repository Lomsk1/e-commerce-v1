import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BranchesType } from "../../../types/branch";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useAdminBranchStore from "../../../store/admin/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBranchTime } from "../../../api/branch/workingTime/delete";
import BranchEditWorkingTime from "../forms/branch/editTime";
import { Link } from "react-scroll";
import { deleteBranch } from "../../../api/branch/delete";

interface PropTypes {
  data: BranchesType;
}

const AdminBranchTable: React.FC<PropTypes> = ({ data }) => {
  /* Query Client */
  const queryClient = useQueryClient();

  /* Stores */
  const {
    setAddTimeBranchId,
    setBranchId,
    setEditTimeBranchId,
    editTimeBranchId,
  } = useAdminBranchStore((state) => state);

  /* Mutations */
  /* Query Mutation */
  const deleteBranchTimeMutation = useMutation({
    mutationFn: deleteBranchTime,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      }
    },
  });

  /* Branch Working Time */
  const deleteBranchWorkingTime = ({
    timeId,
    branchId,
  }: {
    timeId: string;
    branchId: string;
  }): void => {
    deleteBranchTimeMutation.mutate({ timeId: timeId, id: branchId });
  };

  /* Branch Delete */
  const deleteBranchMutation = useMutation({
    mutationFn: deleteBranch,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      }
    },
  });

  const branchDelate = (id: string): void => {
    deleteBranchMutation.mutate({ id: id });
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
                  <th>Address</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>wHours</th>
                  <th>Coords</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.address}</td>
                    <td>{data.phone}</td>
                    <td>{data.city}</td>
                    <td className="child_actions">
                      {data.branchWorkingHours.map((h) => (
                        <fieldset key={h._id}>
                          <p>
                            {h.weekDay}/{h.hour}
                          </p>
                          <div>
                            <button
                              className="edit"
                              onClick={() => {
                                setEditTimeBranchId(h._id);
                                setBranchId(data.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="delete"
                              onClick={() =>
                                deleteBranchWorkingTime({
                                  timeId: h._id,
                                  branchId: data.id,
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
                      <p>lat: {data.branchCoord.lat}</p>,
                      <p>long: {data.branchCoord.long}</p>
                    </td>

                    <td className="actions">
                      <button
                        className="other"
                        onClick={() => setAddTimeBranchId(data.id)}
                      >
                        Add Working Time
                      </button>
                      <Link
                        activeClass="active"
                        to="branchMainForm"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        delay={300}
                        onClick={() => setBranchId(data.id)}
                        className="edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button
                        className="del"
                        onClick={() => branchDelate(data.id)}
                      >
                        {<FontAwesomeIcon icon={faTrash} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editTimeBranchId && <BranchEditWorkingTime />}
        </>
      )}
    </>
  );
};

export default AdminBranchTable;
