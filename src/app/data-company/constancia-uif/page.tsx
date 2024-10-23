"use client";
import { useForm } from "react-hook-form";
import { Select } from "@atoms/Select";
import Link from "next/link";
import { InputFile } from "@atoms/InputFile";

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {" "}
      <div>
        <h1 className="text-lg font-semibold md:mt-8">
          Constancia de inscripción en la UIF
        </h1>
        <p className="text-[0.7rem] mt-2">
          Subí la constancia en PDF que aparece en el sitio web de la UIF
        </p>
      </div>
      <div className="mt-3">
        <InputFile documentType="7" />
      </div>
      <Link className="mx-auto" href="./beneficiary">
        <div className="px-4 py-2 w-[30%] mt-8 rounded-lg text-center bg-violet-300 text-white cursor-pointer">
          Continuar
        </div>
      </Link>
    </>
  );
}
