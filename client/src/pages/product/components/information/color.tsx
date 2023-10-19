import { useState } from "react";
import { ProductsType } from "../../../../types/product";
import { useNavigate } from "react-router-dom";

interface PropTypes {
  sepData: ProductsType;
}

const ProductColorsInformation: React.FC<PropTypes> = ({ sepData }) => {
  /* Router */
  const navigate = useNavigate();

  /* States */
  const [colorInfo, setColorInfo] = useState<string | null>(null);
  //   const [styleChecked, setStyleChecked] = useState<boolean | null>(null);

  return (
    <>
      <div className="color_divs">
        {sepData.result > 0 ? (
          sepData.data.map((prod) => (
            <div
              style={{
                backgroundColor: `${prod.color && prod.color}`,
                border: colorInfo == prod.id ? "1px solid black" : "",
              }}
              key={prod.id}
              onChange={() => {
                setColorInfo(prod.id);
                navigate(`/product/${prod.id}/${prod.title}`);
                // setStyleChecked(null);
              }}
            >
              <label htmlFor={prod.color}></label>
              <input type="radio" name="color" id={prod.color} />
            </div>
          ))
        ) : (
          <div>No similar product found</div>
        )}
      </div>
    </>
  );
};

export default ProductColorsInformation;
