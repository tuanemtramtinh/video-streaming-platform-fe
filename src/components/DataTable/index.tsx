import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
} from "@tanstack/react-table";

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];

  pagination: PaginationState;

  pageCount: number;

  onPaginationChange: OnChangeFn<PaginationState>;

  onRowClick?: (row: T) => void;
};

export function DataTable<T>({
  columns,
  data,
  pagination,
  onPaginationChange,
  pageCount,
  onRowClick,
}: DataTableProps<T>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,

    state: {
      pagination,
    },

    onPaginationChange,

    manualPagination: true,

    pageCount,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-1 overflow-x-auto">
        <table className="border-border table border bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-background cursor-pointer"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join mt-6 w-full justify-center">
        <button
          className="join-item btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>

        {Array.from({ length: table.getPageCount() }).map((_, i) => (
          <button
            key={i}
            className={`join-item btn ${
              table.getState().pagination.pageIndex === i ? "btn-active" : ""
            }`}
            onClick={() => table.setPageIndex(i)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="join-item btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
