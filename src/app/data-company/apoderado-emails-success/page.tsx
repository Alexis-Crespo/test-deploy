"use client";
import { useState } from "react";
import { userSchema } from "@/validations/userSchema";
import Input from "@atoms/Input";
import { TableApoderado } from "@atoms/TableApoderado";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const token = localStorage.getItem("access_token");
  /*

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

        // router.push("./beneficiary-company");
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
 */
  return (
    <>
      <h1 className="text-md tracking-wide font-semibold">
        Enviamos un mail a cada uno de los apoderados/ representantes legales
      </h1>
      <p className="text-xs text-gray-600 mt-4">
        Ingresando al mail, encontrarán un link para validar su identidad. Tené
        en cuenta que deberán tener a mano su DNI para que podamos validarlo/s
      </p>
      <p className="text-xs text-gray-600 mt-4">
        Una vez que completen la validación de identidad, avanzaremos con la
        revisión para la apertura de cuenta. Recordá que luego podrás revisar el
        estado de apertura ingresando con mail y contraseña. Te contactaremos
        por e-mail si hay novedades.
      </p>
      <p className="text-xs text-gray-600 mt-4">
        {" "}
        ¡Quedate atento a tu casilla!
      </p>

      <Link
        className="bg-primary-500 py-2 px-4 rounded-md relative top-6 text-white text-xs"
        href={"./estado-apertura"}
      >
        Ver estado de apertura
      </Link>
    </>
  );
}
