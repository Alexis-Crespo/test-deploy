"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectCountry } from "@atoms/SelectCountry";
import Link from "next/link";
import { InputFile } from "@atoms/InputFile";
import Back from "@atoms/Back";

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Estado para las respuestas de las dos preguntas
  const [isSujetoObligado, setIsSujetoObligado] = useState<string | null>(null);
  const [isNoResidente, setIsNoResidente] = useState<string | null>(null);

  // Determinar la URL basada en las respuestas
  const getRedirectUrl = () => {
    if (isSujetoObligado === "si" && isNoResidente === "si") {
      return "./constancia-uif";
    }
    if (isSujetoObligado === "no" && isNoResidente === "no") {
      return "./beneficiary";
    }
    if (isSujetoObligado === "si" && isNoResidente === "no") {
      return "./constancia-uif";
    }
    if (isSujetoObligado === "no" && isNoResidente === "si") {
      return "./no-residentes";
    }
    // Valor por defecto si no se han respondido todas las preguntas
    return "/";
  };

  return (
    <>
      <div className="relative -top-44">
        <Back goTo="./files" />
      </div>
      <div>
        <h1 className="text-lg font-semibold md:-mt-8">
          Formulario para no residentes
        </h1>

        {/* Pregunta 1: ¿Es sujeto obligado? */}
        <div className="mt-4">
          <p className="text-sm mt-2 ml-0.5">¿Es sujeto obligado?</p>
          <div>
            <label>
              <input
                className="mr-2"
                type="radio"
                value="si"
                name="sujetoObligado"
                onChange={() => setIsSujetoObligado("si")}
              />
              Sí
            </label>
            <label className="ml-4">
              <input
                className="mr-2"
                type="radio"
                value="no"
                name="sujetoObligado"
                onChange={() => setIsSujetoObligado("no")}
              />
              No
            </label>
          </div>
        </div>

        {/* Pregunta 2: ¿Es no residente? */}
        <div className="mt-4">
          <p className="text-sm mt-2 ml-0.5">¿Es no residente?</p>
          <div>
            <label className="">
              <input
                className="mr-2"
                type="radio"
                value="si"
                name="noResidente"
                onChange={() => setIsNoResidente("si")}
              />
              Sí
            </label>
            <label className="ml-4">
              <input
                className="mr-2"
                type="radio"
                value="no"
                name="noResidente"
                onChange={() => setIsNoResidente("no")}
              />
              No
            </label>
          </div>
        </div>

        {/* Botón de Continuar con la redirección dinámica */}
        <Link href={getRedirectUrl()}>
          <div className="relative top-8 w-[30%] bg-primary-500 py-2 px-6 rounded-lg text-white">
            Continuar
          </div>
        </Link>
      </div>
    </>
  );
}
