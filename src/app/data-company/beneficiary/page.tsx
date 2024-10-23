"use client";
import Beneficiarios from "../../../components/ui/icons/Beneficiarios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";

import { TableDemo } from "@atoms/TableBeneficiary";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BeneficiaryF } from "@atoms/BeneficiaryF";
import { BeneficiaryJuridico } from "@atoms/BenificiaryJuridico";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [isPerson, setIsPerson] = useState(true);

  const token = localStorage.getItem("access_token");

  const [refresh, setRefresh] = useState(0);

  const [isCompany, setIsCompany] = useState({
    juridico: false,
    fisico: false,
  });

  const confirmObject = {
    // meter en un enum
    origin: 3,
  };

  const confirmBeneficiaries = async () => {
    try {
      const response = await axios.post(
        "/api/beneficiary-confirm",
        confirmObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Beneficiarios confirmados.", response.data);

        router.push("./beneficiary-company");
      } else {
        console.log("Error al confirmar:", response.data);
      }
    } catch (error) {
      console.error("Error en la confirmación:", error);
    }
  };

  const managePersonType = () => {
    setIsPerson(!isPerson);
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex-grow  py-8 ">
        <h1 className="font-semibold text-lg">Registrá tus beneficiarios</h1>
        <p className="text-[0.78rem]">
          Deberán ser aquellos beneficiarios finales que cuenten con un 10% o
          más de participación
        </p>

        <div className="mt-6 flex justify-between w-50 md:max-w-[600px]">
          <h1 className="font-semibold text-[0.75rem] md:text-[0.70rem] relative top-2">
            Beneficiarios de invertironline
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <p className="text-primary-500 font-semibold text-[0.75rem] md:text-[0.70rem] flex">
                  Agregar beneficiario{" "}
                  <span className="ml-2">
                    <Beneficiarios fillColor="white" strokeColor="#6439ff" />{" "}
                  </span>
                </p>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
              <SheetHeader className="text-left">
                <SheetTitle>Beneficiario de invertironline</SheetTitle>
                <SheetDescription className="text-xs">
                  Tipo de persona
                </SheetDescription>
                <SheetDescription className="text-sm font-semibold ">
                  Persona {isPerson ? "Fisica" : "Juridica"}{" "}
                  <span
                    onClick={managePersonType}
                    className="text-primary-500 text-xs ml-4 cursor-pointer"
                  >
                    Cambiar
                  </span>
                </SheetDescription>
              </SheetHeader>
              <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-4 w-4 text-violet-500" />
                <span className="sr-only">Close</span>
              </SheetClose>
              {isPerson ? (
                <BeneficiaryF setRefresh={setRefresh} />
              ) : (
                <BeneficiaryJuridico setRefresh={setRefresh} />
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="py-4 rounded-lg border px-2 mt-4 md:max-w-[600px]  min-h-[400px]">
          <TableDemo
            refresh={refresh}
            setIsCompany={setIsCompany}
            setRefresh={setRefresh}
          />
        </div>

        <div className="flex mt-4 items-center md:mb-2">
          {!isCompany.juridico && !isCompany.fisico ? (
            <Link
              href="./apoderados"
              className="text-purple-500 font-semibold text-sm ml-2 cursor-pointer"
            >
              Sin beneficiarios
            </Link>
          ) : (
            <p className="text-gray-400 cursor-default">Sin beneficiarios</p>
          )}

          {isCompany.juridico ? (
            <button onClick={confirmBeneficiaries}>
              <div className="px-4 py-2 ml-6 rounded-lg text-center bg-violet-300 text-white cursor-pointer">
                Continuar
              </div>
            </button>
          ) : isCompany.fisico ? (
            <Link href="./apoderados">
              <div className="px-4 py-2 ml-6 rounded-lg text-center bg-violet-300 text-white cursor-pointer">
                Continuar
              </div>
            </Link>
          ) : (
            <p className="px-4 py-2 ml-6 rounded-lg text-center bg-gray-300 text-gray-400 border-none ">
              Continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
