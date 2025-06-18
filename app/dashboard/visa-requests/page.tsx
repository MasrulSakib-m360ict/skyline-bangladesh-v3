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
import { useVisaApplyListQuery } from "@/redux/api/visa.api";
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
import { visaApplicationColumns } from "./_components/visa-apply-list-columns";

const page = () => {
  const [status, setStatus] = useState<string | null>(null);
  const { data, isLoading } = useVisaApplyListQuery([
    { name: "status", value: status },
  ]);

  const table = useReactTable({
    data: data?.data || [],
    columns: visaApplicationColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-xl font-bold ">Visa Booking Request List</h1>
        <p>
          This is the list of all Visa Booking Requests. You can filter and
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
                  <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                  <SelectItem value="APPROVED">APPROVED</SelectItem>
                  <SelectItem value="REJECTED">REJECTED</SelectItem>
                  <SelectItem value="COLLECTED">COLLECTED</SelectItem>
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
