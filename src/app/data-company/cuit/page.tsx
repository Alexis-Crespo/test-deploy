"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/validations/companySchema";
import Input from "@atoms/Input";
import { useRouter } from "next/navigation";
import Button from "@atoms/Button";
import Image from "next/image";
import ERROR_FORM from "@assets/error-form.svg";
import axios from "axios";
import { useCompany } from "@/context/CompanyContext";
import { Spinner } from "@atoms/Spinner";

type CompanyData = {
  cuit: string;
  businessName: string;
  businessTypeId: number;
  cityId: number;
  grossIncome?: number;
  incomeTaxRegistration?: string;
  incorporationDate: string;
  mainActivityId: number;
  phoneNumber: number;
  provinceId: number;
  registrationModificationDate?: string;
  rpcNumberIGJ?: string | null;
  street: string;
  streetNumber: string;
  vatStatus?: string;
  apartmentFloor?: string;

  lastModificationDate?: string;
  province?: string;
  registrationDate?: string;
  registrationNumber?: string;
  grossIncomeNumber?: string;
};

type dataCompany = {
  cuit: string;
};

export default function Page() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  const router = useRouter();

  const token = localStorage.getItem("access_token");

  const { setCompanyData } = useCompany();

  const infoExperto = async (cuit: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/cuit-info?cuit=${cuit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        const companyData: CompanyData = {
          cuit: data.cuit,
          businessName: data.businessName,
          businessTypeId: data.businessTypeId,
          cityId: data.cityId,
          grossIncome: data.grossIncome,
          incomeTaxRegistration: data.incomeTaxRegistration,
          incorporationDate: data.incorporationDate,
          mainActivityId: data.mainActivityId,
          phoneNumber: data.phoneNumber,
          provinceId: data.provinceId,
          registrationModificationDate: data.registrationModificationDate,
          rpcNumberIGJ: data.rpcNumberIGJ || null,
          street: data.street,
          streetNumber: data.streetNumber,
          vatStatus: data.vatStatus,
          apartmentFloor: data.apartmentFloor,

          lastModificationDate: undefined,
          province: undefined,
          registrationDate: undefined,
          registrationNumber: undefined,
          grossIncomeNumber: undefined,
        };

        setCompanyData(companyData);

        router.push("./general");
      } else {
        console.log("Error al obtener información del CUIT:", response.data);
        router.push("./general");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      router.push("./general");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: dataCompany) => {
    localStorage.setItem("cuit", data.cuit);
    await infoExperto(data.cuit);
  };

  const handleError = (errors: any) => {
    console.error("ERRORES:", errors);
  };

  return (
    <div className="min-h-[50vh]">
      <h1 className="font-semibold lg:mt-2 relative -top-4 md:top-0 lg:-top-6 text-lg">
        Ingresá el CUIT
      </h1>
      <form className="" onSubmit={handleSubmit(onSubmit, handleError)}>
        <p className="font-semibold text-sm md:mt-4 ">CUIT de la empresa</p>
        <div className="max-w-[430px] md:mt-2">
          <Input
            typeI={"text"}
            placeholder={"Ej: 24885466789"}
            register={register}
            name={"cuit"}
            error={errors.cuit}
          />
        </div>

        {errors.cuit && (
          <div className="flex items-center relative top-1">
            <Image src={ERROR_FORM} height={12} width={12} alt="error icon" />
            <p className="text-red-500 text-sm ml-2 relative">
              {errors.cuit.message}
            </p>
          </div>
        )}

        <div className="w-[45%] relative top-2">
          {loading ? (
            <div
              className="w-[100%] h-[40px] flex justify-center items-center rounded-lg px-2 py-4 text-sm font-medium
         ease-in-out transition duration-500 bg-primary-400"
            >
              <Spinner size="small" className="text-white" />
            </div>
          ) : (
            <div className="-mt-5">
              <Button text={"Continuar"} isDisabled={loading} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
