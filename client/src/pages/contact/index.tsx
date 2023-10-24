import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "./components/form";
import useBranchStore from "../../store/client/branch/branch";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const ContactUs: React.FC = () => {
  const { branch } = useBranchStore();

  return (
    <>
      <section className="contact_us_section">
        {/* Map */}
        <div className="map_container">
          {branch ? (
            <MapContainer
              center={[
                Number(branch.data[0].branchCoord.lat),
                Number(branch.data[0].branchCoord.long),
              ]}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {branch.data.map((address) => (
                <Marker
                  position={[
                    Number(address.branchCoord.lat),
                    Number(address.branchCoord.long),
                  ]}
                  key={address.id}
                >
                  <Popup>{address.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        {/* Contact */}
        <div className="contact_information">
          <div className="form">
            <div className="title">
              <h2>Write Us</h2>
            </div>

            {/* Form */}
            <ContactForm />
          </div>

          <div className="info">
            <div className="title">
              <h4>Contact Information</h4>
              <p>We're open for any suggestion or just to have a chat</p>
            </div>

            <div className="address">
              <div>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>

              <p>
                Address: <span>Georgia, Tbilisi, Ingorokva's N1</span>
              </p>
            </div>

            <div className="address">
              <div>
                <FontAwesomeIcon icon={faPhone} />
              </div>

              <p>
                Phone: <span>+995 599 39 10 80</span>
              </p>
            </div>

            <div className="address">
              <div>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>

              <p>
                Email: <span>info@info.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
