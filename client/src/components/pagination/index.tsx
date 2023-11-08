import { ProductsType } from "../../types/product";
import AdminProductTable from "../admin/tables/product";
import ButtonsForPagination from "./buttons";

interface PropTypes {
  products: ProductsType;
  limit: number;
  page: number;
  totalProducts: number;
}

const PaginationProducts: React.FC<PropTypes> = ({
  products,
  limit,
  page,
  totalProducts,
}) => {
  return (
    <main className="pag">
      {/* Display the current page items */}
      <article>
        <AdminProductTable data={products} />
      </article>

      {/* Render pagination controls */}
      <footer>
        <ButtonsForPagination
          totalProducts={totalProducts}
          limit={limit}
          page={page}
        />
      </footer>
    </main>
  );
};

export default PaginationProducts;
