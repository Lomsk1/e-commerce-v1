import { useNavigate } from "react-router-dom";
import { ProductsType } from "../../../../types/product";

interface PropTypes{
    sepData: ProductsType
}

const ProductMemoryInformation:React.FC<PropTypes> = ({sepData}) => {
    /* Routes */
    const navigate = useNavigate()
  return (
    <>
      <div className="memories">
        <div className="title">
          <div className="memory_cont">
            {sepData.result > 0 && (
              <p>
                Memory:{" "}
                <span>
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
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMemoryInformation;
