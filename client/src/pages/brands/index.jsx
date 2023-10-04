import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import HeadingInformation from "../../components/heading_info";
import Navigation from "../../components/navigation";
import ProductLongContainer from "../../components/product_container";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getBrandByID } from "../../API/brand/action";

function BrandPage() {
  const params = useParams();
  const dispatch = useDispatch();

  //   Brand Data
  const { eachBrandData, eachBrandIsLoading } = useSelector(
    (state) => state.brand
  );

  useEffect(() => {
    let isSub = true;
    if (isSub) {
      dispatch(
        getBrandByID({
          id: params.id,
        })
      );
    }
    return () => {
      isSub = false;
    };
  }, [params]);
  //   Product Sort with Categories

  const [categoryChecked, setCategoryChecked] = useState(null);
  const [categoryData, setCategoryData] = useState({});

  return (
    <>
      <HeadingInformation />
      <Navigation />
      <section className="brand_page_section">
        {!eachBrandIsLoading && (
          <div className="thumbnail_container">
            <img
              src={import.meta.env.VITE_APP_BASE_URL + eachBrandData.image}
              alt=""
            />
          </div>
        )}

        {/* Title */}
        {!eachBrandIsLoading && (
          <div className="brand_title">
            <h1>{eachBrandData.name}</h1>
          </div>
        )}

        {/* Products */}
        {!eachBrandIsLoading && (
          <div className="name_of_products">
            {!eachBrandIsLoading ? (
              eachBrandData.category.map((data) => (
                <div
                  className="container"
                  key={data.id}
                  onChange={() => {
                    setCategoryChecked(data.id);
                    setCategoryData(data.product);
                  }}
                  style={{
                    border: categoryChecked === data.id && "2px solid red",
                  }}
                >
                  <label htmlFor={data.name}>{data.name}</label>
                  <input type="radio" name="brand_category" id={data.name} />
                </div>
              ))
            ) : (
              <div className="error_div">No Data Found</div>
            )}
          </div>
        )}

        <div className="product_container">
          {categoryData.length > 0 ? (
            categoryData.map((data) => (
              <ProductLongContainer
                style={{ margin: "1em" }}
                thumbnail={data.thumbnail}
                category={data.category}
                title={data.title}
                price={data.price}
                new_price={data.new_price}
                new_item={data.new_item}
                sale={data.sale}
                id={data.id}
                key={data.id}
              />
            ))
          ) : (
            <div className="error_div">Please, Choose Category First!</div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default BrandPage;
