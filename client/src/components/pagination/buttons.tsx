import { useNavigate } from "react-router-dom";

interface PropsTypes {
  totalProducts: number;
  limit: number;
  page: number;
}

const ButtonsForPagination: React.FC<PropsTypes> = ({
  totalProducts,
  limit,
  page,
}) => {
  const router = useNavigate();

  /* Calculate the total number of pages */
  const totalPages = Math.ceil(totalProducts / limit);

  /* Handle page change */
  const handlePageChange = (PrevPage: number) => {
    if (limit) {
      router(`/admin/product?page=${PrevPage}&limit=${limit}`, {
        replace: true,
      });
    }
  };

  return (
    <>
      {/* Render previous page button if not on the first page */}
      {page > 1 && (
        <button onClick={() => handlePageChange(page - 1)}>&#8249;</button>
      )}

      {/* Render page buttons */}
      {totalProducts &&
        Array.from({ length: totalPages }, (_, index) => {
          // Display a range of page numbers with ellipsis
          const currentPage = index + 1;
          const showPage =
            currentPage === page ||
            currentPage === 1 ||
            currentPage === totalPages ||
            (currentPage >= page - 1 && currentPage <= page + 1);

          if (!showPage) {
            return <div key={currentPage} className="ellipsis"></div>;
          }

          return (
            <button
              className="butt"
              key={currentPage}
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage === page}
            >
              {currentPage}
            </button>
          );
        })}

      {/* Render next page button if not on the last page */}
      {page < totalPages && (
        <button onClick={() => handlePageChange(page + 1)}>&#8250;</button>
      )}
    </>
  );
};

export default ButtonsForPagination;
