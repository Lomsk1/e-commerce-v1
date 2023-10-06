import {
  faLocationDot,
  faPaperPlane,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Footer from "../../components/footer";
import HeadingInformation from "../../components/heading_info";
import Navigation from "../../components/navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { useState } from "react";

function ContactUs() {
  const { branchData, isLoading, branchCoordData, branchCoordIsLoading } =
    useSelector((state) => state.branch);

  const [statusOk, setStatusOk] = useState(null);
  const [statusBad, setStatusBad] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    emailjs
      .send("service_yfxs46b", "template_xqwapev", data, "aHefCKRxgW_roS3Li")
      .then(
        function (response) {
          setStatusOk("S U C C E S S !");
          reset();
        },
        function (error) {
          setStatusBad("FAILED. Please try again.");
        }
      );
  };

  return (
    <>
      <HeadingInformation />
      <Navigation />

      <section className="contact_us_section">
        {/* Map */}
        <div className="map_container">
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
                  {!branchCoordIsLoading &&
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full name"
                  {...register("name")}
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />
              </div>

              <div>
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  {...register("subject")}
                />
              </div>

              <div>
                <label htmlFor="text">Text:</label>
                <textarea name="text" id="text" {...register("text")} />
              </div>

              <button type="submit">Submit</button>
              {statusOk && (
                <p className="status" style={{ color: "white" }}>
                  {statusOk}
                </p>
              )}
              {statusBad && (
                <p className="status" style={{ color: "red" }}>
                  {statusBad}
                </p>
              )}
            </form>
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

      <Footer />
    </>
  );
}

export default ContactUs;
