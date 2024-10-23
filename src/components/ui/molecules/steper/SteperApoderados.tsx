import { useStep } from "./stepContextApoderado";
import Beneficiarios from "../../icons/Beneficiarios";
import GeneralInfo from "../../icons/Generalinfo";
import Apoderados from "../../icons/Apoderados";

const SteperApoderados = () => {
  const { currentStep } = useStep();

  return (
    <>
      {/* Steper mobile */}
      <div className="flex gap-1 items-center lg:hidden relative top-12 lg:top-0 ">
        <p className="text-[0.8rem] mr-2">Paso {currentStep}/3</p>
        <div
          className={`h-1.5 w-[7rem] md:w-[4.2rem] rounded-lg ${
            currentStep >= 1 ? "bg-primary-500" : "bg-gray-300 opacity-60"
          }`}
        ></div>
        <div
          className={`h-1.5 w-[7rem] rounded-lg md:w-[4.2rem] ${
            currentStep >= 2 ? "bg-primary-500" : "bg-gray-300 opacity-60"
          }`}
        ></div>
        <div
          className={`h-1.5 w-[7rem] rounded-lg md:w-[4.2rem] ${
            currentStep >= 3 ? "bg-primary-500" : "bg-gray-300 opacity-60"
          }`}
        ></div>
      </div>

      {/* Steper desktop */}
      <div className="hidden lg:block border border-gray-300 rounded-lg w-auto py-8 px-6 lg:w-[95%] xl:w-[78%] xl:ml-4 lg:ml-2 lg:mx-auto lg:py-6">
        <h2 className="text-primary-900 font-semibold text-lg">
          Validación de identidad
        </h2>

        {/* Step 1 */}
        <div className="flex justify-between items-center mt-4">
          <div
            className={`rounded-full p-2 w-12 h-10 flex justify-center items-center ${
              currentStep >= 2 ? "bg-primary-500 border-none" : "bg-white"
            } ${
              currentStep >= 1
                ? "border-2 border-primary-900"
                : "border border-black"
            }`}
          >
            {currentStep >= 2 ? (
              <GeneralInfo fillColor="#6439ff" strokeColor="white" />
            ) : (
              <GeneralInfo fillColor="white" strokeColor="#06083f" />
            )}
          </div>
          <p
            className={`${
              currentStep === 1 ? "text-primary-900" : ""
            } w-full ml-4 lg:text-[0.74rem]`}
          >
            Subí foto de tu DNI
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex justify-between items-center mt-4 relative">
          <div
            className={`${
              currentStep >= 1 ? "bg-primary-500" : "bg-gray-300"
            } absolute left-[1.2rem] -top-7 h-7 w-1 -z-10`}
          ></div>
          <div
            className={`rounded-full p-2 w-12 h-10 flex justify-center items-center ${
              currentStep >= 2 ? "bg-primary-500 border-none" : ""
            } ${
              currentStep >= 1
                ? "border-2 border-primary-900"
                : "border border-black"
            }`}
          >
            {currentStep >= 2 ? (
              <Beneficiarios fillColor="#6439ff" strokeColor="white" />
            ) : (
              <Beneficiarios fillColor="white" strokeColor="#06083f" />
            )}
          </div>
          <p
            className={`${
              currentStep === 2 ? "text-primary-900" : ""
            } w-full ml-4 text-sm lg:text-[0.74rem]`}
          >
            Subí unas Selfies
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex justify-between items-center mt-4 relative">
          <div
            className={`${
              currentStep >= 2 ? "bg-primary-500" : "bg-gray-300"
            } absolute left-[1.2rem] -top-4 h-4 w-1`}
          ></div>
          <div
            className={`rounded-full p-2 w-12 h-10 flex justify-center items-center ${
              currentStep >= 3 ? "bg-primary-500 border-none" : ""
            } ${
              currentStep >= 2
                ? "border-2 border-primary-900"
                : "border border-black"
            }`}
          >
            {currentStep >= 3 ? (
              <Apoderados fillColor="#6439ff" strokeColor="white" />
            ) : (
              <Apoderados fillColor="white" strokeColor="gray" />
            )}
          </div>
          <p
            className={`${
              currentStep === 3 ? "text-primary-900" : ""
            } w-full ml-4 text-sm lg:text-[0.74rem]`}
          >
            Completá datos personales
          </p>
        </div>
      </div>
    </>
  );
};

export default SteperApoderados;
