"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";

interface StepContextProps {
  currentStep: number;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

const pageStepMapping: { [key: string]: number } = {
  "/apoderados/upload/front-dni": 1,
  "/apoderados/upload/back-dni": 1,
  "/apoderados/upload/selfie": 2,
  "/data-company/files": 1,
  "/companyData/benefits": 2,
  "/companyData/ddjj": 2,
  "/companyData/ddjj2": 3,
};

export const StepProviderApoderado = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
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
