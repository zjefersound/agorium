import clsx from "clsx";
import { ReactNode, memo } from "react";

interface PaginationButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}

const PaginationButton = memo(
  ({
    children,
    className,
    active,
    disabled,
    onClick,
  }: PaginationButtonProps) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          "flex items-center justify-center px-3 h-8 leading-tight border border-agorium-600 disabled:pointer-events-none",
          "first:rounded-l-md last:rounded-r-md",
          className,
          {
            "bg-amber-100 text-agorium-900 hover:bg-amber-50": active,
            "text-agorium-400 bg-agorium-700 hover:bg-agorium-600": !active,
          },
        )}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </button>
    );
  },
);

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (n: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  setPage,
}: PaginationProps) {
  if (totalPages < 1 || currentPage < 1 || currentPage > totalPages) {
    console.error("Invalid pagination state.");
    return null;
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const OFFSET = 1;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - OFFSET, 1);
    const endPage = Math.min(currentPage + OFFSET, totalPages);

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <div className="inline-flex -space-x-px text-sm">
      <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </PaginationButton>
      {pages[0] !== 1 && (
        <>
          <PaginationButton className="min-w-12" onClick={() => setPage(1)}>
            1
          </PaginationButton>
          {pages[0] !== 2 && <PaginationButton disabled>...</PaginationButton>}
        </>
      )}
      {pages.map((page) => (
        <PaginationButton
          key={page}
          className="min-w-12"
          onClick={() => setPage(page)}
          active={page === currentPage}
        >
          {page}
        </PaginationButton>
      ))}
      {pages[pages.length - 1] !== totalPages && (
        <>
          {pages[pages.length - 1] !== totalPages - 1 && (
            <PaginationButton disabled>...</PaginationButton>
          )}
          <PaginationButton
            className="min-w-12"
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </PaginationButton>
        </>
      )}
      <PaginationButton
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
    </div>
  );
}
