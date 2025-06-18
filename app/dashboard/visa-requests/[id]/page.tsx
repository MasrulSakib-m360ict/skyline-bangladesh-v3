import VisaApplyDetails from "../_components/visa-apply-details";

type Params = { id: string };
const page = ({ params }: { params: Params }) => {
  return (
    <div>
      <VisaApplyDetails id={params.id} />
    </div>
  );
};

export default page;
