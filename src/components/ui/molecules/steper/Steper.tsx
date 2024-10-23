import { useStep } from "./stepContext";
import Beneficiarios from "../../icons/Beneficiarios";
import GeneralInfo from "../../icons/Generalinfo";
import Apoderados from "../../icons/Apoderados";
import CheckApertura from "../../icons/CheckApertura";

const Steper = () => {
  const { currentStep } = useStep();

  return (
    <>
      <div className="flex gap-1 items-center lg:hidden relative top-12 lg:top-0 ">
        <p className="text-[0.8rem] mr-2">Paso {currentStep}/4</p>
        <div
          className={`h-1.5 w-[5.5rem] md:w-[4.2rem] rounded-lg ${
            currentStep >= 1 ? "bg-primary-500" : "bg-gray-300 opacity-60"
          }`}
        ></div>
        <div
          className={`h-1.5 w-[5.5rem] rounded-lg md:w-[4.2rem] ${
            currentStep >= 2 ? "bg-primary-500" : "bg-gray-300 opacity-60"
          }`}
        ></div>
        <div
          className={`h-1.5 w-[5.5rem] rounded-lg md:w-[4.2rem] ${
            currentStep >= 3 ? "bg-primary-500" : "bg-gray-300 opacity-60"
          }`}
        ></div>
        <div
          className={`h-1.5 w-[5.5rem] rounded-lg md:w-[4.2rem] ${
            currentStep >= 4 ? "bg-primary-500" : "bg-gray-300 opacity-60"
          }`}
        ></div>
      </div>

      <div className="hidden lg:block border border-gray-300 rounded-lg w-auto py-8 px-6 lg:w-[95%] xl:w-[78%] xl:ml-4 lg:ml-6  lg:mx-auto lg:py-6">
        <h2 className="text-primary-900 font-semibold text-lg">
          Proceso de apertura
        </h2>
        <div className="flex justify-between items-center mt-4 ">
          <div
            className={`rounded-full p-2 w-12 h-10  
            ${currentStep >= 2 ? "bg-primary-500 border-none" : "bg-white"} 
            ${
              currentStep >= 1
                ? "border-2 border-primary-900"
                : "border border-black"
            }  
            flex justify-center items-center`}
          >
            {currentStep >= 2 ? (
              currentStep >= 3 ? (
                <GeneralInfo fillColor="#6439ff" strokeColor="white" />
              ) : (
                <GeneralInfo fillColor="white" strokeColor="#06083f" />
              )
            ) : (
              <GeneralInfo fillColor="white" strokeColor="gray" />
            )}
          </div>
          <p
            className={`${
              currentStep === 1 ? "text-primary-900 font-semibold" : ""
            } w-full ml-4 lg:text-[0.74rem]`}
          >
            Información general de la empresa
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 relative">
          <div
            className={`${
              currentStep >= 2 ? "bg-primary-500" : "bg-gray-300"
            } absolute left-[1.2rem] -top-7 h-7 w-1 -z-10`}
          ></div>
          <div
            className={`rounded-full p-2 w-12 h-10 
            ${currentStep >= 3 ? "bg-primary-500 border-none" : ""} 
            ${
              currentStep >= 2
                ? "border-2 border-primary-900"
                : "border border-black"
            }  
            flex justify-center items-center`}
          >
            {currentStep >= 2 ? (
              currentStep >= 3 ? (
                <Beneficiarios fillColor="#6439ff" strokeColor="white" />
              ) : (
                <Beneficiarios fillColor="white" strokeColor="#06083f" />
              )
            ) : (
              <Beneficiarios fillColor="white" strokeColor="gray" />
            )}
          </div>
          <p
            className={`${
              currentStep === 2 ? "text-primary-900 font-semibold" : ""
            } w-full ml-4 text-sm lg:text-[0.74rem]`}
          >
            Beneficiarios finales
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 relative">
          <div
            className={`${
              currentStep >= 3 ? "bg-primary-500" : "bg-gray-300"
            } absolute left-[1.2rem] -top-4 h-4 w-1`}
          ></div>
          <div
            className={`rounded-full p-2 w-12 h-10 
            ${currentStep >= 4 ? "bg-primary-500 border-none" : ""} 
            ${
              currentStep >= 3
                ? "border-2 border-primary-900"
                : "border border-black"
            }  
            flex justify-center items-center`}
          >
            {currentStep >= 3 ? (
              currentStep >= 4 ? (
                <Apoderados fillColor="#6439ff" strokeColor="white" />
              ) : (
                <Apoderados fillColor="white" strokeColor="gray" />
              )
            ) : (
              <Apoderados fillColor="white" strokeColor="gray" />
            )}
          </div>
          <p
            className={`${
              currentStep === 3 ? "text-primary-900 font-semibold" : ""
            } w-full ml-4 text-sm lg:text-[0.74rem]`}
          >
            Apoderados
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 relative">
          <div
            className={`${
              currentStep >= 4 ? "bg-primary-500" : "bg-gray-300"
            } absolute left-[1.2rem] -top-4 h-4 w-1`}
          ></div>
          <div
            className={`rounded-full p-2 w-12 h-10 
            ${currentStep >= 5 ? "bg-primary-500 border-none" : ""} 
            ${
              currentStep >= 5
                ? "border-2 border-primary-900"
                : "border border-black"
            }  
            flex justify-center items-center`}
          >
            {currentStep >= 5 ? (
              <CheckApertura fillColor="#6439ff" strokeColor="white" />
            ) : (
              <CheckApertura fillColor="white" strokeColor="gray" />
            )}
          </div>
          <p
            className={`${
              currentStep === 4 ? "text-primary-900 font-semibold" : ""
            } w-full ml-4 text-sm lg:text-[0.74rem]`}
          >
            Revisión de apertura
          </p>
        </div>
      </div>
    </>
  );
};

export default Steper;
