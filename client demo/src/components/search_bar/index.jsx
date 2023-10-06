import { useNavigate } from "react-router-dom";
import Wrapper from "../wrapper";

function SearchBar({ close, visible, data }) {
  const navigate = useNavigate();
  return (
    <>
      <Wrapper className="search_bar_container" close={close} visible={visible}>
        <div className="product_container">
          {/* Products */}
          {data &&
            data.map((product) => (
              <div
                className="product_"
                key={product.id}
                onClick={() => {
                  navigate(`each_products/${product.title}/${product.id}`);
                }}
              >
                <div className="image">
                  <img
                    src={import.meta.env.VITE_APP_BASE_URL + product.thumbnail}
                    alt=""
                  />
                </div>
                <div className="title">
                  <p>{product.title}</p>
                </div>
                <div className="price">
                  <p>{product.price} $</p>
                </div>
              </div>
            ))}
        </div>
      </Wrapper>
    </>
  );
}

export default SearchBar;