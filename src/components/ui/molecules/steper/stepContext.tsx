"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation"; // Usa usePathname para obtener la ruta actual

interface StepContextProps {
  currentStep: number;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

const pageStepMapping: { [key: string]: number } = {
  "/data-company/cuit": 1,
  "/data-company/general": 1,
  "/data-company/tax": 1,
  "/data-company/files": 1,
  "/data-company/ddjj": 2,
  "/companyData/benefits": 2,
  "/companyData/ddjj2": 3,
  "/companyData/ddjj3": 4,
};

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname(); // Obtén la ruta actual
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    console.log(pathname);
    console.log(pageStepMapping[pathname]);
    setCurrentStep(pageStepMapping[pathname] || 1);
  }, [pathname]);

  return (
    <StepContext.Provider value={{ currentStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};
