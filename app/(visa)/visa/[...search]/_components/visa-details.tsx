"use client";
import SkeletonLoader from "@/components/skeleton-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IDocumentRequirementResponse,
  IServiceResponse,
  IVisa,
  useVisaListQuery,
} from "@/redux/api/visa.api";
import { ChevronDown, ChevronUp, CreditCard, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { CiPassport1 } from "react-icons/ci";
import { useVisaContext } from "../../../_components/visa-context";
import { ApplicationForm } from "./application-form";

export const VisaDetails = ({
  country_code,
  visaType,
}: {
  country_code: string;
  visaType: string;
}) => {
  const { data, isLoading } = useVisaListQuery(
    [
      { name: "country_code", value: country_code },
      { name: "category_id", value: visaType },
    ],
    {
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: true,
      skip: !country_code || !visaType,
    }
  );
  const {
    visaData,
    selectedVisa,
    setSelectedVisa,
    selectedServices,
    setSelectedServices,
    hasVisaData,
    hasServiceData,
    setIsLoading,
    setData,
  } = useVisaContext();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVisaSelect = (id: number) => {
    setSelectedVisa(id === selectedVisa ? null : id);
  };

  const handleServiceSelect = (id: number) => {
    setSelectedServices(
      selectedServices.includes(id)
        ? selectedServices.filter((serviceId) => serviceId !== id)
        : [...selectedServices, id]
    );
  };

  useEffect(() => {
    setIsLoading(isLoading);
    if (data?.data?.result) {
      setData(data.data?.result);
      const initialOpenItems: Record<string, boolean> = {};
      data.data.result.visas.forEach((visa: IVisa) => {
        initialOpenItems[`visa-${visa.id}`] = true;
      });
      data.data.result.services.forEach((service: IServiceResponse) => {
        initialOpenItems[`service-${service.id}`] = true;
      });
      data.data.result.document_requirements.forEach(
        (doc: IDocumentRequirementResponse) => {
          initialOpenItems[`doc-${doc.id}`] = true;
        }
      );
      setOpenItems(initialOpenItems);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full p-4 space-y-4">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 order-2 lg:order-2">
          <ApplicationForm />
        </div>
        <div className="w-full lg:w-2/3 space-y-8 order-1 lg:order-1">
          <Tabs defaultValue="visa">
            <TabsList className="w-full">
              <TabsTrigger value="visa">
                Visa ({visaData?.visas?.length})
              </TabsTrigger>
              <TabsTrigger value="services">
                Services ({visaData?.services?.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="visa">
              {hasVisaData && (
                <section>
                  {visaData.visas.map((visa) => (
                    <VisaCard
                      key={visa.id}
                      visa={visa}
                      isOpen={openItems[`visa-${visa.id}`]}
                      onToggle={() => toggleItem(`visa-${visa.id}`)}
                      isSelected={selectedVisa === visa.id}
                      onSelect={() => handleVisaSelect(visa.id)}
                    />
                  ))}
                </section>
              )}
            </TabsContent>
            <TabsContent value="services">
              {hasServiceData && (
                <section>
                  {visaData.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isOpen={openItems[`service-${service.id}`]}
                      onToggle={() => toggleItem(`service-${service.id}`)}
                      isSelected={selectedServices.includes(service.id)}
                      onSelect={() => handleServiceSelect(service.id)}
                    />
                  ))}
                </section>
              )}
            </TabsContent>
          </Tabs>

          {!hasVisaData && !hasServiceData && (
            <Card>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  No visa or service information available. Please check back
                  later.
                </p>
              </CardContent>
            </Card>
          )}
          {visaData.documentRequirements.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Document Requirements ({visaData.documentRequirements.length})
              </h2>
              {visaData.documentRequirements.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  isOpen={openItems[`doc-${doc.id}`]}
                  onToggle={() => toggleItem(`doc-${doc.id}`)}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

function VisaCard({
  visa,
  isOpen,
  onToggle,
  isSelected,
  onSelect,
}: {
  visa: IVisa;
  isOpen: boolean;
  onToggle: () => void;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card className="mb-4 border">
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="mr-2" />
            {visa.entry_type} Entry Visa
          </CardTitle>

          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-primary"
              checked={isSelected}
              onCheckedChange={onSelect}
            />
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <CardDescription>
          Validity: {visa.visa_validity} days | Stay: {visa.stay_validity} days
        </CardDescription>
      </CardHeader>
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                Visa Fee: {visa.visa_fee} {visa.currency_code}
              </div>
              <div>
                Processing Fee: {visa.processing_fee} {visa.currency_code}
              </div>
              <div>
                Processing Time: {visa.processing_time_min}-
                {visa.processing_time_max} days
              </div>
              <div>VAT Applicable: {visa.is_vat_applicable ? "Yes" : "No"}</div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function ServiceCard({
  service,
  isOpen,
  onToggle,
  isSelected,
  onSelect,
}: {
  service: IServiceResponse;
  isOpen: boolean;
  onToggle: () => void;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card className="my-4 border">
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2" />
            {service.service_title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Checkbox checked={isSelected} onCheckedChange={onSelect} />
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <CardDescription>{service.service_code}</CardDescription>
      </CardHeader>
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                Service Fee: {service.service_fee} {service.currency_code}
              </div>
              <div>
                VAT Applicable: {service.is_vat_applicable ? "Yes" : "No"}
              </div>
              <div className="col-span-2">
                Description: {service.service_description}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function DocumentCard({
  document,
  isOpen,
  onToggle,
}: {
  document: IDocumentRequirementResponse;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="my-4 border">
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <CiPassport1 className="mr-2" />
            {document.doc_title}
          </CardTitle>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        <CardDescription>{document.doc_code}</CardDescription>
      </CardHeader>
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <CardContent>
            <div>{document.doc_description}</div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
