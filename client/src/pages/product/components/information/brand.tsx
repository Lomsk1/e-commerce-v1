import { ProductType } from "../../../../types/product";

interface PropTypes {
  brand: ProductType["data"]["brand"];
}

const ProductBrandInformation: React.FC<PropTypes> = ({ brand }) => {
  return (
    <>
      <div className="brand">
        <div>
          {/* {brand.image ? ( */}
          <>
            {/* <img src={brand.image} alt="brand" /> */}
            <p>{brand.name && brand.name}</p>
          </>
          {/* ) : (
            <div>Loading...</div>
          ) */}
          {/* } */}
        </div>
      </div>
    </>
  );
};

export default ProductBrandInformation;
