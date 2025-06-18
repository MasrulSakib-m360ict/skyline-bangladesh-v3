import { Card } from "@/components/ui/card";
import siteInfo from "@/config/site.info";

const Policy = () => {
  return (
    <Card className="flex-1 px-6 py-3 mt-4">
      <h3 className="m-0 text-center">Policy</h3>
      <div>
        <p className="text-sm">
          Cancellation Fee ={" Airline's"} Fee + {siteInfo.name}
        </p>
        <p className="text-sm">
          Fee Refund Amount = Paid Amount - Cancellation Fee Re-issue
        </p>
        <p className="text-sm">
          Re-issue Fee ={" Airline's"} Fee + Fare Difference + {siteInfo.name}
        </p>
        <p className="text-sm">
          Fee *The {"airline's"} fee is indicative and per person.
        </p>
        <p>Convenience fee is non-refundable.</p>
      </div>
    </Card>
  );
};

export default Policy;
