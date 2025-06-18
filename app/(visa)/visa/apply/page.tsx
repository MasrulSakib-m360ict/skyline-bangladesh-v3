"use client";
import Container from "@/components/container";
import { VisaProvider } from "../../_components/visa-context";
import VisaApplyDetails from "./_components/visa-apply-details";

export type SearchParams = {
  visa: string;
  services: string;
  departureDate: string;
  adult: string;
  child: string;
  kid: string;
  infant: string;
};

const page = ({ searchParams }: { searchParams: SearchParams }) => {
  const passenger = [
    {
      type: "ADT",
      number: Number(searchParams.adult),
    },
    {
      type: "C11",
      number: Number(searchParams.child),
    },
    {
      type: "C05",
      number: Number(searchParams.kid),
    },
    {
      type: "INF",
      number: Number(searchParams.infant),
    },
  ];

  const visa = searchParams.visa;
  const services = searchParams.services;

  return (
    <div>
      <VisaProvider>
        <div className="header">
          <Container className="h-60 flex items-end justify-start">
            <div className="h-20">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white capitalize">
                Visa Application Summary
              </h1>
            </div>
          </Container>
        </div>
        <div className=" relative">
          <Container className="py-10">
            <VisaApplyDetails
              visa={visa}
              services={services}
              passenger={passenger}
            />
          </Container>
        </div>
      </VisaProvider>
    </div>
  );
};

export default page;
