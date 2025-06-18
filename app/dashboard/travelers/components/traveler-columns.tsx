"use client";

import { ITraveler } from "@/types/traveler";
import { ColumnDef } from "@tanstack/react-table";

export const travelerColumns: ColumnDef<ITraveler>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: ({ row }) => <span className=" text-center">{row.index + 1}</span>,
  },
  {
    accessorFn: (row) => `${row.reference} - ${row.first_name} ${row.sur_name}`,
    id: "reference_full_name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium ">
        {row.getValue("reference_full_name")}
      </span>
    ),
  },
  {
    accessorFn: (row) => (
      <>
        <div>Number: {row.passport_number || "N/A"}</div>
        <div>
          Expiry:{" "}
          {row.passport_expire_date
            ? new Date(row.passport_expire_date).toLocaleDateString()
            : "N/A"}
        </div>
      </>
    ),
    id: "passport_info",
    header: "Passport Information",
    cell: ({ row }) => (
      <span className="">{row.getValue("passport_info")}</span>
    ),
  },
  {
    accessorFn: (row) => (
      <>
        <div>Name: {row.frequent_flyer_airline || "N/A"}</div>
        <div>Number: {row.frequent_flyer_number || "N/A"}</div>
      </>
    ),
    id: "frequent_flyer_info",
    header: "Frequent Flyer ",
    cell: ({ row }) => (
      <span className="">{row.getValue("frequent_flyer_info")}</span>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div>
        <span className="">{row.original.phone}</span>
        <br />
        <span className="">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    cell: ({ row }) => (
      <span className="">
        {new Date(row.getValue("date_of_birth")).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: " Type",
    cell: ({ row }) => <span className="">{row.getValue("type")}</span>,
  },
  {
    accessorKey: "country_name",
    header: "Issuing Country",
    cell: ({ row }) => (
      <span className="">{row.getValue("country_name") || "N/A"}</span>
    ),
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
    cell: ({ row }) => <span className="">{row.getValue("nationality")}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <div className=" ">Actions</div>,
  },
];
