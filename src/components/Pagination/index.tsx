import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  onChange,
}: PaginationProps) {
  if (lastPage <= 1) return null;

  return (
    <div className="join justify-center">
      <button
        className="join-item btn btn-square"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft size={20} />
      </button>

      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            page === currentPage ? "btn-active" : ""
          }`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="join-item btn btn-square"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
