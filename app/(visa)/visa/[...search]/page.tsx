import { Grid } from "@/app/(root)/_components/memories";
import Container from "@/components/container";
import { validateVisaParams } from "../../_components/validator";
import { VisaProvider } from "../../_components/visa-context";
import VisaForm from "../../_components/visa-form";
import { VisaDetails } from "./_components/visa-details";

const page = ({ params }: { params: { search: string[] } }) => {
  let countryId, countryName, visaTypeId, visaTypeName, country, visaType;

  ({ countryId, countryName, visaTypeId, visaTypeName, country, visaType } =
    validateVisaParams(params.search));
  return (
    <VisaProvider>
      <div className="header">
        <Container className="h-60 flex items-end justify-start">
          <div className="h-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white capitalize">
              {countryName} - {visaTypeName}
            </h1>
          </div>
        </Container>
      </div>
      <div className="overflow-hidden w-full relative">
        <Grid size={35} />
        <Container className="py-10">
          <VisaForm
            defaultValues={{
              country,
              visaType,
            }}
          />
        </Container>
      </div>

      <Container className="">
        <VisaDetails country_code={countryId} visaType={visaTypeId} />
      </Container>
    </VisaProvider>
  );
};

export default page;
