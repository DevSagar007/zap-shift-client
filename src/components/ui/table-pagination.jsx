import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE_LIMIT } from "@/hooks/useServerPagination";
import { cn } from "@/lib/utils";

function getPageItems(page, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages]);

  if (page <= 3) {
    [2, 3, 4].forEach((item) => pages.add(item));
  } else if (page >= totalPages - 2) {
    [totalPages - 3, totalPages - 2, totalPages - 1].forEach((item) =>
      pages.add(item),
    );
  } else {
    [page - 1, page, page + 1].forEach((item) => pages.add(item));
  }

  const sortedPages = [...pages].sort((a, b) => a - b);
  const items = [];

  sortedPages.forEach((item, index) => {
    if (index > 0 && item - sortedPages[index - 1] > 1) {
      items.push(`ellipsis-${item}`);
    }

    items.push(item);
  });

  return items;
}

export function TablePagination({
  page = 1,
  totalPages = 1,
  total = 0,
  limit = DEFAULT_PAGE_LIMIT,
  onPageChange,
  className,
}) {
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = total === 0 ? 0 : (safePage - 1) * limit + 1;
  const end = Math.min(safePage * limit, total);

  if (total === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {total} results
      </p>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
          >
            Previous
          </Button>

          {getPageItems(safePage, totalPages).map((item) =>
            typeof item === "string" ? (
              <span key={item} className="px-1 text-sm text-muted-foreground">
                …
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                variant={item === safePage ? "default" : "outline"}
                size="sm"
                className="min-w-8 px-2"
                aria-label={`Go to page ${item}`}
                aria-current={item === safePage ? "page" : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePage >= totalPages}
            onClick={() => onPageChange(safePage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
