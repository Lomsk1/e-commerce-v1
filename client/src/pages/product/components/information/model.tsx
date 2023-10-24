import { useNavigate } from "react-router-dom";
import { ProductsType } from "../../../../types/product";

interface PropTypes {
  sepData: ProductsType;
}

const ProductModelInformation: React.FC<PropTypes> = ({ sepData }) => {
  /* Routes */
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="memories">
        <div className="title">
          {sepData.result > 0 && (
            <p>
              Model: <span></span>
            </p>
          )}{" "}
          <div className="memory_cont">
            {sepData.data.map((model) =>
              model.specifications.map((m) =>
                m.specificationBasics
                  .filter((r) => r.middle.toUpperCase() === "MODEL")
                  .map((d) => (
                    <div
                      key={d._id}
                      onClick={() => {
                        navigate(`/product/${model.id}/${model.title}`);
                      }}
                    >
                      <p>{d.name}</p>
                    </div>
                  ))
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModelInformation;
