"use client";
import {
  IDocumentRequirementResponse,
  IServiceResponse,
  IVisa,
} from "@/redux/api/visa.api";
import { createContext, useContext, useState, type ReactNode } from "react";

interface IDatatype {
  visas?: IVisa[];
  services?: IServiceResponse[];
  document_requirements?: IDocumentRequirementResponse[];
}

interface VisaContextType {
  selectedVisa: number | null;
  setSelectedVisa: (id: number | null) => void;
  selectedServices: number[];
  setSelectedServices: (ids: number[]) => void;
  setData: (data: IDatatype) => void;
  visaData: {
    visas: IVisa[];
    services: IServiceResponse[];
    documentRequirements: IDocumentRequirementResponse[];
  };
  hasVisaData: boolean;
  hasServiceData: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const VisaContext = createContext<VisaContextType | undefined>(undefined);

export const useVisaContext = () => {
  const context = useContext(VisaContext);
  if (context === undefined) {
    throw new Error("useVisaContext must be used within a VisaProvider");
  }
  return context;
};

interface VisaProviderProps {
  children: ReactNode;
}

export const VisaProvider = ({ children }: VisaProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVisa, setSelectedVisa] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const [data, setData] = useState<IDatatype>({});

  const visaData = {
    visas: data?.visas ?? [],
    services: data?.services ?? [],
    documentRequirements: data?.document_requirements ?? [],
  };

  const hasVisaData = (data?.visas ?? []).length > 0;
  const hasServiceData = (data?.services ?? []).length > 0;

  return (
    <VisaContext.Provider
      value={{
        selectedVisa,
        setSelectedVisa,
        selectedServices,
        setSelectedServices,
        visaData,
        setData,
        hasVisaData,
        hasServiceData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </VisaContext.Provider>
  );
};
