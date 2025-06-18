import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPassenger } from "@/types/type.flight";

type Props = {
  passengers: IPassenger[];
};

const Baggages = ({ passengers }: Props) => {
  const routes = Array.from(
    new Set(
      passengers?.flatMap((passenger) =>
        passenger?.availability.map(
          (availability) =>
            `${availability?.from_airport} TO ${availability?.to_airport}`
        )
      )
    )
  );

  return (
    <div className="rounded-lg bg-white  shadow-md dark:bg-gray-900 dark:text-gray-100">
      {routes.map((route) => {
        const [fromAirport, toAirport] = route.split(" TO ");

        return (
          <div key={route} className="mb-1">
            <h4 className="text-sm font-semibold  pt-2 ml-2">
              {fromAirport} → {toAirport}
            </h4>
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Passenger
                  </TableHead>
                  <TableHead className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Count
                  </TableHead>
                  <TableHead className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Unit
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {passengers.map((passenger, index) =>
                  passenger.availability
                    .filter(
                      (availability) =>
                        availability.from_airport === fromAirport &&
                        availability.to_airport === toAirport
                    )
                    .map((availability, aIndex) => (
                      <TableRow key={`${index}-${aIndex}`}>
                        <TableCell className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {passenger.type}
                          <span> ({passenger.number})</span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap px-2 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {availability.baggage.count}
                        </TableCell>
                        <TableCell className="whitespace-nowrap px-2 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {availability.baggage.unit}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};

export default Baggages;
