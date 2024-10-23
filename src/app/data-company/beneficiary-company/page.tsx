"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { TableJuridicos } from "@atoms/TableJuridicos";
import Back from "@atoms/Back";
export default function Page() {
  const router = useRouter();

  const [isPerson, setIsPerson] = useState(true);

  const [isCompany, setIsCompany] = useState({
    juridico: false,
    fisico: false,
  });

  const managePersonType = () => {
    setIsPerson(!isPerson);
  };

  return (
    <>
      <div className="relative -top-10">
        <Back goTo="./beneficiary" />
      </div>
      <div className="min-h-screen flex flex-col ">
        <div className="flex-grow  py-4 ">
          <h1 className=" text-lg">Registrá otros beneficiarios</h1>
          <p className="text-[0.78rem]">
            Deberán ser todos los beneficiarios de las personas jurídicas
            declaradas.
          </p>

          <h1 className=" text-sm md:text-[0.70rem] relative mt-2 ">
            Beneficiarios de invertironline
          </h1>
          <TableJuridicos />
        </div>
      </div>
    </>
  );
}
