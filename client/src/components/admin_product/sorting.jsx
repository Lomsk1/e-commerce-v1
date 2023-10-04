import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBrandData,
  getBrandCategoryByBrand,
} from "../../API/brand/action";
import { getAllCategoryData } from "../../API/category/action";
import {
  getAllLimitedProductData,
  getAllProductData,
} from "../../API/product/actions";
import {
  setSortData,
  setSortIsLoading,
} from "../../redux/admin/forProduct/slice";

function AdminProductSorting({ sortingFunction }) {
  const dispatch = useDispatch();

  const { sortData, productLimit } = useSelector((state) => state.productTable);
  const { categoryData, categoryIsLoading } = useSelector(
    (state) => state.category
  );
  const {
    brandData,
    brandDataIsLoading,
    brandCategoryData,
    brandCategoryDataIsLoading,
  } = useSelector((state) => state.brand);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [brandCategoryOpen, setBrandCategoryOpen] = useState(false);

  return (
    <>
      <div className="sorting_navigation">
        <ul>
          <li>
            <label
              htmlFor="product"
              style={{
                backgroundColor: sortData === "all" && "#143642",
                color: sortData === "all" && "#DAD2D8",
              }}
            >
              All Product
              <input
                type="radio"
                name="sort"
                id="product"
                onChange={() => {
                  dispatch(setSortData("all"));
                  dispatch(setSortIsLoading(false));
                  dispatch(
                    getAllLimitedProductData({
                      limit: productLimit,
                    })
                  );
                  sortingFunction("all");
                  setCategoryOpen(false);
                  setBrandOpen(false);
                  setBrandCategoryOpen(false);
                }}
                checked={sortData === "all" ? true : false}
              />
            </label>
          </li>

          <li>
            <label
              htmlFor="category"
              style={{
                backgroundColor: sortData === "category" && "#143642",
                color: sortData === "category" && "#DAD2D8",
              }}
            >
              By Category
              <input
                type="radio"
                name="sort"
                id="category"
                onChange={() => {
                  dispatch(setSortData("category"));
                  dispatch(getAllCategoryData());
                  setCategoryOpen(true);
                  setBrandOpen(false);
                  setBrandCategoryOpen(false);
                }}
              />
            </label>
          </li>

          <li>
            <label
              htmlFor="brand"
              style={{
                backgroundColor: sortData === "brand" && "#143642",
                color: sortData === "brand" && "#DAD2D8",
              }}
            >
              By Brand
              <input
                type="radio"
                name="sort"
                id="brand"
                onChange={() => {
                  dispatch(setSortData("brand"));
                  setCategoryOpen(false);
                  setBrandOpen(true);
                  dispatch(getAllBrandData());
                  setBrandCategoryOpen(false);
                }}
              />
            </label>
          </li>

          <li>
            <label
              htmlFor="popularity"
              style={{
                backgroundColor: sortData === "popularity" && "#143642",
                color: sortData === "popularity" && "#DAD2D8",
              }}
            >
              By Popularity
              <input
                type="radio"
                name="sort"
                id="popularity"
                onChange={() => {
                  dispatch(setSortData("popularity"));
                  dispatch(setSortIsLoading(true));
                  sortingFunction("popularity");
                  setCategoryOpen(false);
                  setBrandOpen(false);
                  setBrandCategoryOpen(false);
                  dispatch(getAllProductData());
                }}
                checked={sortData === "popularity" ? true : false}
              />
            </label>
          </li>

          <li>
            <label
              htmlFor="top"
              style={{
                backgroundColor: sortData === "top" && "#143642",
                color: sortData === "top" && "#DAD2D8",
              }}
            >
              By Top
              <input
                type="radio"
                name="sort"
                id="top"
                onChange={() => {
                  dispatch(setSortData("top"));
                  dispatch(setSortIsLoading(true));
                  dispatch(getAllCategoryData());
                  sortingFunction("top");
                  setCategoryOpen(false);
                  setBrandOpen(false);
                  setBrandCategoryOpen(false);
                }}
                checked={sortData === "top" ? true : false}
              />
            </label>
          </li>

          <li>
            <label
              htmlFor="new"
              style={{
                backgroundColor: sortData === "new" && "#143642",
                color: sortData === "new" && "#DAD2D8",
              }}
            >
              By New
              <input
                type="radio"
                name="sort"
                id="new"
                onChange={() => {
                  dispatch(setSortData("new"));
                  dispatch(getAllCategoryData());
                  dispatch(setSortIsLoading(true));
                  sortingFunction("new");
                  setCategoryOpen(false);
                  setBrandOpen(false);
                  setBrandCategoryOpen(false);
                }}
                checked={sortData === "new" ? true : false}
              />
            </label>
          </li>
        </ul>
      </div>

      {/* Category */}
      {categoryOpen && (
        <div className="sorting_navigation inner_sorting">
          <h2>Category Names</h2>
          <ul>
            {!categoryIsLoading &&
              categoryData.map((data) => (
                <li key={data.id}>
                  <label
                    htmlFor={data.title}
                    style={{
                      backgroundColor: sortData === data.title && "#143642",
                      color: sortData === data.title && "#DAD2D8",
                    }}
                  >
                    {data.title && data.title}
                    <input
                      type="radio"
                      name="category_child"
                      id={data.title}
                      onChange={() => {
                        dispatch(setSortData(data.title));
                        sortingFunction("category", data.id);
                        dispatch(setSortIsLoading(true));
                      }}
                      value={data.id}
                    />
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Brand */}
      {brandOpen && (
        <div className="sorting_navigation inner_sorting">
          <h2>Brand Names</h2>
          <ul>
            {!brandDataIsLoading &&
              brandData.map((data) => (
                <li key={data.id}>
                  <label
                    htmlFor={data.name}
                    style={{
                      backgroundColor: sortData === data.name && "#143642",
                      color: sortData === data.name && "#DAD2D8",
                    }}
                  >
                    {data.name && data.name}
                    <input
                      type="radio"
                      name="category_child"
                      id={data.name}
                      onChange={() => {
                        dispatch(setSortData(data.name));
                        setBrandCategoryOpen(true);
                        dispatch(
                          getBrandCategoryByBrand({
                            id: data.id,
                          })
                        );
                      }}
                      value={data.id}
                    />
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Brand Category */}
      {brandCategoryOpen && (
        <div className="sorting_navigation inner_sorting">
          <h2>Brand Category Names</h2>
          <ul>
            {!brandCategoryDataIsLoading &&
              brandCategoryData.map((data) => (
                <li key={data.id}>
                  <label
                    htmlFor={data.name}
                    style={{
                      backgroundColor: sortData === data.name && "#143642",
                      color: sortData === data.name && "#DAD2D8",
                    }}
                  >
                    {data.name && data.name}
                    <input
                      type="radio"
                      name="brand_child"
                      id={data.name}
                      onChange={() => {
                        dispatch(setSortIsLoading(true));
                        dispatch(setSortData(data.name));
                        sortingFunction("brand", data.id);
                      }}
                      value={data.id}
                    />
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default AdminProductSorting;
