import { useQuery } from "@tanstack/react-query";
import { getAllProductByParams, getProductById } from "../../api/products/get";
import { useParams } from "react-router-dom";
import { ProductType, ProductsType } from "../../types/product";
import ProductMainInformation from "./components/information";
import ProductNav from "./components/scroll";
import ProductSpecTable from "./components/spec";
import ProductBranchInfo from "./components/branch";
import ProductBuyInfo from "./components/buy";

function EachProduct() {
  /* Routes */
  const params = useParams();

  /* States */
  //   const [imgChecked, setImageChecked] = useState();

  /* Query */
  const productQuery = useQuery<ProductType, Error>(
    ["product"],
    () => getProductById({ id: params.id! }),
    {
      retry: 2,
      enabled: !!params,
    }
  );

  const separateProductsQuery = useQuery<ProductsType, Error>(
    ["separateProducts"],
    () =>
      getAllProductByParams({
        searchParams: `?separate=${productQuery.data?.data.separate}`,
      }),
    {
      retry: 2,
      enabled: productQuery.isSuccess,
    }
  );

  if (productQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {productQuery.isSuccess && separateProductsQuery.isSuccess ? (
        <>
          <section className="each_products_main_section">
            <div className="each_products_product">
              <div className="social"></div>

              {/* Main Information */}
              <ProductMainInformation
                data={productQuery.data.data}
                sepData={separateProductsQuery.data}
              />

              <hr />

              {/* Scroll */}
              <ProductNav />

              {/* Description */}
              <section className="description" id="description">
                <p>{productQuery.data.data.description}</p>
              </section>

              {/* Products specifications */}

              <section className="products_specifications" id="specifications">
                <div className="title">
                  <h2>Products specifications</h2>
                </div>

                <div className="cat_table">
                  <ProductSpecTable data={productQuery.data.data} />
                </div>
              </section>

              {/* Branches */}
              <ProductBranchInfo data={productQuery.data.data} />
            </div>

            {/* Buying */}
            <ProductBuyInfo data={productQuery.data.data} />
          </section>
        </>
      ) : (
        <div>Error while loading data...</div>
      )}
    </>
  );
}

export default EachProduct;
