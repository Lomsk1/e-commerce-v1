import EachProductBasic from "../../../../components/product/specifications/basic";
import { ProductType, ProductsType } from "../../../../types/product";
import ProductBrandInformation from "./brand";
import ProductColorsInformation from "./color";
import ProductImageInfo from "./image";
import ProductMemoryInformation from "./memory";
import ProductModelInformation from "./model";
import ProductStockInformation from "./stock";

interface PropTypes {
  data: ProductType["data"];
  sepData: ProductsType;
}

const ProductMainInformation: React.FC<PropTypes> = ({ data, sepData }) => {
  return (
    <>
      <div className="basic_information">
        {/* Image */}
        <ProductImageInfo thumbnail={data.thumbnail} />

        {/* Info */}
        <div className="information">
          <div className="title_container">
            {/* Brand */}
            <ProductBrandInformation brand={data.brand} />

            {/* Title */}
            <div className="title">
              <h1>{data.title}</h1>
            </div>

            {/* Wishlist & Stock */}
            <ProductStockInformation data={data} />

            <hr />

            {/* Colors & Basic infos */}
            <div className="colors_and_basics">
              <div className="colors">
                {/* Main Color */}
                <div className="title_color">
                  <p>
                    Color:{" "}
                    <span>
                      {data.color &&
                        data.color.charAt(0).toUpperCase() +
                          data.color.slice(1)}
                    </span>
                  </p>
                </div>

                {/* Separate Products with Color */}
                <ProductColorsInformation sepData={sepData} />
              </div>
              {/* </div> */}

              {/*/////////////// Main Specifications ///////////////////*/}
              <div className="basic_infos">
                {data.specifications && (
                  <EachProductBasic data={data.specifications} />
                )}
              </div>
            </div>

            {/* Memory */}
            <ProductMemoryInformation sepData={sepData} />

            {/* Model */}
            <ProductModelInformation sepData={sepData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMainInformation;
