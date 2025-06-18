import {
  IBookingRequestDetailsSegment,
  IBookingRequestDetailsTraveler,
} from "@/types/booking-requrst";
import { ColumnDef } from "@tanstack/react-table";

const travelerColumns: ColumnDef<IBookingRequestDetailsTraveler>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: ({ row }) => <span className="text-center">{row.index + 1}</span>,
  },
  {
    accessorFn: (row) =>
      `${row.title} - ${row.first_name} ${row.last_name}  (${row.type})`,
    id: "reference_full_name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("reference_full_name")}</span>
    ),
  },
  {
    accessorFn: (row) => (
      <>
        <div>Number: {row.passport_number || "N/A"}</div>
        <div>
          Expiry:{" "}
          {row.passport_expiry_date
            ? new Date(row.passport_expiry_date).toLocaleDateString()
            : "N/A"}
        </div>
      </>
    ),
    id: "passport_info",
    header: "Passport Information",
    cell: ({ row }) => <span>{row.getValue("passport_info")}</span>,
  },

  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div>
        <span>{row.original.phone}</span>
        <br />
        <span>{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    cell: ({ row }) => (
      <span>
        {new Date(row.getValue("date_of_birth")).toLocaleDateString()}
      </span>
    ),
  },
  // {
  //   accessorKey: "type",
  //   header: "Type",
  //   cell: ({ row }) => <span>{row.getValue("type")}</span>,
  // },
  {
    accessorKey: "issuing_country",
    header: "Issuing Country",
    cell: ({ row }) => <span>{row.getValue("issuing_country") || "N/A"}</span>,
  },
  // {
  //   accessorKey: "nationality",
  //   header: "Nationality",
  //   cell: ({ row }) => <span>{row.getValue("nationality")}</span>,
  // },
  {
    accessorFn: (row) => (
      <>
        <div>Name: {row.frequent_flyer_airline || "N/A"}</div>
        <div>Number: {row.frequent_flyer_number || "N/A"}</div>
      </>
    ),
    id: "frequent_flyer_info",
    header: "Frequent Flyer",
    cell: ({ row }) => <span>{row.getValue("frequent_flyer_info")}</span>,
  },
];

// Flight Segment Columns
const flightColumns: ColumnDef<IBookingRequestDetailsSegment>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "flight_number",
    header: "Flight Number",
  },
  {
    accessorKey: "airline",
    header: "Airline",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorFn: (row) => new Date(row.departure_date).toLocaleString(),
    id: "departure_date",
    header: "Departure Date",
    cell: ({ row }) => <span>{row.getValue("departure_date")}</span>,
  },
  {
    accessorFn: (row) => new Date(row.arrival_date).toLocaleString(),
    id: "arrival_date",
    header: "Arrival Date",
    cell: ({ row }) => <span>{row.getValue("arrival_date")}</span>,
  },
];

// Pricing Segment Columns
const pricingColumns: ColumnDef<any>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => <span>{row.getValue("total_price")}</span>,
  },
  {
    accessorKey: "base_fair",
    header: "Base Fare",
    cell: ({ row }) => <span>{row.getValue("base_fair")}</span>,
  },
  {
    accessorKey: "total_tax",
    header: "Total Tax",
    cell: ({ row }) => <span>{row.getValue("total_tax")}</span>,
  },
  {
    accessorKey: "customer_price",
    header: "Customer Price",
    cell: ({ row }) => <span>{row.getValue("customer_price")}</span>,
  },
];

export { flightColumns, pricingColumns, travelerColumns };
