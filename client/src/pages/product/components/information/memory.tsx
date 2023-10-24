import { useNavigate } from "react-router-dom";
import { ProductsType } from "../../../../types/product";

interface PropTypes {
  sepData: ProductsType;
}

const ProductMemoryInformation: React.FC<PropTypes> = ({ sepData }) => {
  /* Routes */
  const navigate = useNavigate();
  return (
    <>
      <div className="memories">
        <div className="title">
          {sepData.result > 0 && (
            <p>
              Memory: <span></span>
            </p>
          )}
          <div className="memory_cont">
            {sepData.data.map((memory) =>
              memory.specifications.map((m) =>
                m.specificationBasics
                  .filter((r) => r.middle.toUpperCase() === "MEMORY")
                  .map((d) => (
                    <div
                      key={d._id}
                      onClick={() => {
                        navigate(`/product/${memory.id}/${memory.title}`);
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

export default ProductMemoryInformation;
