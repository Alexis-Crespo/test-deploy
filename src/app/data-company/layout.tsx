"use client";

import { StepProvider } from "../../components/ui/molecules/steper/stepContext";
import Steper from "../../components/ui/molecules/steper/Steper";

import { CompanyProvider } from "@/context/CompanyContext";
import { StaticDataProvider } from "@/context/StaticDataContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" w-[100vw]  md:relative md:left-10 lg:left-0">
        <div className=" ">
          <StepProvider>
            <div className=" h-[100%] ">
              <div className="flex  flex-col-reverse lg:flex-row  mt-12 lg:max-w-[620px]   max-w-[425px]  md:relative md:right-12 lg:right-24 xl:right-32 xl:max-w-[820px] relative right-8">
                <div className="lg:w-[60%] xl:w-[55%]  lg:relative lg:left-24 ">
                  <p className="mt-4 font-semibold mb-6 relative -top-10 lg:-top-4 text-sm ">
                    Información general de la empresa
                  </p>
                  <CompanyProvider>
                    <StaticDataProvider>
                      <div className="md:max-w-[380px]  ">{children}</div>
                    </StaticDataProvider>
                  </CompanyProvider>
                </div>
                <div className="lg:w-[60%]  xl:w-[50%] xl:left-20 lg:relative lg:left-36 ">
                  <Steper />
                </div>
              </div>
            </div>
          </StepProvider>
        </div>
      </div>
    </>
  );
}
