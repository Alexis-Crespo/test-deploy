"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSchema } from "@/validations/generalSchema";
import Input from "@atoms/Input";

import { useCompany } from "@/context/CompanyContext";
import { TypeSocSelect } from "@atoms/TypeSocSelect";
import { MainActivitySelect } from "@atoms/MainActivitySelect";
import { LocationForm } from "@atoms/LocationForm";
import { useRouter } from "next/navigation";
import CustomCalendar from "@molecules/calender2/CustomCalender";
import Back from "@atoms/Back";
import { Spinner } from "@atoms/Spinner";
import axios from "axios";

export default function Page() {
  const cuit = localStorage.getItem("cuit");
  const token = localStorage.getItem("access_token");
  const { companyData, setCompanyData } = useCompany(); 
  const [loadingData, setLoadingData] = useState(true); 
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      cuit: "",
      businessName: "",
      businessTypeId: undefined,
      incorporationDate: "",
      mainActivityId: undefined,
      cityId: undefined,
      provinceId: undefined,
      street: "",
      streetNumber: "",
      phoneNumber: "",
      apartmentFloor: "",
    },
  });

  useEffect(() => {
    if (companyData) {
      setValue("businessName", companyData.businessName || "");
      setValue("provinceId", companyData.provinceId || undefined);
      setValue("cityId", companyData.cityId || undefined);
      setValue("street", companyData.street || "");
      setValue("streetNumber", companyData.streetNumber || "");
      setValue("mainActivityId", companyData.mainActivityId || undefined);
      setValue("businessTypeId", companyData.businessTypeId || undefined);
      setValue("apartmentFloor", companyData.apartmentFloor || undefined);
      setValue("phoneNumber", companyData.phoneNumber || undefined);
      setValue("incorporationDate", companyData.incorporationDate || undefined);

      setLoadingData(false);
    } else {
      setLoadingData(false);
    }
  }, [companyData, setValue]);

  const onSubmit = async (data: any) => {
    if (JSON.stringify(data) !== JSON.stringify(companyData)) {
      setCompanyData({
        ...companyData,
        ...data,
      });
    }
    try {
      const dataSend = {
        origin: 3,
        cuit: cuit,
        businessName: data.businessName,
        businessTypeId: data.businessTypeId,
        incorporationDate: data.incorporationDate,
        mainActivityId: data.mainActivityId,
        phoneNumber: data.phoneNumber,
        street: data.street,
        streetNumber: data.streetNumber,
        apartmentFloor: "",
        cityId: data.cityId,
        provinceId: data.provinceId,
      };

      const response = await axios.post("/api/company-data", dataSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Company data agregada", response.data);

        router.push("./tax");
      } else {
        console.log("Error al confirmar:", response.data);
      }
    } catch (error) {
      console.error("Error en la confirmación:", error);
    }
  };

  const formValues = watch();

  console.log("FORM VALUES: ", formValues);

  return (
    <>
      <div className="relative -top-44">
        <Back goTo="./cuit" />
      </div>
      <div>
        <h1 className="text-lg font-semibold">
          Validá que los datos sean correctos
        </h1>
        <p className="text-sm mt-2">
          Los siguientes campos se autocompletaron a partir del CUIT. Editá o
          completá la informacion que veas incorrecta:
        </p>
      </div>

      <p className="font-semibold text-md mt-6">CUIT de la empresa</p>
      <p className="mt-1 text-sm tracking-wide">{cuit}</p>

      <div className="mt-4">
        {loadingData ? (
          <Spinner size="medium" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-sm font-semibold">Razón social*</span>
            <Input
              typeI={"text"}
              placeholder={"Razón social"}
              register={register}
              name={"businessName"}
              error={errors.businessName}
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.businessName.message}
              </p>
            )}

            <div className="flex mt-4 justify-between">
              <div className="w-[45%]">
                <span className="text-sm font-semibold">Tipo de sociedad*</span>
                <TypeSocSelect
                  defaultValue={companyData?.businessTypeId}
                  {...register("businessTypeId")}
                />
                {errors.businessTypeId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.businessTypeId.message}
                  </p>
                )}
              </div>

              <div className="w-[45%]">
                <span className="text-sm font-semibold">
                  Fecha de constitución*
                </span>
                <CustomCalendar
                  initialDate={
                    companyData?.incorporationDate
                      ? new Date(companyData.incorporationDate)
                      : null
                  }
                  onDateChange={(date) => setValue("incorporationDate", date)} // Actualiza el valor en el formulario
                />

                {errors.incorporationDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.incorporationDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <span className="text-sm font-semibold">
                Actividad principal*
              </span>
              <MainActivitySelect
                defaultValue={companyData?.mainActivityId}
                {...register("mainActivityId")}
              />
              {errors.mainActivityId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mainActivityId.message}
                </p>
              )}
            </div>

            <LocationForm
              defaultProvinceId={companyData?.provinceId}
              defaultCityId={companyData?.cityId}
              setValue={setValue}
              onSelectProvince={(provinceId) =>
                setValue("provinceId", provinceId)
              }
              onSelectCity={(cityId) => setValue("cityId", cityId)} // Actualiza cityId en el formulario
            />

            {errors.provinceId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.provinceId.message}
              </p>
            )}
            {errors.cityId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cityId.message}
              </p>
            )}

            <div className="flex mt-4 justify-between">
              <div className="w-[45%]">
                <span className="text-sm font-semibold">Calle*</span>
                <Input
                  typeI={"text"}
                  placeholder={"Humboldt"}
                  register={register}
                  name={"street"}
                  error={errors.street}
                />
                {errors.street && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.street.message}
                  </p>
                )}
              </div>
              <div className="w-[45%]">
                <span className="text-sm font-semibold">Número*</span>
                <Input
                  typeI={"text"}
                  placeholder={"1550"}
                  register={register}
                  name={"streetNumber"}
                  error={errors.streetNumber}
                />
                {errors.streetNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.streetNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mt-4 justify-between  w-full ">
              <div className="w-[45%] ">
                <span className="text-sm font-semibold">
                  Piso y Departamento
                </span>
                <Input
                  typeI={"text"}
                  placeholder={"Ej: 4to B"}
                  register={register}
                  name={"apartmentFloor"}
                  error={errors.apartmentFloor}
                />
                {errors.apartmentFloor && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.apartmentFloor.message}
                  </p>
                )}
              </div>
              <div className="w-[45%] ">
                <span className="text-sm font-semibold">Telefono*</span>
                <Input
                  typeI={"text"}
                  placeholder={"1550"}
                  register={register}
                  name={"phoneNumber"}
                  error={errors.phoneNumber}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="relative top-8 bg-primary-500 py-2 px-6 rounded-lg text-white"
            >
              Continuar
            </button>
          </form>
        )}
      </div>
    </>
  );
}
