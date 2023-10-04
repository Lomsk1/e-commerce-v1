import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryByID } from "../../API/category/action";
import FilterInputs from "../../components/filter_inputs";
import HeadingInformation from "../../components/heading_info";
import Navigation from "../../components/navigation";
import ProductLongContainer from "../../components/product_container";
import { setFilteredIs } from "../../redux/client/filter/slice";

function FilterPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [maxMin, setMaxMin] = useState({
    min: "min",
    max: "max",
  });

  ///////////////////// S E L E C T O R //////////////////////

  const { eachCategoryData, eachIsLoading } = useSelector(
    (state) => state.category
  );

  const { priceData, filteredIsSet } = useSelector((state) => state.filter);

  const { brandData, brandDataIsLoading } = useSelector((state) => state.brand);

  ///////////////////// D A T A //////////////////////

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    dispatch(
      getCategoryByID({
        id: params.id,
      })
    );
  }, [params]);

  useEffect(() => {
    if (!eachIsLoading) {
      setProductData(eachCategoryData.product);
      dispatch(setFilteredIs(false));
    }
  }, [!eachIsLoading]);

  ///////////////////// F U N C T I O N S //////////////////////

  const stockHandler = (e) => {
    if (e.target.checked) {
      setProductData(
        productData.filter((info) => info.total_in_stock === true)
      );
    }
    if (!e.target.checked) {
      setProductData(eachCategoryData.product);
    }
    dispatch(setFilteredIs(true));
  };

  const priceHandler = (e) => {
    setProductData(
      eachCategoryData.product.filter(
        (info) =>
          (info.price >= Number(e.first) && info.price <= Number(e.second)) ||
          (info.new_price > 0 &&
            info.new_price >= Number(e.first) &&
            info.new_price <= Number(e.second))
      )
    );
    dispatch(setFilteredIs(true));
  };

  const importPriceData = () => {
    const data = eachCategoryData.product
      .map((data) => data.price)
      .sort((a, b) => a - b);
    const length = eachCategoryData.product.length;
    setMaxMin({
      min: data[0],
      max: data[length - 1],
    });
  };

  const brandHandler = (e) => {
    setProductData(eachCategoryData.product.filter((data) => data.brand === e));
    dispatch(setFilteredIs(true));
  };

  const sortHandler = (e) => {
    dispatch(setFilteredIs(true));
    // by Date
    if (e.target.value === "date") {
      setProductData(eachCategoryData.product);
    }
    // by Price Hight
    if (e.target.value === "price_hight") {
      if (eachCategoryData.product.includes((info) => info.sale > 0)) {
        setProductData(
          eachCategoryData.product
            .map((data) => data)
            .sort((a, b) => b.new_price - a.new_price)
        );
      } else {
        setProductData(
          eachCategoryData.product
            .map((data) => data)
            .sort((a, b) => b.price - a.price)
        );
      }
    }
    // by Price Low
    if (e.target.value === "price_low") {
      if (eachCategoryData.product.includes((info) => info.sale > 0)) {
        setProductData(
          eachCategoryData.product
            .map((data) => data)
            .sort((a, b) => a.new_price - b.new_price)
        );
      } else {
        setProductData(
          eachCategoryData.product
            .map((data) => data)
            .sort((a, b) => a.price - b.price)
        );
      }
    }
    // by Name A
    if (e.target.value === "name_a") {
      setProductData(
        eachCategoryData.product
          .map((data) => data)
          .sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
      );
    }

    // by Name Z
    if (e.target.value === "name_z") {
      setProductData(
        eachCategoryData.product
          .map((data) => data)
          .sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            return 0;
          })
      );
    }
  };

  return (
    <>
      <HeadingInformation />
      <Navigation />

      <section className="filter_section">
        {/* Filter Inputs */}
        <div className="filter_container">
          <FilterInputs
            priceHandler={(e) => {
              priceHandler(e);
            }}
            setMaxMin={maxMin}
            importPriceData={importPriceData}
            brandHandler={brandHandler}
            clearHandler={() => {
              setProductData(eachCategoryData.product);
            }}
          />
        </div>

        {/* Products */}
        <div className="product_container">
          {/* Title */}
          <div className="title_box">
            <h1>{params.name}</h1>

            <div className="stock">
              <label htmlFor="stock">In Stock</label>
              <input
                type="checkBox"
                name="stock"
                id="stock"
                onChange={stockHandler}
              />
            </div>

            <select name="sort" id="sort" onChange={sortHandler}>
              <option value="date">Added Date</option>
              <option value="price_hight">Price: Hight to Low</option>
              <option value="price_low">Price: Low to Hight</option>
              <option value="name_a">Name: A to Z</option>
              <option value="name_z">Name: Z to A</option>
            </select>
          </div>

          {/* Products */}
          <div className="product_boxes">
            {!eachIsLoading && !filteredIsSet
              ? eachCategoryData.product.map((data) => (
                  <ProductLongContainer
                    data={data}
                    thumbnail={data.thumbnail}
                    title={data.title}
                    category={data.category}
                    price={data.price}
                    new_price={data.new_price}
                    new_item={data.new}
                    sale={data.sale}
                    key={data.id}
                    id={data.id}
                    style={{
                      margin: "1em",
                      height: "400px",
                    }}
                  />
                ))
              : productData.map((data) => (
                  <ProductLongContainer
                    data={data}
                    thumbnail={data.thumbnail}
                    title={data.title}
                    category={data.category}
                    price={data.price}
                    new_price={data.new_price}
                    new_item={data.new}
                    sale={data.sale}
                    key={data.id}
                    id={data.id}
                    style={{
                      margin: "1em",
                      height: "400px",
                    }}
                  />
                ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FilterPage;
