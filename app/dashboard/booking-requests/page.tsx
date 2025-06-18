"use client";
import { DataTablePagination } from "@/components/data-table-pagination";
import PageLayout from "@/components/page-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
} from "@/components/ui/table";
import { useFlightBookingRequestListQuery } from "@/redux/api/flight-booking.api";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { bookingRequestColumns } from "./_components/booking-request-columns";

const page = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const skip = (pagination.page - 1) * pagination.pageSize;

  const { data, isLoading } = useFlightBookingRequestListQuery([
    { name: "status", value: status },
  ]);

  const table = useReactTable({
    data: data?.data || [],
    columns: bookingRequestColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-xl font-bold ">Flight Booking Request List</h1>
        <p>
          This is the list of all Flight Booking Requests. You can filter and
          search to get the desired result
        </p>
      </PageLayout.Header>

      <PageLayout.Body>
        <div className="p-4 mb-4">
          <div className="mb-4 flex justify-between">
            <div className="">
              <Select onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-full flex-1 flex-col  relative mb-4 ">
            <Table className="border rounded ">
              <TableHeader className="">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className="text-center"
                    >
                      <TableLoading />
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows?.map((row, i) => (
                    <TableRow
                      key={i}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
};

export default page;
