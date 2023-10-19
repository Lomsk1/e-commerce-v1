import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../../api/brand/get";
import { Link } from "react-router-dom";

function BrandPage() {
  /* Queries */
  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    retry: 2,
  });

  if (brandQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="brand_page_section">
        <div className="product_container">
          {brandQuery.data?.status === "success" &&
            brandQuery.data.data.map((brand) => (
              <Link to={`${brand.name}/${brand.id}`} key={brand.id}>
                <div>{brand.name}</div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}

export default BrandPage;
