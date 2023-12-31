import { useNavigate } from "react-router-dom";
import { ProductsType } from "../../../types/product";
import Wrapper from "../../wrapper";

interface SearchBarTypes {
  close: () => void;
  visible: boolean;
  products: ProductsType | null;
  setBurger: ({ bol }: { bol: boolean }) => void;
}

const SearchBarMobileWrapper: React.FC<SearchBarTypes> = ({
  close,
  visible,
  products,
  setBurger,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Wrapper
        className="search_bar_container_mobile"
        close={close}
        visible={visible}
      >
        <div className="product_container">
          {/* Products */}

          {products?.status === "success" &&
            products.data.map((product) => (
              <div
                className="product_"
                key={product?.id}
                onClick={() => {
                  navigate(`product/${product?.id}/${product?.title}`);
                  close();
                  setBurger({ bol: false });
                }}
              >
                {product?.thumbnail?.url && (
                  <div className="image">
                    <img src={product.thumbnail.url} alt="image" />
                  </div>
                )}

                <div className="title">
                  <p>{product?.title}</p>
                </div>
                <div className="price">
                  <p>{product?.price} $</p>
                </div>
              </div>
            ))}
        </div>
      </Wrapper>
    </>
  );
};

export default SearchBarMobileWrapper;
