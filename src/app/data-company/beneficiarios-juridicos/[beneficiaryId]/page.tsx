"use client";

import { TableBenFisOfJur } from "@atoms/TableBenFisOfJur";
import { useParams } from "next/navigation";
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

import { Button } from "@/components/ui/button";

import { X } from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { BeneficiaryJuridico } from "@atoms/BenificiaryJuridico";
import Beneficiarios from "@/components/ui/icons/Beneficiarios";
import { BeneficiaryFofJ } from "@atoms/BeneficiaryFofJ";

export default function page() {
  const { beneficiaryId } = useParams();
  const [refresh, setRefresh] = useState(0);
  const router = useRouter();
  const [isPerson, setIsPerson] = useState(true);
  const token = localStorage.getItem("access_token");
  const managePersonType = () => {
    setIsPerson(!isPerson);
  };

  const confirmObject = {
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

        router.push("/data-company/beneficiary-company");
      } else {
        console.log("Error al confirmar:", response.data);
      }
    } catch (error) {
      console.error("Error en la confirmación:", error);
    }
  };

  return (
    <div className="">
      <Sheet>
        <div className="w-full flex justify-end px-2">
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
        </div>
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
            <BeneficiaryFofJ
              beneficiaryId={beneficiaryId}
              setRefresh={setRefresh}
            />
          ) : (
            <BeneficiaryJuridico />
          )}
        </SheetContent>
      </Sheet>
      <div className="py-4 rounded-lg border px-2 mt-4 md:max-w-[600px]  min-h-[400px]">
        <TableBenFisOfJur
          beneficiaryId={beneficiaryId}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>
      <button onClick={confirmBeneficiaries}>
        <div className="px-4 py-2  mt-2 rounded-lg text-center bg-violet-300 text-white cursor-pointer">
          Guardar
        </div>
      </button>
    </div>
  );
}
