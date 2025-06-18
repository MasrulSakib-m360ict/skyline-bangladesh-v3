import { useVisaApplyInfoQuery } from "@/redux/api/visa.api";
import { PayableSummary } from "./payable-summary";
import { ServiceList } from "./service-list";
import TravelerForm from "./traveler-form";
import { VisaDetails } from "./visa-details";

type Visa = string;
type Services = string;
type Passenger = {
  type: string;
  number: number;
}[];

const VisaApplyDetails = ({
  visa,
  services,
  passenger,
}: {
  visa?: Visa;
  passenger: Passenger;
  services?: Services;
}) => {
  const { data, isLoading } = useVisaApplyInfoQuery([
    { name: "visa", value: visa },
    { name: "services", value: services },
  ]);

  if (isLoading) return <div>Loading...</div>;

  if (!data?.data) return <div>No data found</div>;
  return (
    <>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-2/3 space-y-6">
          <VisaDetails visa={data?.data?.applied_visa} />
          <ServiceList services={data.data.applied_services} />
        </div>
        <div className="w-full xl:w-1/3">
          <div className="sticky top-16">
            <PayableSummary
              appliedVisa={data?.data?.applied_visa}
              appliedServices={data?.data?.applied_services}
              totalPayable={data?.data?.total_payable}
              passengers={passenger.filter((p) => p.number > 0)}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <TravelerForm passengers={passenger} data={data?.data || []} />
      </div>
    </>
  );
};

export default VisaApplyDetails;
