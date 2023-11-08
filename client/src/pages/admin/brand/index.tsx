import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../../../api/brand/get";
import AdminBrandTable from "../../../components/admin/tables/brand";
import AdminBrandForm from "../../../components/admin/forms/brand";
import { getAllCategory } from "../../../api/category/cateogry";
import useCategoryStore from "../../../store/client/category/category";

function AdminBrand() {
  /* Queries */
  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    retry: 1,
  });

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
    retry: 1,
  });

  const setCategories = useCategoryStore((state) => state.setCategories);

  if (brandQuery.isLoading) {
    return <div>Loading ... </div>;
  }

  if (categoryQuery.data) {
    setCategories(categoryQuery.data);
  }

  return (
    <>
      {brandQuery.data?.status === "success" && (
        <>
          {/* Table */}
          <AdminBrandTable data={brandQuery.data} />

          {/* Branch Forms */}
          <AdminBrandForm />
        </>
      )}
    </>
  );
}

export default AdminBrand;
