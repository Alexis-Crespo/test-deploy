"use client";
import { useState } from "react";
import { userSchema } from "@/validations/userSchema";
import Input from "@atoms/Input";
import { TableApoderado } from "@atoms/TableApoderado";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const token = localStorage.getItem("access_token");

  const [apoderados, setApoderados] = useState<string[]>([]);
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
  };

  const onContinue = async () => {
    console.log("Clikeo continuar, se enviaria: ", apoderados);

    const dataSend = {
      origin: 3,
      emails: apoderados,
    };

    try {
      const response = await axios.post(
        "/api/apoderado-register-email",
        dataSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Apoderados confirmados.", response.data);

        router.push("./apoderado-emails-success");
      } else {
        console.log("Error al confirmar:", response.data);
      }
    } catch (error) {
      console.error("Error en la confirmación:", error);
    }
  };

  const handlerDelete = (emailToDelete: string) => {
    setApoderados((prev) => prev.filter((email) => email !== emailToDelete));
  };

  return (
    <>
      <h1 className="text-xl tracking-wide font-semibold">
        Registrá tus apoderados
      </h1>
      <p className="text-sm text-gray-600 mt-0.5">
        Cargá el e-mail de lo/s apoderado/s y/o representante/s legales según lo
        justifique el poder o acta de designación de autoridades. Enviaremos un
        mail con un link para validar su identidad.
      </p>
      <div className="mt-6 flex">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
          <div className="w-[80%]">
            <label htmlFor="email" className="font-semibold text-sm">
              E-mail del apoderado
            </label>
            <Input
              typeI="text"
              placeholder="Ej:apoderado@mail.com"
              register={register}
              name={"email"}
              error={errors.email}
            />
          </div>

          <div className="w-[20%] flex items-center justify-center">
            <button
              type="submit"
              className="text-primary-500 py-2 px-4 rounded relative top-3"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>

      <TableApoderado apoderados={apoderados} handlerDelete={handlerDelete} />
      <button
        onClick={onContinue}
        className="px-4 py-2  rounded-lg text-center bg-primary-500 text-white cursor-pointer relative top-2"
      >
        Continuar
      </button>
    </>
  );
}
