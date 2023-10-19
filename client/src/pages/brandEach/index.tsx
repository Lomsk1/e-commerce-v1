import { useMutation, useQuery } from "@tanstack/react-query";
import { getBrandById } from "../../api/brand/get";
import { brandType } from "../../types/brand";
import { useParams } from "react-router-dom";
import { getAllProductByParams } from "../../api/products/get";
import { useState } from "react";
import { ProductsType } from "../../types/product";
import ProductLongContainer from "../../components/productLongContainer";
import useAuthStore from "../../store/client/user/useAuthStore";
import useWishlistStore from "../../store/client/wishlist/wishlist";

function BrandEachPage() {
  /* Router */
  const { id } = useParams();

  /* States */
  const [categoryChecked, setCategoryChecked] = useState<string | null>(null);

  /* Stores */
  const { isAuthenticated } = useAuthStore((state) => state);
  const { wishlist } = useWishlistStore((state) => state);

  /* Queries */
  const brandQuery = useQuery<brandType, Error>(
    ["brand"],
    () => getBrandById({ id: id! }),
    {
      retry: 2,
      enabled: true,
    }
  );

  /* Mutation */
  const productMutation = useMutation<
    ProductsType,
    Error,
    { searchParams: string }
  >({
    mutationFn: getAllProductByParams,
  });

  return (
    <>
      {brandQuery.data?.status === "success" && (
        <>
          <section className="brand_page_section">
            {/* Thumbnail */}
            <div className="thumbnail_container">
              <img src={brandQuery.data.data.thumbnail.url} alt="thumbnail" />
            </div>

            {/* Title */}

            <div className="brand_title">
              <h1>{brandQuery.data.data.name}</h1>
            </div>

            {/* Products */}

            <div className="name_of_products">
              {brandQuery.data ? (
                brandQuery.data.data.brandCategory.map((data) => (
                  <div
                    className="container"
                    key={data._id}
                    onChange={() => {
                      setCategoryChecked(data._id);
                      productMutation.mutate({
                        searchParams: `?categoryFilter=${data.categoryId}&brandId=${id}`,
                      });
                    }}
                    style={{
                      border:
                        categoryChecked === data._id ? "2px solid red" : "",
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

            <div className="product_container">
              {productMutation.isSuccess ? (
                productMutation.data.data.map((data) => (
                  <ProductLongContainer
                    data={data}
                    style={{ margin: "1em" }}
                    key={data.id}
                    isAuthenticated={isAuthenticated}
                    wishlist={wishlist}
                  />
                ))
              ) : (
                <div className="error_div">Please, Choose Category First!</div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default BrandEachPage;
