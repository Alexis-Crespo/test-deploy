"use client";

import { useForm } from "react-hook-form";

import axios from "axios";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ocupation } from "@atoms/Ocupation";

export default function Home() {
  const tokenProvisorio =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZENsaWVudGUiOiIxMTk3MzQ1IiwiSWRBcG9kZ" +
    "XJhZG8iOiI4NzcxIiwic2NvcGUiOiJSLU9OQi1PTkJPQVJESU5HIn0.lm01p4YnKDoHpfyCzkxRSe9IvBgi" +
    "fsX0GM4kWlSUikk";

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    //resolver: zodResolver(generalSchema),
    defaultValues: {
      documentTypeId: "",
      numberIdentification: undefined,
      birthDate: "",
      phone: undefined,
      ocupation: undefined,
    },
  });

  const onSubmit = async (data) => {
    console.error("Submit ejecutado: ");
    router.push("./ddjj");
    /*  const dataSend = {
      origin: 3,
      token: tokenProvisorio,
      documentTypeId: data.documentTypeId,
      documentNumber: data.documentNumber,
      birthDate: data.birthDate,
      phoneNumber: data.phoneNumber,
      occupationId: data.occupationId,
    };

    try {
      const response = await axios.post(
        "/api/apoderado-general-data",
        dataSend
      );
      console.log("Data: ", dataSend);
      if (response.status === 200) {
        router.push("./ddjj");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      }; */
  };

  const formValues = watch();

  console.log("FormValues: ", formValues);

  return (
    <div className="">
      <h1 className="text-lg font-semibold">Algunos datos mas</h1>
      <p className="text-sm mt-2">Completá la siguiente información</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
          <Label className="text-sm  ">Tipo de identificación*</Label>
          <div className="flex space-x-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="CUIT/CUIL"
                className="form-radio"
                {...register("documentTypeId")}
              />
              <span className="text-sm">CUIT/CUIL</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="CDI" // El valor sigue siendo una cadena en el input
                className="form-radio"
                {...register("documentTypeId")}
              />
              <span className="text-sm">CDI</span>
            </label>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm ">Número de identificación*</span>
          <Input
            typeI={"text"}
            placeholder={"Ej: 24237761039"}
            register={register}
            name={"name"}
            error={errors.name}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
          <p className="text-gray-400 text-xs mt-1 relative left-1">
            Solo número. Sin puntos, ni guiones.
          </p>
        </div>

        <div className="flex mt-4 justify-between">
          <div className="w-[45%]">
            <div className="space-y-1">
              <Label htmlFor="birthDate" className="text-xs ">
                Fecha de nacimiento*
              </Label>
              <Input type="date" id="birthDate" {...register("birthDate")} />
              {errors.birthDate && (
                <p className="text-red-500 text-xs">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-[45%]">
            <span className="text-sm ">Telefono*</span>
            <Input
              typeI={"text"}
              placeholder={"Ej: 1148963524"}
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
            <Label htmlFor="profession" className="text-xs ">
              Ocupación*
            </Label>
            <Ocupation
              control={control}
              name="profession"
              setValue={setValue}
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
