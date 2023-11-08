import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../api/category/cateogry";
import AdminCategoryTable from "../../../components/admin/tables/category";
import AdminCategoryForm from "../../../components/admin/forms/category";

function AdminCategory() {
  /* Queries */
  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
    retry: 1,
  });

  if (categoryQuery.isLoading) {
    return <div>Loading ... </div>;
  }

  return (
    <>
      {categoryQuery.data?.status === "success" && (
        <>
          {/* Table */}
          <AdminCategoryTable data={categoryQuery.data} />

          {/* Branch Forms */}
          <AdminCategoryForm />
        </>
      )}
    </>
  );
}

export default AdminCategory;
