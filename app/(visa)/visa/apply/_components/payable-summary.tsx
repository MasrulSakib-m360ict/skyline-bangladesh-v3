import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { travelerTypeFormatter } from "@/utils/formatter";

type Service = {
  service_title: string;
  service_fee: string;
};

type AppliedVisa = {
  visa_fee: string;
  processing_fee: string;
  currency_code: string;
};

interface PayableSummaryProps {
  appliedVisa?: AppliedVisa;
  appliedServices?: Service[];
  totalPayable?: number;
  passengers?: Passenger;
}

type Passenger = {
  type: string;
  number: number;
}[];

export function PayableSummary({
  appliedVisa,
  appliedServices = [],
  totalPayable = 0,
  passengers = [],
}: PayableSummaryProps) {
  if (!appliedVisa) {
    return (
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No visa information available.</p>
        </CardContent>
      </Card>
    );
  }

  const totalPassengers = passengers.reduce((sum, p) => sum + p.number, 0) || 1;
  const currency = appliedVisa.currency_code || "";

  const calculateTotalFee = (fee: string) => {
    return (Number.parseFloat(fee || "0") * totalPassengers).toFixed(2);
  };

  const passengerSummary =
    passengers.length > 0
      ? passengers
          .map((p) => `${p.number} ${travelerTypeFormatter(p.type)}`)
          .join(", ")
      : "1 Passenger";

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
        <p className="text-sm mt-1">For: {passengerSummary}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Visa Fee:</span>
            <span>
              {calculateTotalFee(appliedVisa.visa_fee)} {currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Processing Fee:</span>
            <span>
              {calculateTotalFee(appliedVisa.processing_fee)} {currency}
            </span>
          </div>
          {appliedServices.length > 0 && (
            <>
              <Separator className="my-2 bg-primary-foreground/20" />
              {appliedServices.map((service) => (
                <div
                  key={service.service_title}
                  className="flex justify-between"
                >
                  <span>{service.service_title}:</span>
                  <span>
                    {calculateTotalFee(service.service_fee)} {currency}
                  </span>
                </div>
              ))}
            </>
          )}
          <Separator className="my-2 bg-primary-foreground/20" />
          <div className="space-y-2 text-lg font-bold">
            <div className="flex justify-between">
              <span>Total Payable:</span>
              <span>
                {totalPayable.toLocaleString()} {currency}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Grand Total:</span>
              <span>
                {(
                  Number.parseFloat(calculateTotalFee(appliedVisa.visa_fee)) +
                  Number.parseFloat(
                    calculateTotalFee(appliedVisa.processing_fee)
                  ) +
                  appliedServices.reduce(
                    (sum, service) =>
                      sum + Number.parseFloat(service.service_fee),
                    0
                  ) +
                  totalPayable
                ).toLocaleString()}{" "}
                {currency}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
