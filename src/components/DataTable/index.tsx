import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  PaginationState,
  getExpandedRowModel,
  ExpandedState
} from "@tanstack/react-table";
import { ChevronDown, Filter, Search } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ITEMS_PER_PAGE } from "@/constants/appConfig";
import Pagenation from "@/components/Pagenation";
import { TableBaseType } from "@/types/tablebase";

interface DataTableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: TableBaseType<T>[];
  searchPlaceholder: string;
}

const DataTable = <T extends object>({ columns, data, searchPlaceholder }: DataTableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE
  });
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable<TableBaseType<T>>({
    data,
    columns,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getSubRows: row => row.children,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      pagination,
      expanded
    },
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: false,
    manualFiltering: false
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        {/* Filters */}
        <div className="flex gap-2">
          {table
            .getAllColumns()
            .filter(column => column.getCanFilter())
            .map(filteredColumn => (
              <DropdownMenu key={filteredColumn.id}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto max-w-sm h-8 text-xs capitalize">
                    <Filter size={6} className="text-gray-500" />
                    {filteredColumn.id}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuCheckboxItem
                    className="capitalize text-xs"
                    checked={table.getState().columnFilters.length === 0}
                    onClick={() => table.setColumnFilters([])}
                  >
                    all
                  </DropdownMenuCheckboxItem>
                  {[...new Set(data.map((row: any) => row[filteredColumn.id]))].map(filterData => (
                    <DropdownMenuCheckboxItem
                      key={filterData}
                      className="capitalize text-xs"
                      checked={table.getState().columnFilters.some(state => state.id === filteredColumn.id && state.value === filterData)}
                      onClick={() =>
                        table.setColumnFilters(prevFilters => [
                          ...prevFilters.filter(filter => filter.id != filteredColumn.id),
                          { id: filteredColumn.id, value: filterData }
                        ])
                      }
                    >
                      {filterData}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            placeholder={searchPlaceholder}
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={event => {
              setGlobalFilter(String(event.target.value));
            }}
            className="max-w-sm pl-10 h-8 text-sm w-96"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={14} />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
      <Pagenation
        currentPage={table.getState().pagination.pageIndex + 1}
        totalItems={table.getFilteredRowModel().rows.length}
        itemsPerPage={table.getState().pagination.pageSize}
        setPageIndex={table.setPageIndex}
        handlePrev={table.previousPage}
        getCanPreviousPage={table.getCanPreviousPage}
        handleNext={table.nextPage}
        getCanNextPage={table.getCanNextPage}
      />
    </div>
  );
};

export default DataTable;
