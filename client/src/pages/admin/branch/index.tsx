import { useQuery } from "@tanstack/react-query";
import { getAllBranch } from "../../../api/branch/get";
import AdminBranchTable from "../../../components/admin/tables/branch";
import AdminBranchForm from "../../../components/admin/forms/branch";

function AdminBranch() {
  /* Queries */
  const branchQuery = useQuery({
    queryKey: ["branch"],
    queryFn: getAllBranch,
    retry: 1,
  });

  if (branchQuery.isLoading) {
    return <div>Loading ... </div>;
  }

  return (
    <>
      {branchQuery.data?.status === "success" && (
        <>
          {/* Table */}
          <AdminBranchTable data={branchQuery.data} />

          {/* Branch Forms */}
          <AdminBranchForm />
        </>
      )}
    </>
  );
}

export default AdminBranch;
