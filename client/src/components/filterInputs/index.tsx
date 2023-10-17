import { faArrowTurnRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { CategoryTypes } from "../../types/categoryTypes";

interface PropTypes {
  clearHandler: () => void;
  priceHandler: (priceValue: { max: number; min: number }) => void;
  setMaxMin: { max: number; min: number };
  brandHandler: (id: string) => void;
  categories: CategoryTypes["data"] | undefined;
}

const FilterInputs: React.FC<PropTypes> = ({
  priceHandler,
  setMaxMin,
  brandHandler,
  clearHandler,
  categories,
}) => {
  /* States */
  const [brandOpen, setBrandOpen] = useState<boolean>(false);

  const [priceOpen, setPriceOpen] = useState<boolean>(false);
  const [priceValue, setPriceValue] = useState({
    max: 0,
    min: 0,
  });

  /* UseEffect */
  useEffect(() => {
    setPriceValue(setMaxMin);
  }, [setMaxMin]);

  const priceSubmitHandler = () => {
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
          }}
        >
          <FontAwesomeIcon
            icon={faArrowTurnRight}
            style={{ transform: priceOpen ? "rotate(90deg)" : "" }}
          />
        </button>
      </div>
      {priceOpen && (
        <div className="price_box">
          <div className="range_box">
            <input
              id="fromSlider"
              type="range"
              min={setMaxMin.min}
              max={setMaxMin.max}
              defaultValue={priceValue.min}
              onChange={(e) => {
                setPriceValue({
                  min: Number(e.target.value),
                  max: priceValue.max,
                });
              }}
            />
            <input
              id="toSlider"
              type="range"
              min={setMaxMin.min}
              max={setMaxMin.max}
              defaultValue={priceValue.max}
              onChange={(e) => {
                setPriceValue({
                  min: priceValue.min,
                  max: Number(e.target.value),
                });
              }}
            />
          </div>
          <div className="price_infos">
            <div>
              <p>{priceValue.min ? priceValue.min : setMaxMin.min}</p>
            </div>
            <div>
              <p>{priceValue.max ? priceValue.max : setMaxMin.max}</p>
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
            style={{ transform: brandOpen ? "rotate(90deg)" : "" }}
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
                    brandHandler("all");
                  }
                }}
              />
              <label htmlFor={"all"}>All</label>
            </li>
            {categories?.brands.map((data) => (
              <li key={data._id}>
                <input
                  type="radio"
                  name={"brand"}
                  id={data._id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      brandHandler(data.brandId);
                    }
                  }}
                />
                <label htmlFor={data._id}>{data.brandName}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FilterInputs;
