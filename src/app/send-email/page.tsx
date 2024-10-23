"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Verification() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      router.push("./data-company/cuit");
    }
  }, [router]);

  const storedEmail = sessionStorage.getItem("email");

  return (
    <>
      <h1 className="font-semibold text-xl mt-12">
        Te enviamos un mail para validar tu cuenta.
      </h1>
      <p className="text-gray-600 mt-4">
        Enviamos un correo a{" "}
        <span className="font-semibold">{storedEmail}</span> para que valides tu
        email. Necesitamos que hagas click en el enlace para continuar con la
        apertura de tu cuenta.
      </p>
      <p className="font-semibold text-sm mt-4">¿No recibiste el email?</p>
      <p className="text-primary-500 font-semibold mt-2">Reenviar email</p>
    </>
  );
}
