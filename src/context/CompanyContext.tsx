import { createContext, useContext, useState, ReactNode } from "react";

type CompanyData = {
  cuit: string;
  businessName: string;
  businessTypeId: number;
  cityId: number;
  grossIncome: number;
  incomeTaxRegistration: number;
  incorporationDate: string;
  mainActivityId: number;
  phoneNumber: number;
  provinceId: number;
  registrationModificationDate: string;
  rpcNumberIGJ: number | null;
  street: string;
  streetNumber: string;
  vatStatus: number;
  lastModificationDate: string;
  province: string;
  registrationDate: string;
  registrationNumber: string;
  grossIncomeNumber: number;
};

// Tipo de contexto
interface CompanyContextProps {
  companyData: CompanyData | null;
  setCompanyData: (data: CompanyData) => void;
}

// Contexto
const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);

// Hook para consumir el contexto
export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany debe ser usado dentro de CompanyProvider");
  }
  return context;
};

// Provider
export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  return (
    <CompanyContext.Provider value={{ companyData, setCompanyData }}>
      {children}
    </CompanyContext.Provider>
  );
};
