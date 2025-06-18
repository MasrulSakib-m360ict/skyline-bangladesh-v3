import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAppliedVisa } from "@/redux/api/visa.api";

export function VisaDetails({ visa }: { visa: IAppliedVisa }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Visa Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Country</p>
            <p className="font-medium">{visa.country_code}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entry Type</p>
            <Badge variant="secondary">{visa.entry_type}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Visa Fee</p>
            <p className="font-medium">
              {visa.visa_fee} {visa.currency_code}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Processing Fee</p>
            <p className="font-medium">
              {visa.processing_fee} {visa.currency_code}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Processing Time</p>
            <p className="font-medium">
              {visa.processing_time_min}-{visa.processing_time_max} days
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Validity</p>
            <p className="font-medium">
              {visa.stay_validity} days stay, {visa.visa_validity} days visa
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
