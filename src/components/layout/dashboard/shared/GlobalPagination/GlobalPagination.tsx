"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo } from "react";
type Props = {
  className: string;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  selectedCount: number; // Add this prop
  totalCount: number; // Add this prop
};

export function GlobalPagination({
  className,
  currentPage,
  totalPages,
  handlePageChange,
  selectedCount, // Destructure
  totalCount, // Destructure
}: Props) {
  const visiblePages = useMemo(() => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page !== currentPage) {
      handlePageChange(page);
    }
  };

  return (
    <div className="mt-3 flex sm:items-center items-center gap-4 sm:gap-0 flex-col sm:flex-row sm:justify-between">
      <div className="flex-1 text-sm text-muted-foreground text-nowrap">
        {selectedCount} of {totalCount} data selected
      </div>
      <Pagination className={className}>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                if (currentPage === 1) {
                  e.preventDefault();
                  return;
                }
                handleClick(e, currentPage - 1);
              }}
              className={
                currentPage === 1
                  ? "cursor-not-allowed hover:bg-transparent"
                  : ""
              }
            />
          </PaginationItem>

          {/* First Page + Left Ellipsis */}
          {visiblePages[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={(e) => handleClick(e, 1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {visiblePages[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {/* Visible Pages */}
          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => handleClick(e, page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Right Ellipsis + Last Page */}
          {visiblePages.at(-1)! < totalPages && (
            <>
              {visiblePages.at(-1)! < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === totalPages}
                  onClick={(e) => handleClick(e, totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (currentPage === totalPages) {
                  e.preventDefault();
                  return;
                }
                handleClick(e, currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "cursor-not-allowed hover:bg-transparent"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
