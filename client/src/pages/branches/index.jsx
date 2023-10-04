import HeadingInformation from "../../components/heading_info";
import Footer from "../../components/footer";
import Navigation from "../../components/navigation";
import { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

function Branches() {
  // API
  const { branchData, isLoading, branchCoordData, branchCoordIsLoading } =
    useSelector((state) => state.branch);

  return (
    <>
      <HeadingInformation />
      <Navigation />
      <section className="branch_section">
        <div className="header_title">
          <h1>Branches</h1>
        </div>

        {/* Map Container */}
        <div className="map_cont">
          {!branchCoordIsLoading ? (
            <MapContainer
              center={[
                branchCoordData[0].lat && branchCoordData[0].lat,
                branchCoordData[0].long && branchCoordData[0].long,
              ]}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {!branchCoordIsLoading ? (
                branchCoordData.map((address) => (
                  <Marker
                    position={[
                      address.lat && address.lat,
                      address.long && address.long,
                    ]}
                    key={address.id}
                  >
                    <Popup>Branches</Popup>
                  </Marker>
                ))
              ) : (
                <div>Loading</div>
              )}
            </MapContainer>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        {/* Branch Table */}
        <div className="branch_addresses">
          <table className="zigzag">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Address</th>
                {!isLoading ? (
                  branchData.forEach((branch) =>
                    branch.working_hours.map((day) => (
                      <th key={day.id}>{day.week_day && day.week_day}</th>
                    ))
                  )
                ) : (
                  <th>Loading</th>
                )}
                <th>Monday - Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr> */}
              {!isLoading ? (
                <>
                  {branchData.map((branch) => (
                    <Fragment key={branch.id}>
                      <tr>
                        <td>{branch.name}</td>
                        <td>{branch.city}</td>
                        <td>{branch.address}</td>
                        {!isLoading &&
                          branch.working_hours.map((hour) => (
                            <td key={hour.id}>{hour.hour}</td>
                          ))}
                      </tr>
                    </Fragment>
                  ))}
                </>
              ) : (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
              {/* </tr> */}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Branches;
