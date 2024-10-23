"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@atoms/Input";
import { useCompany } from "@/context/CompanyContext";
import { SelectTaxRegistration } from "@atoms/SelectTaxRegistration";
import { SelectIIBB } from "@atoms/SelectIIBB";
import CustomCalendar from "@molecules/calender2/CustomCalender";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SelectIva } from "@atoms/SelectIva";
import Back from "@atoms/Back";
import axios from "axios";

export default function Page() {
  function convertDateToISOString(date: string | Date): string {
    if (typeof date === "string" && !isNaN(Date.parse(date))) {
      return new Date(date).toISOString();
    }

    if (date instanceof Date) {
      return date.toISOString();
    }

    throw new Error("Fecha inválida");
  }

  const token = localStorage.getItem("access_token");

  const router = useRouter();
  const { companyData, setCompanyData } = useCompany();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      incomeTaxRegistration: companyData?.incomeTaxRegistration || "",
      vatStatus: companyData?.vatStatus || "",
      grossIncome: companyData?.grossIncome || "",
      registrationNumberRPCIGJ: "",
      registrationNumberIIBB: "",
      registrationDateRPCIGJ: "",
      registrationModificationDate: "",
      provinceId: companyData?.province || "",
    },
  });

  const [loadingData, setLoadingData] = useState(true);
  const formValues = watch();

  const iibbStatus = watch("grossIncome", companyData?.grossIncome || "");
  const isLocal = iibbStatus == 0;

  const onSubmit = async (data: any) => {
    setCompanyData({
      ...companyData,
      ...data,
    });

    try {
      const generatedObject = {
        origin: 3,
        incomeTaxRegistration: Number(data.incomeTaxRegistration),
        ivaStatus: data.vatStatus,
        iibbStatus: data.grossIncome,
        registrationNumberRPCIGJ: data.registrationNumberRPCIGJ,
        registrationNumberIIBB: data.registrationNumberIIBB,
        registrationDateRPCIGJ: convertDateToISOString(
          data.registrationDateRPCIGJ
        ),
        registrationModificationDate: convertDateToISOString(
          data.registrationModificationDate
        ),
        provinceId: data.provinceId,
      };

      console.log("Se envio: ", generatedObject);

      const response = await axios.post(
        "/api/employment-data",
        generatedObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Company data agregada", response.data);

        router.push("./tax");
      } else {
        console.log("Error al confirmar:", response.data);
      }
    } catch (error) {
      console.error("Error en la confirmación:", error);
    }

    router.push("./files");
  };

  console.log(formValues);
  return (
    <>
      <div className="relative -top-44">
        <Back goTo="./general" />
      </div>
      <div>
        <h1 className="text-lg font-semibold md:-mt-8">
          Completá datos fiscales de tu empresa
        </h1>
        <p className="text-sm mt-2">
          Verificá que la información sea correcta y completá los que falten. De
          no ser correcta podés editarlo.
        </p>
      </div>
      <div className="mt-3">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <span className="text-sm font-semibold">
            Inscripción en ganancias*
          </span>
          <SelectTaxRegistration
            defaultValue={companyData?.incomeTaxRegistration}
            {...register("incomeTaxRegistration")}
            onChange={(option) =>
              setValue("incomeTaxRegistration", option?.value || "")
            }
          />

          <div className="mt-3">
            <span className="text-sm font-semibold">Condición de IVA*</span>
            <SelectIva
              defaultValue={companyData?.incomeTaxRegistration}
              {...register("vatStatus")}
              onChange={(option) => setValue("vatStatus", option?.label || "")}
            />
          </div>

          <div className="mt-3">
            <span className="text-sm font-semibold">
              Condición de Ingresos brutos*
            </span>
            <SelectIIBB
              defaultValue={companyData?.grossIncome}
              onChange={(option) =>
                setValue("grossIncome", option?.label || "")
              }
            />
          </div>

          {isLocal && (
            <div className="mt-3">
              <span className="text-sm font-semibold">
                Provincia a la que contribuye localmente*
              </span>
              <Input
                typeI={"text"}
                placeholder={"Buenos Aires"}
                register={register}
                name={"province"}
                error={errors.provinceId}
              />
              {errors.province && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.provinceId.message}
                </p>
              )}
            </div>
          )}

          <div className="mt-3">
            <span className="text-sm font-semibold">
              Nro de inscripción a ingresos brutos*
            </span>
            <Input
              typeI={"text"}
              placeholder={"4444444"}
              register={register}
              name={"registrationNumberIIBB"}
              error={errors.registrationNumberIIBB}
            />
            {errors.registrationNumberIIBB && (
              <p className="text-red-500 text-xs mt-1">
                {errors.registrationNumberIIBB.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <span className="text-sm font-semibold">
              Nro. de inscripción R.P.C / I.G.J.*
            </span>
            <Input
              typeI={"text"}
              placeholder={"4444444"}
              register={register}
              name={"registrationNumberRPCIGJ"}
              error={errors.registrationNumberRPCIGJ}
            />
            {errors.registrationNumberRPCIGJ && (
              <p className="text-red-500 text-xs mt-1">
                {errors.registrationNumberRPCIGJ.message}
              </p>
            )}
          </div>

          <div className="flex mt-4 justify-between">
            <div className="w-[49%]">
              <span className="md:text-[0.65rem] text-[0.72rem] font-semibold">
                Fecha de inscripción R.P.C / I.G.J.*
              </span>
              <CustomCalendar
                onDateChange={(date) =>
                  setValue("registrationDateRPCIGJ", date)
                }
                initialDate={
                  companyData?.registrationDate
                    ? new Date(companyData.registrationDate)
                    : null
                }
              />
            </div>
            <div className="w-[49%]">
              <span className="md:text-[0.65rem] text-[0.72rem] font-semibold">
                Última modificación de la inscripción
              </span>
              <CustomCalendar
                onDateChange={(date) =>
                  setValue("registrationModificationDate", date)
                }
                initialDate={
                  companyData?.lastModificationDate
                    ? new Date(companyData.lastModificationDate)
                    : null
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="relative top-8 bg-primary-500 py-2 px-6 rounded-lg text-white"
          >
            Continuar
          </button>
        </form>
      </div>
    </>
  );
}
