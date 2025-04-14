import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalData: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalData,
  limit,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      pages.push(i);
    }
    return pages;
  };

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalData);

  return (
    <div className="p-4 flex justify-between items-center border-t border-gray-800">
      <div className="text-gray-400 text-sm">
        Showing {start}-{end} of {totalData} users
      </div>

      <div className="flex space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-item flex items-center justify-center w-9 h-9 border border-opacity-20 border-neon-blue hover:border-neon-blue hover:text-neon-blue transition duration-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-item flex items-center justify-center w-9 h-9 border border-opacity-20 border-neon-blue ${
              currentPage === page
                ? "bg-opacity-20 bg-neon-blue  neon-text border-neon-blue "
                : "hover:border-neon-blue hover:text-neon-blue transition duration-300"
            }`}
          >
            {page}
          </button>
        ))}

        {totalPages > 5 && (
          <button className="pagination-item flex items-center justify-center w-9 h-9 border border-opacity-20 border-neon-blue hover:border-neon-blue hover:text-neon-blue transition duration-300">
            <FaEllipsisH />
          </button>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-item flex items-center justify-center w-9 h-9 border border-opacity-20 border-neon-blue hover:border-neon-blue hover:text-neon-blue transition duration-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};
