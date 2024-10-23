"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  const tokenProvisorio =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZENsaWVudGUiOiIxMTk3MzQ1IiwiSWRBcG9kZ" +
    "XJhZG8iOiI4NzcxIiwic2NvcGUiOiJSLU9OQi1PTkJPQVJESU5HIn0.lm01p4YnKDoHpfyCzkxRSe9IvBgi" +
    "fsX0GM4kWlSUikk";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pep: undefined,
      so: undefined,
      pepReason: "",
    },
  });

  const formValues = watch();
  const { pep, so } = formValues;

  // Estado para manejar la visibilidad del input de pepReason
  const [showPepReason, setShowPepReason] = useState(false);

  // Actualiza el estado cuando se selecciona Si en PEP
  const handlePepChange = (e) => {
    const value = e.target.value;
    setShowPepReason(value === "1"); // Mostrar el input si es "Sí"
    if (value === "0") {
      setValue("pepReason", ""); // Limpiar el campo si selecciona "No"
    }
  };

  // Lógica de redirección según las respuestas
  const onSubmit = async (data) => {
    const dataSend = {
      origin: 3,
      token: tokenProvisorio,
      pep: Boolean(data.pep),
      so: Boolean(data.so),
      pepReason: data.pepReason || "string",
    };

    try {
      const response = await axios.post("/api/apoderado-ddjj", dataSend);

      if (response.status === 200) {
        if (so === "0") {
          router.push("/apoderados/apoderado-success"); // Ruta absoluta desde la raíz
        } else {
          router.push("/apoderados/upload/constancia-uif"); // Ruta relativa dentro de upload
        }
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-lg font-semibold">¡Último paso!</h1>
      <p className="text-sm mt-2">Contestá estas preguntas:</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
          <Label className="text-sm">¿Sos sujeto obligado?*</Label>
          <div className="flex space-x-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="1"
                className="form-radio"
                {...register("so", { required: "Este campo es obligatorio" })}
              />
              <span className="text-sm">Sí</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="0"
                className="form-radio"
                {...register("so", { required: "Este campo es obligatorio" })}
              />
              <span className="text-sm">No</span>
            </label>
          </div>
          {errors.so && <p className="text-red-500">{errors.so.message}</p>}
        </div>

        <div className="mt-8">
          <Label className="text-sm">
            ¿Sos persona políticamente expuesta?*
          </Label>
          <div className="flex space-x-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="1"
                className="form-radio"
                {...register("pep", { required: "Este campo es obligatorio" })}
                onChange={handlePepChange}
              />
              <span className="text-sm">Sí</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="0"
                className="form-radio"
                {...register("pep", { required: "Este campo es obligatorio" })}
                onChange={handlePepChange}
              />
              <span className="text-sm">No</span>
            </label>
          </div>
          {errors.pep && <p className="text-red-500">{errors.pep.message}</p>}
        </div>

        {showPepReason && (
          <div className="mt-6">
            <Label className="text-sm">Ingresa el motivo</Label>
            <input
              type="text"
              placeholder="Mi padre es juez"
              className="w-full mt-2 p-2 border rounded-md"
              {...register("pepReason", {
                required: "Este campo es obligatorio cuando PEP es Sí",
              })}
            />
            {errors.pepReason && (
              <p className="text-red-500">{errors.pepReason.message}</p>
            )}
          </div>
        )}

        <div className="mt-6">
          <p>
            Al continuar, confirmo haber leído y estar de acuerdo con los
            términos y condiciones de apertura de cuenta empresa.
          </p>
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
