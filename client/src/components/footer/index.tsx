import {
  faPhone,
  faMailBulk,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
//   import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const Footer: React.FC = () => {
  // const { branchData, isLoading, branchCoordData, branchCoordIsLoading } =
  //   useSelector((state) => state.branch);

  // const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    let isSub = true;

    if (isSub) {
      // dispatch(getAllBranchData());
      // dispatch(getBranchCoords());
    }

    return () => {
      isSub = false;
    };
  }, []);

  return (
    <>
      <section className="footer">
        <div className="up">
          <div className="about_us same">
            <div className="title">
              <h1>ABOUT US</h1>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut.
            </p>

            <p>
              <FontAwesomeIcon icon={faLocationDot} />
              1734 Stonecoal Road
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              Hot line: <span>*8008 / +995 (32) 2</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faMailBulk} />
              email@email.com
            </p>
          </div>

          <div className="information same">
            <div className="title">
              <h1>INFORMATION</h1>
            </div>

            <ul>
              <li>
                <Link to={"/about_us"}>About Us</Link>
              </li>
              <li>
                <Link to={"/contact_us"}>Contact Us</Link>
              </li>

              <li>
                <Link to={"/"}>Orders and Returns</Link>
              </li>
              <li>
                <Link to={"/"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/terms_and_privacy"}>Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="services same">
            <div className="title">
              <h1>SERVICES</h1>
            </div>
            <ul>
              <li>
                {/* {isAuthenticated ? (
                    <Link to={"/costumer/info"}>My Account</Link>
                  ) : (
                    <Link to={"/log_in"}>My Account</Link>
                  )} */}
              </li>
              <li>
                <Link to={"/cart_main_page"}>View Cart</Link>
              </li>
              <li>
                {/* {isAuthenticated ? (
                    <Link to={"/wishlist_main_page"}>Wishlist</Link>
                  ) : (
                    <Link to={"/log_in"}>Wishlist</Link>
                  )} */}
              </li>
              <li>
                <Link to={"/"}>Track My Order</Link>
              </li>
              <li>
                <Link to={"/"}>Help</Link>
              </li>
            </ul>
          </div>

          <div className="branches same">
            <div className="title">
              <h1>Branches</h1>
            </div>
            <div className="map_cont">
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
          </div>
        </div>

        <div className="down">
          <p>Copyright © 2023 By Giorgi Lomsianidze. All rights reserved.</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
