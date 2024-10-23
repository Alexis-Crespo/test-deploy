"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Beneficiarios from "../icons/Beneficiarios";
import { useRouter } from "next/navigation";
interface Beneficiary {
  beneficiaryId: number;
  parentBeneficiaryId: number;
  customerId: number;
  firstName: string | null;
  lastName: string | null;
  businessName: string | null;
  cuitCuil: string;
  profession: string;
  maritalStatus: string;
  percentage: number;
  personType: number;
  beneficiaries: Beneficiary[];
}

interface Registro extends Beneficiary {
  beneficiaries: Beneficiary[];
}

export function TableJuridicos() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const router = useRouter();

  const retrieveBeneficiary = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("/api/retrieveBeneficiary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const beneficiarios = response.data;
      const juridicos = beneficiarios.filter(
        (beneficiary: Registro) => beneficiary.personType === 1
      );
      setRegistros(juridicos);
    } catch (error) {
      console.error("Error al recuperar los beneficiarios:", error);
    }
  };

  const hasPersonTypeZero = (registro: Registro): boolean => {
    return registro.beneficiaries.some(
      (beneficiary) => beneficiary.personType === 0
    );
  };

  const allHavePersonTypeZero = (): boolean => {
    return registros.every(hasPersonTypeZero);
  };

  const handleContinueClick = () => {
    if (allHavePersonTypeZero()) {
      router.push("./apoderados");
    }
  };

  useEffect(() => {
    retrieveBeneficiary();
  }, []);

  const formatCuit = (cuit: string) => {
    return `${cuit.slice(0, 2)}-${cuit.slice(2, 10)}-${cuit.slice(10)}`;
  };

  const handleRegisterClick = (beneficiaryId: number) => {
    router.push(`./beneficiarios-juridicos/${beneficiaryId}`);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow></TableRow>
        </TableHeader>
        <TableBody>
          {registros.map((registro) => (
            <TableRow key={registro.beneficiaryId}>
              <TableCell>
                <div className="flex items-center space-x-4">
                  {hasPersonTypeZero(registro) ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="path-1-inside-1_2959_21059" fill="white">
                        <path d="M21.875 11C21.875 17.0061 17.0061 21.875 11 21.875C4.9939 21.875 0.125 17.0061 0.125 11C0.125 4.9939 4.9939 0.125 11 0.125C17.0061 0.125 21.875 4.9939 21.875 11Z" />
                      </mask>
                      <path
                        d="M7.53001 10.3106C7.14924 9.92981 6.53191 9.92981 6.15115 10.3106C5.77039 10.6913 5.77039 11.3087 6.15115 11.6894L7.53001 10.3106ZM9.84058 14L9.15115 14.6894L9.84058 15.3789L10.53 14.6894L9.84058 14ZM6.15115 11.6894L9.15115 14.6894L10.53 13.3106L7.53001 10.3106L6.15115 11.6894ZM10.53 14.6894L16.53 8.68943L15.1511 7.31057L9.15115 13.3106L10.53 14.6894ZM19.925 11C19.925 15.9291 15.9291 19.925 11 19.925V23.825C18.0831 23.825 23.825 18.0831 23.825 11H19.925ZM11 19.925C6.07086 19.925 2.075 15.9291 2.075 11H-1.825C-1.825 18.0831 3.91695 23.825 11 23.825V19.925ZM2.075 11C2.075 6.07086 6.07086 2.075 11 2.075V-1.825C3.91695 -1.825 -1.825 3.91695 -1.825 11H2.075ZM11 2.075C15.9291 2.075 19.925 6.07086 19.925 11H23.825C23.825 3.91695 18.0831 -1.825 11 -1.825V2.075Z"
                        fill="#008842"
                        mask="url(#path-1-inside-1_2959_21059)"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#979797"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  <div className="flex flex-col">
                    <div className="font-medium">{registro.businessName}</div>
                    <div className="text-sm text-gray-500">
                      {formatCuit(registro.cuitCuil)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  {hasPersonTypeZero(registro) ? (
                    <button
                      onClick={() =>
                        handleRegisterClick(registro.beneficiaryId)
                      }
                      className="text-primary-500 mr-3 flex items-center"
                    >
                      Editar
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                      >
                        <path
                          d="M2 14.6661H14M9.33333 1.33398L12 4.00065L4.66667 11.334H2V8.66732L9.33333 1.33398Z"
                          stroke="#6439FF"
                          strokeWidth="1.33402"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ) : (
                    <div className="flex">
                      <button
                        onClick={() =>
                          handleRegisterClick(registro.beneficiaryId)
                        }
                        className="text-primary-500 mr-3 text-xs"
                      >
                        Registrar beneficiarios
                      </button>
                      <Beneficiarios  fillColor="white" strokeColor="#6439ff" />
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Botón de continuar */}
      <div className="mt-4 flex ">
        <button
          onClick={handleContinueClick}
          disabled={!allHavePersonTypeZero()} // Deshabilita si la condición no se cumple
          className={`px-4 py-2 rounded ${
            allHavePersonTypeZero()
              ? "bg-primary-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </>
  );
}
