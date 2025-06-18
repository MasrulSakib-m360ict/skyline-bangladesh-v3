import { cn } from "@/lib/utils";
import { IFare } from "@/types/type.flight";
import { formatNumber } from "@/utils/date-time-formatter";

const FareSummary = ({
  className,
  fare,
}: {
  className?: string;
  fare: IFare;
}) => {
  const fareDetails = [
    { label: "Base Fare", value: fare?.base_fare },
    { label: "Tax", value: fare?.total_tax },
    { label: "AIT", value: fare?.ait },
    { label: "Total Price", value: fare?.total_price },
    { label: "Discount", value: fare?.discount },
    { label: "Total Amount", value: fare?.payable },
  ];
  return (
    <div>
      <div className="flex flex-col p-2 min-w-72 w-full">
        <h3 className="text-sm font-bold text-center dark:text-primary-light text-primary mb-3 ">
          Total Fare Summary
        </h3>
        <div className={cn("flex flex-col ")}>
          {fareDetails.map((item, index) => (
            <div key={index}>
              <div
                className={cn(
                  "flex justify-between",
                  item.label === "Total Amount" &&
                    "dark:text-primary-light font-bold text-primary"
                )}
              >
                <span>{item.label}</span>
                <span>৳ {formatNumber(item.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FareSummary;
