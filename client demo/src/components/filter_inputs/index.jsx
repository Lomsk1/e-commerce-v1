import { faArrowTurnRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandData } from "../../API/brand/action";
import { setFilteredIs, setPriceData } from "../../redux/client/filter/slice";

function FilterInputs({
  priceHandler,
  setMaxMin,
  importPriceData,
  brandHandler,
  clearHandler,
}) {
  // Redux
  const dispatch = useDispatch();

  const { brandData, brandDataIsLoading } = useSelector((state) => state.brand);

  // Open
  const [priceOpen, setPriceOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  // PRICE
  const [priceValue, setPriceValue] = useState({
    first: setMaxMin.min,
    second: setMaxMin.max,
  });

  // FUNCTIONS

  useEffect(() => {
    let sub = true;
    if (sub) {
      dispatch(getAllBrandData());
    }

    return () => {
      sub = false;
    };
  }, []);

  const priceSubmitHandler = () => {
    dispatch(setPriceData(priceValue));
    dispatch(setFilteredIs(true));
    priceHandler(priceValue);
  };

  return (
    <>
      {/* Clear All */}
      <div className="all_clear_box">
        <p>All Selection</p>
        <button
          onClick={() => {
            clearHandler();
            setPriceOpen(false);
            setBrandOpen(false);
          }}
        >
          Clear Everything
        </button>
      </div>

      {/* Price */}
      <div className="filters">
        <h2>Price</h2>
        <button
          onClick={() => {
            setPriceOpen(!priceOpen);
            importPriceData();
          }}
        >
          <FontAwesomeIcon
            icon={faArrowTurnRight}
            style={{ transform: priceOpen && "rotate(90deg)" }}
          />
        </button>
      </div>
      {priceOpen && setMaxMin && (
        <div className="price_box">
          <div className="range_box">
            <input
              id="fromSlider"
              type="range"
              min={setMaxMin.min}
              max={setMaxMin.max}
              defaultValue={setMaxMin.min}
              onChange={(e) => {
                setPriceValue({
                  first: e.target.value,
                  second: priceValue.second,
                });
              }}
            />
            <input
              id="toSlider"
              type="range"
              min={setMaxMin.min}
              max={setMaxMin.max}
              defaultValue={setMaxMin.max}
              onChange={(e) => {
                setPriceValue({
                  first: priceValue.first,
                  second: e.target.value,
                });
              }}
            />
          </div>
          <div className="price_infos">
            <div>
              <p>{priceValue.first ? priceValue.first : setMaxMin.min}</p>
            </div>
            <div>
              <p>{priceValue.second}</p>
            </div>
            <button onClick={priceSubmitHandler}>Submit</button>
          </div>
        </div>
      )}

      {/*BRAND*/}
      <div className="filters">
        <h2>Brand</h2>
        <button
          onClick={() => {
            setBrandOpen(!brandOpen);
          }}
        >
          <FontAwesomeIcon
            icon={faArrowTurnRight}
            style={{ transform: brandOpen && "rotate(90deg)" }}
          />
        </button>
      </div>
      {brandOpen && (
        <div className="brand_box">
          <ul>
            <li>
              <input
                type="radio"
                name={"brand"}
                id={"all"}
                onChange={(e) => {
                  if (e.target.checked) {
                    brandHandler(data.id);
                  }
                }}
              />
              <label htmlFor={"all"}>All</label>
            </li>
            {!brandDataIsLoading &&
              brandData.map((data) => (
                <li key={data.id}>
                  <label htmlFor={data.name}>{data.name}</label>

                  <ul key={data.id} className="child_ul">
                    {data.category.length > 0 &&
                      data.category.map((data) => (
                        <li key={data.id}>
                          <input
                            type="radio"
                            name={"brand"}
                            id={data.name}
                            onChange={(e) => {
                              if (e.target.checked) {
                                brandHandler(data.id);
                              }
                            }}
                          />
                          <label htmlFor={data.name}>{data.name}</label>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default FilterInputs;
