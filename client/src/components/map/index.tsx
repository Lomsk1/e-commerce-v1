import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BranchesType } from "../../types/branch";

interface PropTypes {
  branchData: BranchesType;
}

const MapLeafletContainer: React.FC<PropTypes> = ({ branchData }) => {
  return (
    <>
      {branchData && branchData.result > 0 && (
        <MapContainer
          center={[
            Number(branchData.data[0]?.branchCoord?.lat),
            Number(branchData.data[0]?.branchCoord?.long),
          ]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {branchData.data.map((address) => (
            <Marker
              position={[
                Number(address?.branchCoord?.lat),
                Number(address?.branchCoord?.long),
              ]}
              key={address.id}
            >
              <Popup>{address.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
};

export default MapLeafletContainer;
