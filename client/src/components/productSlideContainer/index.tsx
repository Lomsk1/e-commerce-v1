import { ProductsType } from "../../types/product";
import { WishlistType } from "../../types/wishlist";
import ProductLongContainer from "../productLongContainer";

interface DataTypes {
  data: ProductsType["data"];
  isAuthenticated: boolean;
  wishlist: WishlistType | null;
}

const ProductSlideContainer: React.FC<DataTypes> = ({
  data,
  isAuthenticated,
  wishlist,
  //   user,
}) => {
  return (
    <>
      <section className="product_slide_container">
        {data &&
          data.map((data) => (
            <ProductLongContainer
              key={data.id}
              wishlist={wishlist}
              isAuthenticated={isAuthenticated}
              data={data}
              style={{
                margin: "1em",
              }}
            />
          ))}
      </section>
    </>
  );
};

export default ProductSlideContainer;
