import { useQuery } from "@tanstack/react-query";
import PaginationProducts from "../../../components/pagination";
import {
  getAllProductByParams,
  getProductById,
  getProductsStats,
} from "../../../api/products/get";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import AdminProductForm from "../../../components/admin/forms/product";
import { getAllBrands } from "../../../api/brand/get";
import { getAllCategory } from "../../../api/category/cateogry";
import AdminProductMoreInfoTable from "../../../components/admin/tables/prodMore";
import useAdminProductStore from "../../../store/admin/product";
import AdminProductMoreForm from "../../../components/admin/forms/product/more";
import AdminProductSpecTable from "../../../components/admin/tables/prodSpec";

function AdminProduct() {
  /* Navigate */
  const [searchParams] = useSearchParams();

  /* States */
  const { forMoreProductId, moreProductAddFormId, specificationsProductId } =
    useAdminProductStore((state) => state);

  /* Queries */
  const productQuery = useQuery(
    ["products"],
    () =>
      getAllProductByParams({
        searchParams: `?page=${searchParams.get(
          "page"
        )}&limit=${searchParams.get("limit")}`,
      }),
    {
      retry: 2,
      enabled: true,
    }
  );

  const productOneQuery = useQuery(
    ["product"],
    () =>
      getProductById({
        id: forMoreProductId!,
      }),
    {
      retry: 2,
      enabled: !!forMoreProductId,
    }
  );

  const productStatsQuery = useQuery({
    queryKey: ["productStats"],
    queryFn: getProductsStats,
    retry: 2,
    enabled: true,
  });

  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    retry: 2,
    enabled: true,
  });

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
    retry: 2,
    enabled: true,
  });

  useEffect(() => {
    productOneQuery.refetch();
  }, [forMoreProductId, productOneQuery]);

  // Use useEffect to watch for changes in searchParams
  useEffect(() => {
    productQuery.refetch();
  }, [productQuery, searchParams]);

  if (productQuery.isLoading) {
    return <div>Loading ... </div>;
  }

  return (
    <>
      {productQuery.data?.status === "success" && (
        <>
          <PaginationProducts
            products={productQuery.data}
            limit={Number(searchParams.get("limit"))}
            page={Number(searchParams.get("page"))}
            totalProducts={
              productStatsQuery.isSuccess ? productStatsQuery.data.total : 0
            }
          />
          {/* Table */}

          {/* Product Forms */}
          {forMoreProductId && productOneQuery.isSuccess && (
            <>
              <AdminProductMoreInfoTable data={productOneQuery.data} />
              {moreProductAddFormId && <AdminProductMoreForm />}
            </>
          )}

          {specificationsProductId && productOneQuery.isSuccess && (
            <AdminProductSpecTable
              data={productOneQuery.data.data.specifications}
              statusData={productOneQuery.data.status}
            />
          )}

          {!forMoreProductId && !specificationsProductId && (
            <AdminProductForm
              brands={brandQuery?.data}
              categories={categoryQuery?.data}
            />
          )}
        </>
      )}
    </>
  );
}

export default AdminProduct;
