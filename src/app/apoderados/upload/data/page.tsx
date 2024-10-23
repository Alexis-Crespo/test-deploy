"use client";

import React, { useState, useRef } from "react";

import { LocationForm } from "@atoms/LocationForm";
import { useForm } from "react-hook-form";
import Input from "@atoms/Input";

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    //resolver: zodResolver(generalSchema),
    defaultValues: {
      cityId: undefined,
      provinceId: undefined,
      street: "",
      streetNumber: "",
      apartmentFloor: "",
    },
  });

  return (
    <div className="">
      <h1 className="text-lg font-semibold">Validá y completá tus datos</h1>
      <p className="text-sm mt-2">
        Algunos datos se completaron a partir de la captura de tu DNI. Si no son
        correctos, podés editarlos.
      </p>
      <h1 className="text-md mt-6 font-semibold">Estos son tus datos</h1>
      <div className="flex flex-col mt-4">
        <div className="flex">
          <p className="text-sm">Nombre:</p>
          <p className="font-semibold text-sm ml-2">Juan Alberto</p>
        </div>
        <div className="flex">
          <p className="text-sm">Apellido:</p>
          <p className="font-semibold text-sm ml-2">Perez</p>
        </div>
        <div className="flex">
          <p className="text-sm">DNI:</p>
          <p className="font-semibold text-sm ml-2">J24781445</p>
        </div>
      </div>
      <h1 className="text-md mt-6 font-semibold">Ingresa tu dirección</h1>

      <form >
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
      </form>

      <div className="flex mt-4 justify-between  w-full ">
        <div className="w-[100%] ">
          <span className="text-sm font-semibold">Piso y Departamento</span>
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
          <button
            type="submit"
            className="relative top-8 bg-primary-500 py-2 px-6 rounded-lg text-white"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
