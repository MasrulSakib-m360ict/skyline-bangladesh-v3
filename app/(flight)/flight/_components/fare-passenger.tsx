import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPassenger } from "@/types/type.flight";
import { formatNumber } from "@/utils/date-time-formatter";

const FarePassenger = ({ passengers }: { passengers: IPassenger[] }) => {
  return (
    <div className="basis-3/4 items-center justify-center dark:border-gray-700">
      <h3 className="dark:text-primary-light mb-2 text-center text-[16px] font-bold text-primary">
        Passenger Fare
      </h3>

      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Type
            </TableHead>
            <TableHead className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Base Fare
            </TableHead>
            <TableHead className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Tax
            </TableHead>
            <TableHead className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Total Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-800">
          {passengers?.map((passenger, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap px-2 py-3 dark:text-gray-100">
                {passenger?.type} <span>({passenger?.number})</span>
              </TableCell>
              <TableCell className="whitespace-nowrap px-2 py-3 dark:text-gray-100">
                <span className="font-mono text-sm">৳</span>{" "}
                {formatNumber(passenger?.fare.base_fare)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-2 py-3 dark:text-gray-100">
                <span className="font-mono text-sm">৳</span>{" "}
                {formatNumber(passenger?.fare.tax)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-2 py-3 dark:text-gray-100">
                <span className="font-mono text-sm">৳</span>{" "}
                {formatNumber(passenger?.fare.total_fare)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FarePassenger;
