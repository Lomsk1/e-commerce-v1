// import {
//     faLocationDot,
//     faPaperPlane,
//     faPhone
//   } from "@fortawesome/free-solid-svg-icons";
//   import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//   import { useSelector } from "react-redux";
//   import Footer from "../../components/footer";
//   import HeadingInformation from "../../components/heading_info";
//   import Navigation from "../../components/navigation";
//   import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//   import emailjs from "@emailjs/browser";
//   import { useForm } from "react-hook-form";
//   import { useState } from "react";

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "./components/form";

const ContactUs: React.FC = () => {
  // const { branchData, isLoading, branchCoordData, branchCoordIsLoading } =
  //   useSelector((state) => state.branch);

  return (
    <>
      <section className="contact_us_section">
        {/* Map */}
        <div className="map_container">
          {/* {!branchCoordIsLoading ? (
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
                )} */}
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
