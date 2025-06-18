import { Button } from "@/components/ui/button";
import { IBookingRequest, ISegment } from "@/types/booking-requrst";
import { imageUrl } from "@/utils/image-url";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { TbListDetails } from "react-icons/tb";

export const bookingRequestColumns: ColumnDef<IBookingRequest>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: ({ row }) => (
      <span className="text-blue-500 font-bold text-center">
        {row.index + 1}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Booking Date",
    cell: ({ row }) => (
      <span>{new Date(row.getValue("created_at")).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "journey_type",
    header: "Journey Type",
    cell: ({ row }) => <span>{row.getValue("journey_type")}</span>,
  },
  {
    accessorFn: (row) =>
      row.segments?.map((segment) => ({
        airline: segment.airline,
        airline_logo: segment.airline_logo,
        origin: segment.origin,
        destination: segment.destination,
        class: segment.class,
        departure_date: dayjs(segment.departure_date).format("YYYY-MM-DD"),
        arrival_date: dayjs(segment.arrival_date).format("YYYY-MM-DD "),
      })),
    id: "segments",
    header: "Flight Segments",
    cell: ({ row }) => {
      const segments = row.getValue("segments") as ISegment[];
      return (
        <div className="space-y-4">
          {segments &&
            segments.map((segment, index) => (
              <div key={index} className="">
                <p className="flex gap-2 mb-1">
                  <Image
                    src={imageUrl(segment.airline_logo)}
                    alt={"segment.airline"}
                    width={20}
                    height={20}
                  />
                  {segment.airline} - {segment.class}
                </p>
                <div className="flex gap-4">
                  <p>
                    {segment.origin} - {segment.destination}
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="">
                    {segment.departure_date} --- {segment.arrival_date}
                  </p>
                </div>
              </div>
            ))}
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-bold">{row.getValue("price")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <span>{row.getValue("status")}</span>;
    },
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      return <span>{row.getValue("note")}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Button variant={"link"} size={"sm"} className="btn btn-sm btn-primary">
          <Link href={`/dashboard/booking-requests/${row.original.id}`}>
            <TbListDetails className="text-blue-400 text-xl" />
          </Link>
        </Button>
      );
    },
  },
];
