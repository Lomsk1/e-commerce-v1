import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation";
import HeadingInformation from "../../components/heading_info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeartBroken,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EachProductBasic from "../../components/each_basic";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDataByID,
  getProductStockByProduct,
} from "../../API/product/actions";
import { getBrandByID, getBrandCategoryData } from "../../API/brand/action";
import { useTimeout } from "usehooks-ts";
import { useContext } from "react";
import LocalContext from "../../hoc/localstore";
import { Link as LinkS } from "react-scroll";
import {
  createWishlist,
  deleteWishlist,
  getWishlistByID,
  getWishlistByUser,
} from "../../API/wishlist/action";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function EachProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [separateProduct, setSeparateProduct] = useState([]);

  //////////////////// S E L E C T  O R ////////////////////////

  const {
    eachProductData,
    eachProductIsLoading,
    productStockData,
    productStockIsLoading,
  } = useSelector((state) => state.product);

  const { branchData, isLoading: branchIsLoading } = useSelector(
    (state) => state.branch
  );

  const {
    eachBrandData,
    eachBrandIsLoading,
    brandCategoryData,
    brandCategoryDataIsLoading,
  } = useSelector((state) => state.brand);

  useEffect(() => {
    let isSub = true;
    if (isSub) {
      dispatch(
        getProductDataByID({
          id: params.id,
        })
      );
      dispatch(getBrandCategoryData());
      dispatch(
        getProductStockByProduct({
          id: params.id,
        })
      );
    }
    return () => {
      isSub = false;
    };
  }, [params]);

  const brandLogo = () => {
    setColorInfo(eachProductData.id);
    let brandId = null;

    if (!brandCategoryDataIsLoading && brandCategoryData.length > 0) {
      brandId = brandCategoryData.filter(
        (data) => data.id === eachProductData.brand
      )[0].brands;
    }
    if (brandId) {
      dispatch(
        getBrandByID({
          id: brandId,
        })
      );
    }
  };

  const sameProducts = () => {
    setSeparateProduct(
      brandCategoryData
        .filter((data) => data.id === eachProductData.brand)[0]
        .product.filter(
          (data) =>
            data.separate.toUpperCase() ===
            eachProductData.separate.toUpperCase()
        )
    );
  };

  useTimeout(brandLogo, 1000);
  useTimeout(sameProducts, 1000);

  // Images
  const [imgChecked, setImageChecked] = useState();
  const [styleChecked, setStyleChecked] = useState(null);

  // Color

  const [colorInfo, setColorInfo] = useState(null);

  // Branches

  const [branchChecked, setBranchChecked] = useState(false);
  const [branchInfo, setBranchInfo] = useState(null);

  //   Timer
  const [timerOff, setTimerOff] = useState(false);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(eachProductData.deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    let currentDate = new Date().toJSON().slice(0, 10);
    if (eachProductData.deadline > currentDate) {
      setTimerOff(true);
      const interval = setInterval(
        () => getTime(eachProductData.deadline),
        1000
      );
      return () => clearInterval(interval);
    } else {
      setTimerOff(false);
    }
  }, [eachProductData]);

  // Map

  const [branchCenterCoord, setBranchCenterCoord] = useState({
    lat: 41.693996421149336,
    long: 44.801544307893934,
  });

  ///////////////// C A R T ///////////////////////////
  const { addCartLocal } = useContext(LocalContext);

  ///////////////////// wish  ////////////////////////

  const { isLoading, wishlistData } = useSelector((state) => state.wishlist);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const wishAddHandler = () => {
    const isExist =
      wishlistData.map((id) => id.user).includes(userInfo.id) &&
      wishlistData.map((id) => id.wished_item).includes(eachProductData.id);

    if (!isExist) {
      dispatch(
        createWishlist({
          user: userInfo.id,
          wished_item: params.id,
        })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          dispatch(
            getWishlistByUser({
              id: userInfo.id,
            })
          );
        });
    } else {
      let itemID = wishlistData.filter(
        (data) =>
          data.user === userInfo.id && data.wished_item === eachProductData.id
      )[0].id;
      dispatch(
        deleteWishlist({
          id: itemID,
        })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          dispatch(
            getWishlistByUser({
              id: userInfo.id,
            })
          );
        });
    }
  };

  return (
    <>
      <HeadingInformation />
      <Navigation />
      <section className="each_products_main_section">
        <div className="each_products_product">
          <div className="social"></div>

          {/* Basic Information */}
          <div className="basic_information">
            {/* Image */}
            <div className="img_info">
              <div className="main_img_container">
                {!imgChecked && !eachProductIsLoading ? (
                  <img
                    src={
                      eachProductData.thumbnail &&
                      import.meta.env.VITE_APP_BASE_URL +
                        eachProductData.thumbnail
                    }
                    alt=""
                  />
                ) : (
                  <img src={imgChecked} alt="" />
                )}
              </div>
              <div className="chosen">
                {!eachProductIsLoading &&
                  eachProductData.images.map((img) => (
                    <div
                      key={img.id}
                      style={{
                        border: img.id === styleChecked && "1px solid black",
                        transition: img.id === styleChecked && "700ms",
                      }}
                    >
                      <label htmlFor={img.id}>
                        <img
                          src={
                            img.image &&
                            import.meta.env.VITE_APP_BASE_URL + img.image
                          }
                          alt=""
                        />
                      </label>
                      <input
                        type="radio"
                        name="images"
                        id={img.id}
                        onChange={() => {
                          setImageChecked(
                            `${import.meta.env.VITE_APP_BASE_URL + img.image}`
                          );
                          setStyleChecked(img.id);
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Info */}
            <div className="information">
              <div className="title_container">
                {/* Brand */}
                <div className="brand">
                  <div>
                    {!eachBrandIsLoading ? (
                      <>
                        <img
                          src={
                            eachBrandData.image &&
                            import.meta.env.VITE_APP_BASE_URL +
                              eachBrandData.image
                          }
                          alt=""
                        />
                        <p>{eachBrandData.name && eachBrandData.name}</p>
                      </>
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>

                <div className="title">
                  {!eachProductIsLoading && (
                    <h1>{eachProductData.title && eachProductData.title}</h1>
                  )}
                </div>

                <div className="store">
                  {isAuthenticated ? (
                    <div onClick={wishAddHandler}>
                      <FontAwesomeIcon
                        icon={
                          wishlistData
                            .map((data) => data.wished_item)
                            .includes(eachProductData.id)
                            ? faHeartBroken
                            : faHeart
                        }
                      />
                      {wishlistData
                        .map((data) => data.wished_item)
                        .includes(eachProductData.id) ? (
                        <p>Delete from Wishlist</p>
                      ) : (
                        <p>Add To Wishlist</p>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        navigate("/log_in");
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      <p>Log in to add </p>
                    </div>
                  )}

                  {!eachProductIsLoading &&
                    (eachProductData.total_in_stock === true ? (
                      <div>
                        <FontAwesomeIcon icon={faStore} />
                        <p>In Stock</p>
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon
                          icon={faStore}
                          style={{ color: "red" }}
                        />
                        <p style={{ color: "red" }}>Out of Stock</p>
                      </div>
                    ))}
                </div>
              </div>
              <hr />

              {/* Colors & Basic infos */}
              <div className="colors_and_basics">
                <div className="colors">
                  <div className="title_color">
                    <p>
                      Color:{" "}
                      <span>
                        {eachProductData.color &&
                          eachProductData.color.charAt(0).toUpperCase() +
                            eachProductData.color.slice(1)}
                      </span>
                    </p>
                  </div>

                  <div className="color_divs">
                    {!eachProductIsLoading ? (
                      separateProduct.length > 0 &&
                      separateProduct.map((color) => (
                        <div
                          style={{
                            backgroundColor: `${color.color && color.color}`,
                            border: colorInfo == color.id && "1px solid black",
                          }}
                          key={color.id}
                          onChange={() => {
                            setColorInfo(color.id);
                            navigate(
                              `/each_products/${color.title}/${color.id}`
                            );
                            setStyleChecked(null);
                          }}
                        >
                          <label htmlFor={color.color}></label>
                          <input type="radio" name="color" id={color.color} />
                        </div>
                      ))
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>

                {/*/////////////// Main Specifications ///////////////////*/}
                {!eachProductIsLoading && (
                  <EachProductBasic data={eachProductData.specification} />
                )}
              </div>

              {/* Memory */}
              {/* <div className="memories">
                <div className="title">
                  {!eachProductIsLoading && separateProduct.length > 0 && (
                    <p>
                      Memory:{" "}
                      <span>{product[0].specifications[5].basic[0].name}</span>
                    </p>
                  )}
                </div>
                <div className="memory_cont">
                  <div>
                    <p>128 GB</p>
                  </div>
                  <div>
                    <p>64 GB</p>
                  </div>
                  <div>
                    <p>512 GB</p>
                  </div>
                  <div>
                    <p>128 GB</p>
                  </div>
                </div>
              </div> */}

              {/* Model */}

              <div className="memories">
                {!eachProductIsLoading && (
                  <div className="title">
                    <p>
                      Model:{" "}
                      <span>
                        {eachProductData.product_model &&
                          eachProductData.product_model}
                      </span>
                    </p>
                  </div>
                )}

                <div className="memory_cont">
                  {!eachProductIsLoading &&
                    separateProduct.length > 0 &&
                    separateProduct.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => {
                          navigate(`/each_products/${data.title}/${data.id}`);
                        }}
                      >
                        <p>{data.product_model && data.product_model}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <hr />
          {/* Other Main Information */}
          <div className="nav_bar">
            <nav>
              <ul>
                <li>
                  <LinkS
                    activeClass="active"
                    to="description"
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={500}
                    delay={300}
                  >
                    Description
                  </LinkS>
                </li>
                <li>
                  <LinkS
                    activeClass="active"
                    to="specifications"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    delay={300}
                  >
                    Specifications
                  </LinkS>
                </li>
                <li>
                  <LinkS
                    activeClass="active"
                    to="branches"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    delay={300}
                  >
                    Branches
                  </LinkS>
                </li>
              </ul>
            </nav>
          </div>

          {/* Description */}
          <section className="description" id="description">
            {!eachProductIsLoading && (
              <p>
                {eachProductData.description && eachProductData.description}
              </p>
            )}
          </section>

          {/* Products specifications */}

          <section className="products_specifications" id="specifications">
            <div className="title">
              <h2>Products specifications</h2>
            </div>

            <div className="cat_table">
              {!eachProductIsLoading &&
                eachProductData.specification.map((spec, index) => (
                  <div className="spec_cat" key={spec.id}>
                    <div className="spec_title">{spec.category}</div>
                    <div className="spec_basic">
                      {spec.basic.map((info) => (
                        <div className="info_basic" key={info.middle}>
                          <div className="info_type">{info.middle}:</div>
                          <div className="info_name">{info.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Branches */}
          <section className="products_specifications" id="branches">
            <div className="title">
              <h2>Branches</h2>
            </div>
            <div className="infos_cont">
              <div className="branch_names_for_each">
                {/* branch containers */}

                {!branchIsLoading &&
                  branchData.map((branch, index) => (
                    <div
                      className="branch_container"
                      key={branch.id}
                      style={{
                        border:
                          branch.id === branchChecked && "1px solid black",
                      }}
                    >
                      <label htmlFor={branch.name}>{branch.name}</label>
                      {!productStockIsLoading &&
                      productStockData.filter(
                        (data) => data.branch === branch.id
                      )[0].in_stock ? (
                        <p>In Stock</p>
                      ) : (
                        <span>Out of Stock</span>
                      )}
                      <input
                        type="radio"
                        name="branches"
                        id={branch.name}
                        onChange={() => {
                          setBranchChecked(branch.id);
                          setBranchInfo(branch);
                          setBranchCenterCoord({
                            lat: branch.coord[0].lat,
                            long: branch.coord[0].long,
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
                        branchInfo.working_hours.map((hour, index) => (
                          <div className="weekday_hour" key={index}>
                            <p>{hour.week_day}:</p>
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
                  {branchCenterCoord && !branchIsLoading ? (
                    <MapContainer
                      center={[
                        branchCenterCoord.lat && branchCenterCoord.lat,
                        branchCenterCoord.long && branchCenterCoord.long,
                      ]}
                      zoom={10}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {!branchIsLoading &&
                        branchData.map((address) => (
                          <Marker
                            position={[
                              address.coord[0].lat,
                              address.coord[0].long,
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
              </div>
            </div>
          </section>
        </div>

        {/* Buying */}
        <div className="each_products_product_buy">
          {!eachProductIsLoading && timerOff && eachProductData.sale > 0 && (
            <div className="hot_sale_time">
              <div>
                <p>{days < 10 ? "0" + days : days}</p>
                <span>DAYS</span>
              </div>
              <div>
                <p>{hours < 10 ? "0" + hours : hours}</p>
                <span>HOURS</span>
              </div>
              <div>
                <p>{minutes < 10 ? "0" + minutes : minutes}</p>
                <span>MINS</span>
              </div>
              <div>
                <p>{seconds < 10 ? "0" + seconds : seconds}</p>
                <span>SECS</span>
              </div>
            </div>
          )}

          <div className="buying">
            <div className="price_cont">
              {!eachProductIsLoading ? (
                eachProductData.new_price > 0 ? (
                  <p>
                    ${eachProductData.new_price && eachProductData.new_price}{" "}
                    <span>
                      ${eachProductData.price && eachProductData.price}
                    </span>
                  </p>
                ) : (
                  <p>${eachProductData.price && eachProductData.price}</p>
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <div className="buttons">
              <button
                className="cart"
                onClick={() => {
                  addCartLocal(eachProductData);
                }}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
              <button className="buy">Buy Now</button>
            </div>

            {/* Credit Card */}
            <button className="credit_card_button">
              Buy In Credit 78$ - From
            </button>
            {/* Cards */}
            <div className="cards">
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <Footer />
    </>
  );
}

export default EachProduct;
