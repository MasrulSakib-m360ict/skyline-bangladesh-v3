import { IVisaApplication } from "@/app/(visa)/_components/visa-application.type";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const visaApplicationColumns: ColumnDef<IVisaApplication>[] = [
  {
    accessorKey: "serialNumber",
    header: "S/N",
    cell: ({ row }) => (
      <span className="text-blue-500 font-bold text-center">
        {row.index + 1}
      </span>
    ),
  },
  {
    accessorKey: "country_code",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country_code")}</div>,
  },
  {
    accessorKey: "category_code",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category_code")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div>
        <div>{row.original.contact_email}</div>
        <div>{row.original.contact_number}</div>
      </div>
    ),
  },
  {
    accessorKey: "departure_date",
    header: "Departure Date",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("departure_date")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "payable",
    header: "Payable",
    cell: ({ row }) => (
      <div>{Number.parseFloat(row.getValue("payable")).toFixed(2)}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <Button variant="link" size="sm" asChild>
          <Link href={`/dashboard/visa-requests/${application.id}`}>
            View Details
          </Link>
        </Button>
      );
    },
  },
];
