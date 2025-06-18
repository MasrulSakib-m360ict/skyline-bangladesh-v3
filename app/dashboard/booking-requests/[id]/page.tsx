"use client";
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
} from "@/components/ui/table";
import {
  useFlightBookingRequestCancelMutation,
  useFlightBookingRequestDetailsQuery,
} from "@/redux/api/flight-booking.api";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  flightColumns,
  travelerColumns,
} from "./components/segment-table-columns";

const Page = ({ params }: { params: { id: string } }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  const [flightBookingRequestCancel, { isLoading: delLoading }] =
    useFlightBookingRequestCancelMutation();
  const { data, isLoading } = useFlightBookingRequestDetailsQuery(params.id);

  const flightSegment = data?.data?.segments || [];
  const travelerSegment = data?.data?.travelers || [];
  const pricingData = {
    total_price: data?.data?.total_price,
    base_fair: data?.data?.base_fair,
    total_tax: data?.data?.total_tax,
    customer_price: data?.data?.customer_price,
  };

  const flightTable = useReactTable({
    data: flightSegment,
    columns: flightColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  const travelerTable = useReactTable({
    data: travelerSegment,
    columns: travelerColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCancelBooking = async () => {
    try {
      const res = await flightBookingRequestCancel(params.id).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Booking Cancelled Successfully");
        setIsPopoverOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout className="pb-4">
      <PageLayout.Header className="flex flex-col justify-between w-full gap-2 md:flex-row md:items-end">
        <div className="">
          <h1 className="text-xl font-bold ">Flight Booking Request Details</h1>
          <p>
            This is the details of the Flight Booking Request. You can view the
            details of the request here.
          </p>
        </div>

        <div className="space-x-4">
          {data?.data?.status.toLocaleLowerCase() === "pending" && (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  className="w-full md:w-auto"
                  disabled={delLoading}
                  onClick={() => setIsPopoverOpen(true)}
                >
                  {isLoading ? "Cancelling..." : "Cancel Booking"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" side="right">
                <div className="flex flex-col gap-2">
                  <p className="text-sm">
                    Are you sure you want to cancel this booking?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size={"sm"}
                      variant={"destructive"}
                      onClick={handleCancelBooking}
                      disabled={delLoading}
                    >
                      {delLoading ? "Cancelling..." : "Yes"}
                    </Button>
                    <Button size={"sm"} onClick={() => setIsPopoverOpen(false)}>
                      No
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Button onClick={() => handlePrint()} size={"sm"}>
            Print Details
          </Button>
        </div>
      </PageLayout.Header>
      <PageLayout.Body className="">
        <div ref={contentRef} className="p-4">
          <div className="flex items-end justify-between ">
            <div className="flex flex-col text-sm">
              <div className="grid grid-cols-[auto_min-content_auto] gap-x-2">
                <span>Request ID</span>
                <div className="text-center">:</div>
                <span className="font-bold">{data?.data?.id}</span>

                <span>Journey Type</span>
                <div className="text-center">:</div>
                <span className="font-bold text-red-500">
                  {data?.data?.journey_type}
                </span>

                <span>Status</span>
                <div className="text-center">:</div>
                <span className="font-bold">{data?.data?.status}</span>

                <span>Created At</span>
                <div className="text-center">:</div>
                <span className="font-bold">
                  {dayjs(data?.data?.created_at).format("hh:mm A, DD-MMM-YYYY")}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-sm">
                Booking Date & Time:{" "}
                {dayjs(data?.data?.segments[0]?.departure_date).format(
                  "DD-MMM-YYYY"
                )}
              </span>
            </div>
          </div>
          <div className="pt-10">
            {/* Flight Segment Table */}
            <h2 className="text-md font-bold">Flight Segments</h2>
            <Table className="border mt-2">
              <TableHeader>
                {flightTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={flightTable.getAllColumns().length}
                      className="text-center"
                    >
                      <TableLoading />
                    </TableCell>
                  </TableRow>
                ) : flightTable.getRowModel().rows.length ? (
                  flightTable.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
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
                      colSpan={flightTable.getAllColumns().length}
                      className="text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <h2 className="text-md font-bold mt-4">Traveler Segments</h2>

            <Table className="border mt-2">
              <TableHeader>
                {travelerTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={travelerTable.getAllColumns().length}
                      className="text-center"
                    >
                      <TableLoading />
                    </TableCell>
                  </TableRow>
                ) : travelerTable.getRowModel().rows.length ? (
                  travelerTable.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
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
                      colSpan={travelerTable.getAllColumns().length}
                      className="text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <h2 className="text-md font-bold mt-4">Price Segments</h2>
            <Table className="border mt-2">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">Total Price</TableCell>
                  <TableCell className="font-semibold">Base Fare</TableCell>
                  <TableCell className="font-semibold">Total Tax</TableCell>
                  <TableCell className="font-semibold">
                    Customer Price
                  </TableCell>
                </TableRow>
                <TableRow>
                  {isLoading ? (
                    <TableCell colSpan={4} className="text-center">
                      <TableLoading />
                    </TableCell>
                  ) : (
                    <>
                      <TableCell>{pricingData.total_price}</TableCell>
                      <TableCell>{pricingData.base_fair}</TableCell>
                      <TableCell>{pricingData.total_tax}</TableCell>
                      <TableCell>{pricingData.customer_price}</TableCell>
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
};

export default Page;
