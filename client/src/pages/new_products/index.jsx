import { useSelector } from "react-redux";
import Footer from "../../components/footer";
import HeadingInformation from "../../components/heading_info";
import Navigation from "../../components/navigation";
import ProductLongContainer from "../../components/product_container";

function NewProductPage() {
  const { productData, isLoading } = useSelector((state) => state.product);
  return (
    <>
      <HeadingInformation />
      <Navigation />

      <section className="new_products_section">
        <div className="title_for_every">
          <h1>About New Products</h1>
        </div>

        <div className="description_new_items">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            nesciunt nihil repudiandae quaerat, aliquam nam? Reiciendis quam
            dicta consequuntur vero, nemo ab ea enim reprehenderit dolorum odit
            nihil nostrum molestias saepe, harum placeat? Cumque dolorum eaque
            dicta alias necessitatibus fuga deserunt debitis dignissimos harum
            provident. Laborum possimus itaque culpa porro!
          </p>
        </div>

        <div className="title_for_every">
          <h1>New Products</h1>
        </div>

        <div className="new_product_cont">
          {!isLoading ? (
            productData
              .filter((info) => info.new === true)
              .map((product) => (
                <ProductLongContainer
                  style={{ margin: "1em" }}
                  thumbnail={product.thumbnail}
                  category={product.category}
                  title={product.title}
                  price={product.price}
                  new_price={product.new_price}
                  new_item={product.new}
                  sale={product.sale}
                  id={product.id}
                  key={product.id}
                />
              ))
          ) : (
            <h2>No New Product at this Moment</h2>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default NewProductPage;
