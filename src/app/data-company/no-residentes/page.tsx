"use client";
import { useForm } from "react-hook-form";
import { SelectCountry } from "@atoms/SelectCountry";
import Link from "next/link";
import { InputFile } from "@atoms/InputFile";
import Input from "@atoms/Input";

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue, // Esto nos permitirá actualizar el valor del país seleccionado
    watch,
    formState: { errors },
  } = useForm();

  // Función para manejar la selección de país
  const handleCountryChange = (countryId: number) => {
    setValue("country", countryId); // Actualiza el valor del país en el formulario
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-semibold md:mt-8">
          Formulario para no residentes
        </h1>
        <p className="text-[0.7rem] mt-2 ml-0.5">País de residencia fiscal</p>
      </div>
      <div className="">
        {/* Pasa handleCountryChange como onChange al SelectCountry */}
        <SelectCountry onChange={handleCountryChange} />
      </div>
      <div className="">
        <p className="text-[0.7rem] mt-2 ml-0.5">Dirección completa</p>
        <Input
          typeI={"text"}
          placeholder={"Nombre y número de la calle"}
          register={register}
          name={"street"}
          error={errors.street}
        />
      </div>
      <div className="">
        <p className="text-[0.7rem] mt-2 ml-0.5">
          Ciudad, estado y código postal
        </p>
        <Input
          typeI={"text"}
          placeholder={"Ciudad, estado y codigo postal"}
          register={register}
          name={"street"}
          error={errors.street}
        />
      </div>
      <div className="">
        <p className="text-[0.7rem] mt-2 ml-0.5">
          Nº de identificación tributaria
        </p>
        <Input
          typeI={"text"}
          placeholder={"Ingresa el número"}
          register={register}
          name={"street"}
          error={errors.street}
        />
      </div>
      <div className="">
        <p className="text-[0.7rem] mt-2 ml-0.5">País de ciudadanía</p>
        <SelectCountry onChange={handleCountryChange} />
      </div>
      <Link className="mx-auto" href="./beneficiary">
        <div className="px-4 py-2 w-[30%] mt-8 rounded-lg text-center bg-violet-300 text-white cursor-pointer">
          Continuar
        </div>
      </Link>
    </>
  );
}
