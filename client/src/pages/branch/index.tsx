import { Fragment } from "react";
import MapLeafletContainer from "../../components/map";
import useBranchStore from "../../store/client/branch/branch";

const BranchPage: React.FC = () => {
  /* Stores */
  const { branch } = useBranchStore((state) => state);

  return (
    <>
      <section className="branch_section">
        <div className="header_title">
          <h1>Branches</h1>
        </div>

        {/* Map Container */}
        <div className="map_cont">
          {branch && <MapLeafletContainer branchData={branch} />}
        </div>

        {/* Branch Table */}
        <div className="branch_addresses">
          <table className="zigzag">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Address</th>
                <>
                  {/* {branch?.data.forEach((branch) =>
                    branch.branchWorkingHours.map((day) => (
                      <th key={day._id}>{day.weekDay && day.weekDay}</th>
                    ))
                  )} */}
                </>
                <th>Monday - Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              <>
                {branch?.data.map((branch) => (
                  <Fragment key={branch.id}>
                    <tr>
                      <td>{branch.name && branch.name}</td>
                      <td>{branch.city && branch.city}</td>
                      <td>{branch.address && branch.address}</td>
                      {branch.branchWorkingHours.map((hour) => (
                        <td key={hour._id}>{hour.hour && hour.hour}</td>
                      ))}
                    </tr>
                  </Fragment>
                ))}
              </>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default BranchPage;
