import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getAllProductByParams } from "../../api/products/get";
import { useEffect, useState } from "react";
import { ProductsType } from "../../types/product";
import FilterInputs from "../../components/filterInputs";
import ProductLongContainer from "../../components/productLongContainer";
import useAuthStore from "../../store/client/user/useAuthStore";
import useWishlistStore from "../../store/client/wishlist/wishlist";
import useCategoryStore from "../../store/client/category/category";

function FilterPage() {
  /* Routes */
  const location = useLocation();

  /* States */
  const [productData, setProductData] = useState<
    ProductsType["data"] | null | undefined
  >(null);

  /* Stores */
  const { isAuthenticated } = useAuthStore((state) => state);
  const { wishlist } = useWishlistStore((state) => state);
  const { categories } = useCategoryStore((state) => state);

  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryFilter");

  /* Mutations */
  const productParamsMutation = useMutation({
    mutationFn: getAllProductByParams,
    onSuccess: (data) => {
      setProductData(data.data);

      /* Max and Min Price */
      if (data.result === 0) {
        setMaxMin({
          min: 1,
          max: 100,
        });
      } else {
        const prices = data.data
          .map((data) => data.price)
          .sort((a, b) => a - b);
        setMaxMin({
          min: prices[0],
          max: prices[data.result - 1],
        });
      }
    },
    mutationKey: [],
  });

  useEffect(() => {
    productParamsMutation.mutate({
      searchParams: location.search && location.search,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const [maxMin, setMaxMin] = useState({
    min: 0,
    max: 0,
  });

  ///////////////////// F U N C T I O N S //////////////////////

  const stockHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setProductData(
        productParamsMutation?.data?.data.filter(
          (info) => info.totalInStock === true
        )
      );
    }
    if (!e.target.checked) {
      setProductData(productParamsMutation?.data?.data);
    }
  };

  const priceHandler = (e: { min: number; max: number }) => {
    console.log(e);
    setProductData(
      productParamsMutation.data?.data?.filter(
        (info) =>
          (info.price >= e.min && info.price <= e.max) ||
          (info.newPrice > 0 &&
            info.newPrice >= e.min &&
            info.newPrice <= e.max)
      )
    );
  };

  const brandHandler = (e: string) => {
    if (e === "all") {
      setProductData(productParamsMutation.data?.data);
    } else {
      setProductData(
        productParamsMutation.data?.data.filter((data) => data.brand.id === e)
      );
    }
  };

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // by Date
    if (e.target.value === "date") {
      productParamsMutation.mutate({
        searchParams: location.search && location.search,
      });
    }
    // by Price Hight
    if (e.target.value === "price_hight") {
      if (productParamsMutation.data?.data.some((info) => info.sale > 0)) {
        setProductData(
          productParamsMutation.data?.data
            .map((data) => data)
            .sort((a, b) => b.newPrice - a.newPrice)
        );
      } else {
        setProductData(
          productParamsMutation.data?.data
            .map((data) => data)
            .sort((a, b) => b.price - a.price)
        );
      }
    }
    // by Price Low
    if (e.target.value === "price_low") {
      if (productParamsMutation.data?.data.some((info) => info.sale > 0)) {
        setProductData(
          productParamsMutation.data?.data
            .map((data) => data)
            .sort((a, b) => a.newPrice - b.newPrice)
        );
      } else {
        setProductData(
          productParamsMutation.data?.data
            .map((data) => data)
            .sort((a, b) => a.price - b.price)
        );
      }
    }
    // by Name A
    if (e.target.value === "name_a") {
      setProductData(
        productParamsMutation.data?.data
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
        productParamsMutation.data?.data
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
      <section className="filter_section">
        {/* Filter Inputs */}
        <div className="filter_container">
          <FilterInputs
            categories={
              categories?.data.filter((id) => id.id === categoryId)[0]
            }
            priceHandler={(e) => {
              priceHandler(e);
            }}
            setMaxMin={maxMin}
            brandHandler={brandHandler}
            clearHandler={() => {
              setProductData(productParamsMutation.data?.data);
            }}
          />
        </div>

        {/* Products */}
        <div className="product_container">
          {/* Title */}
          <div className="title_box">
            <h1>
              {categories
                ? categories?.data.filter((id) => id.id === categoryId)[0].name
                : "Error Message"}
            </h1>

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
            {productData?.map((data) => (
              <ProductLongContainer
                key={data.id}
                data={data}
                isAuthenticated={isAuthenticated}
                wishlist={wishlist}
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
