import { ProductType } from "../../../../types/product";

interface PropTypes {
  data: ProductType["data"];
}

const ProductSpecTable: React.FC<PropTypes> = ({ data }) => {
  return (
    <>
      {data.specifications.map((spec) => (
        <div className="spec_cat" key={spec._id}>
          <div className="spec_title">{spec.category}</div>
          <div className="spec_basic">
            {spec.specificationBasics.map((info) => (
              <div className="info_basic" key={info.middle}>
                <div className="info_type">{info.middle}:</div>
                <div className="info_name">{info.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSpecTable;
