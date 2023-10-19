import { useState } from "react";
import { ProductType } from "../../../../types/product";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface PropTypes {
  data: ProductType["data"];
}

const ProductBranchInfo: React.FC<PropTypes> = ({ data }) => {
  /* States */
  const [branchChecked, setBranchChecked] = useState<string | null>(null);
  const [branchInfo, setBranchInfo] = useState<{
    id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    createdAt: Date;
    branchCoord: { lat: string; long: string };
    branchWorkingHours: { weekDay: string; hour: string; _id: string }[];
  } | null>(null);

  const [branchCenterCoord, setBranchCenterCoord] = useState<{
    lat: number;
    long: number;
  }>({
    lat: 41.693996421149336,
    long: 44.801544307893934,
  });

  return (
    <>
      <section className="products_specifications" id="branches">
        <div className="title">
          <h2>Branches</h2>
        </div>
        <div className="infos_cont">
          <div className="branch_names_for_each">
            {/* branch containers */}
            {data.branches.map((branch) => (
              <div
                className="branch_container"
                key={branch.branch.id}
                style={{
                  border:
                    branch.branch?.id === branchChecked
                      ? "1px solid black"
                      : "",
                }}
              >
                {/* Name */}
                <label htmlFor={branch.branch.name}>
                  {/* Address */}
                  {branch.branch.address}
                </label>
                {/* Stock */}
                {branch.inStock ? <p>In Stock</p> : <span>Out of Stock</span>}

                <input
                  type="radio"
                  name="branches"
                  id={branch.branch.name}
                  onChange={() => {
                    setBranchChecked(branch.branch.id);
                    setBranchInfo(branch.branch);
                    setBranchCenterCoord({
                      lat: Number(branch.branch.branchCoord.lat),
                      long: Number(branch.branch.branchCoord.long),
                    });
                  }}
                />
              </div>
            ))}
          </div>

          {/* Working Information */}
          <div className="working_infos">
            <div className="working_hours">
              <h2>Working Hours</h2>
            </div>

            <div className="weekdays">
              {branchInfo ? (
                <>
                  {branchInfo &&
                    branchInfo.branchWorkingHours.map((hour, index) => (
                      <div className="weekday_hour" key={index}>
                        <p>{hour.weekDay}:</p>
                        <p>{hour.hour}</p>
                      </div>
                    ))}
                  <div className="weekday_hour">
                    <p>Address:</p>
                    <p>{branchInfo.address}</p>
                  </div>

                  <div className="weekday_hour">
                    <p>Phone:</p>
                    <p>{branchInfo.phone}</p>
                  </div>
                </>
              ) : (
                <div className="please">Please First Choose a Branch</div>
              )}
            </div>

            {/* Map */}
            <div className="map_container">
              {branchCenterCoord ? (
                <MapContainer
                  center={[branchCenterCoord?.lat, branchCenterCoord?.long]}
                  zoom={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {data.branches.map((address) => (
                    <Marker
                      position={[
                        Number(address.branch.branchCoord.lat),
                        Number(address.branch.branchCoord.long),
                      ]}
                      key={address.branch.id}
                    >
                      <Popup>{address.branch.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductBranchInfo;
