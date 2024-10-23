"use client";

import React, { useState, useRef } from "react";

import { LocationForm } from "@atoms/LocationForm";
import { useForm } from "react-hook-form";

import Input from "@atoms/Input";

import axios from "axios";
import { useApoderadoContext } from "@/context/ApoderadoContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const tokenProvisorio =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZENsaWVudGUiOiIxMTk3MzQ1IiwiSWRBcG9kZ" +
    "XJhZG8iOiI4NzcxIiwic2NvcGUiOiJSLU9OQi1PTkJPQVJESU5HIn0.lm01p4YnKDoHpfyCzkxRSe9IvBgi" +
    "fsX0GM4kWlSUikk";

  const router = useRouter();
  const { renaper } = useApoderadoContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors },
  } = useForm({
    //resolver: zodResolver(generalSchema),
    defaultValues: {
      name: "",
      lastName: "",
      cityId: undefined,
      provinceId: undefined,
      street: "",
      streetNumber: "",
      apartmentFloor: "",
    },
  });

  const onSubmit = async (data) => {
    const dataSend = {
      origin: 3,
      token: tokenProvisorio,
      name: data.name,
      lastName: data.lastName,
      cityId: undefined,
      provinceId: undefined,
      street: "",
      streetNumber: "",
      apartmentFloor: "",
    };

    /* try {
      const response = await axios.post("/api/apoderado-manual-data", dataSend);

      if (response.status === 200) {
        if (renaper) {
          router.push("./data");
        } else {
          router.push("./manual-data");
        }
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
*/
    console.log("Data: ", dataSend);
    router.push("./general-data");
  };

  const formValues = watch();

  console.log("FormValues: ", formValues);

  return (
    <div className="">
      <h1 className="text-lg font-semibold">Datos de identidad</h1>
      <p className="text-sm mt-2">
        Ingresá el número de DNI, número de trámite y género.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-4 justify-between">
          <div className="w-[45%]">
            <span className="text-sm ">Nombre*</span>
            <Input
              typeI={"text"}
              placeholder={"Juan"}
              register={register}
              name={"name"}
              error={errors.name}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="w-[45%]">
            <span className="text-sm ">Apellido*</span>
            <Input
              typeI={"text"}
              placeholder={"Perez"}
              register={register}
              name={"lastName"}
              error={errors.lastName}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <LocationForm
          defaultProvinceId={1}
          defaultCityId={1}
          setValue={setValue}
          onSelectProvince={(provinceId) => setValue("provinceId", provinceId)}
          onSelectCity={(cityId) => setValue("cityId", cityId)}
        />

        {errors.provinceId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.provinceId.message}
          </p>
        )}
        {errors.cityId && (
          <p className="text-red-500 text-xs mt-1">{errors.cityId.message}</p>
        )}

        <div className="flex mt-4 justify-between">
          <div className="w-[45%]">
            <span className="text-sm ">Calle*</span>
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
            <span className="text-sm ">Número*</span>
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
          <div className="w-[100%] ">
            <span className="text-sm ">Piso y Departamento</span>
            <Input
              typeI={"text"}
              placeholder={"Ej: 4to B"}
              register={register}
              name={"apartmentFloor"}
              error={errors.apartmentFloor}
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
  );
}
