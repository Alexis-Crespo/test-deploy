"use client";
import { useEffect, useState } from "react";
import { userSchema } from "@/validations/userSchema";
import Input from "@atoms/Input";
import { TableApoderado } from "@atoms/TableApoderado";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StatusApertura } from "@atoms/status-apertura";
import { useStateManager } from "react-select";
import Beneficiarios from "@/components/ui/icons/Beneficiarios";

export default function Page() {
  const token = localStorage.getItem("access_token");
  const [apoderados, setApoderados] = useState<string[]>([]);
  const handlerDelete = (emailToDelete: string) => {
    setApoderados((prev) => prev.filter((email) => email !== emailToDelete));
  };
  /*

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //resolver: zodResolver(userSchema),
  });

  const router = useRouter();
  
  const onSubmit = (data: { email: string }) => {
    console.log("Email capturado:", data.email);
    if (data.email) {
      setApoderados((prev) => [...prev, data.email]);
      console.log("Apoderados actualizados:", apoderados);
    }
    reset();
  }; */
  useEffect(() => {
    onContinue();
  }, []);

  const onContinue = async () => {
    console.log(": ", apoderados);

    try {
      const response = await axios.get("/api/estado-apertura", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Apoderados confirmados.", response.data);

        // router.push("./beneficiary-company");
      } else {
        console.log("Error al confirmar:", response.data);
      }
    } catch (error) {
      console.error("Error en la confirmación:", error);
    }
  };

  return (
    <>
      <h1 className="text-md tracking-wide font-semibold">
        Validación de apoderados
      </h1>
      <p className="text-xs text-gray-600 mt-4">
        Tu proceso de apertura entrará en revisión una vez que todos los
        apoderados validen su identidad a partir del link que le hemos enviado
        por mail.
      </p>
      <p className="text-xs text-gray-600 mt-4">
        Acá vas a poder conocer quienes han completado la validación.
      </p>
      <StatusApertura apoderados={apoderados} handlerDelete={handlerDelete} />
      <div className="flex relative top-2 left-1 items-center gap-x-2 ">
        <Beneficiarios fillColor="white" strokeColor="#6439ff" />{" "}
        <span className="text-primary-500">Agregar apoderado</span>
      </div>
      <p className="relative top-8 text-xs">
        Podés volver a esta página cuando quieras, solo ingresa a
        www.invertironline.com e iniciá sesión con tu usuario y contraseña.
      </p>
    </>
  );
}
