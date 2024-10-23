"use client";

import React, { useState, useRef } from "react";

import { LocationForm } from "@atoms/LocationForm";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      dni: undefined,
      processNumber: undefined,
      gender: "",
    },
  });

  const onSubmit = async (data) => {
    const dataSend = {
      origin: 3,
      token: tokenProvisorio,
      dni: data.dni,
      processNumber: data.processNumber,
      gender: data.gender,
    };

    try {
      const response = await axios.post("/api/apoderado-manual-dni", dataSend);

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

    console.log("Data: ", dataSend);
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
        <div className="w-[90%] mt-2">
          <Label htmlFor="dni" className="text-xs f">
            DNI*
          </Label>
          <Input placeholder="Ej: 24785665" {...register("dni")} />
        </div>
        <div className="w-[90%] mt-2">
          <Label htmlFor="dni" className="text-xs f">
            Nº de trámite*
          </Label>
          <Input
            placeholder="Ej: 005796384567469"
            {...register("processNumber")}
          />
        </div>
        <div className="mt-2">
          <Label className="text-xs  ">Genero*</Label>
          <div className="flex space-x-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Femenino" // El valor sigue siendo una cadena en el input
                className="form-radio"
                {...register("gender")}
              />
              <span className="text-sm">Femenino</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Masculino" // El valor sigue siendo una cadena en el input
                className="form-radio"
                {...register("gender")}
              />
              <span className="text-sm">Masculino</span>
            </label>
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
