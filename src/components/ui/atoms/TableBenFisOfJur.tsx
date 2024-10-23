"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

interface Beneficiary {
  beneficiaryId: number;
  firstName: string;
  lastName: string;
  cuitCuil: string;
  percentage: number;
  businessName: string;
  personType: number;
}

interface Registro {
  beneficiaryId: number;
  firstName: string;
  lastName: string;
  cuitCuil: string;
  percentage: number;
  businessName: string;
  personType: number;
  beneficiaries: Beneficiary[]; // Array de beneficiarios dentro del beneficiario principal
}

export function TableBenFisOfJur({ beneficiaryId, refresh, setRefresh }) {
  const [registros, setRegistros] = useState<Registro[]>([]);

  const deleteBeneficiary = async (beneficiaryIdFis: number) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Token recuperado desde front: ", token);
      const response = await axios.post(
        "/api/beneficiary-delete",
        { beneficiaryIdFis },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setRefresh(refresh + 1);
      }

      console.log("Eliminado correctamente:", response.data);
    } catch (error) {
      console.error("Error al eliminar el beneficiario:", error);
    }
  };

  const retrieveBeneficiary = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("/api/retrieveBeneficiary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRegistros(response.data);
    } catch (error) {
      console.error("Error al recuperar los beneficiarios:", error);
    }
  };

  useEffect(() => {
    retrieveBeneficiary();
  }, [refresh]);

  const filteredBeneficiary = registros.find(
    (registro) => registro.beneficiaryId == beneficiaryId
  );

  const beneficiariesToRender = filteredBeneficiary?.beneficiaries || [];

  console.log("Registros que trajo: ", registros);
  console.log("Que filtro ? ", filteredBeneficiary);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60%] text-xs">Nombre y CUIT/CUIL</TableHead>
          <TableHead className="text-xs">% Part</TableHead>
          <TableHead className="text-xs">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiariesToRender.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No hay beneficiarios para mostrar.
            </TableCell>
          </TableRow>
        ) : (
          beneficiariesToRender.map((beneficiary) => (
            <TableRow key={beneficiary.beneficiaryId}>
              <TableCell>
                <div className="flex flex-col">
                  <div className="font-medium">{`${
                    beneficiary.firstName
                      ? `${beneficiary.firstName} ${beneficiary.lastName}`
                      : beneficiary.businessName
                  } `}</div>
                  <div className="text-gray-500">{beneficiary.cuitCuil}</div>
                </div>
              </TableCell>
              <TableCell className="text-center w-[18%] md:w-[25%]">
                {beneficiary.percentage}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 14.6661H14.5M9.83333 1.33398L12.5 4.00065L5.16667 11.334H2.5V8.66732L9.83333 1.33398Z"
                      stroke="#6439FF"
                      strokeWidth="1.33402"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => deleteBeneficiary(beneficiary.beneficiaryId)}
                    className="cursor-pointer"
                  >
                    <path
                      d="M2.49995 3.99993H3.83328M3.83328 3.99993H14.4999M3.83328 3.99993L3.83332 13.334C3.83332 13.6876 3.9738 14.0267 4.22385 14.2768C4.4739 14.5268 4.81303 14.6673 5.16666 14.6673H11.8333C12.1869 14.6673 12.5261 14.5268 12.7761 14.2768C13.0262 14.0267 13.1667 13.6876 13.1667 13.334V4.00065L3.83328 3.99993ZM5.83332 4.00065V2.66732C5.83332 2.31369 5.9738 1.97456 6.22385 1.72451C6.4739 1.47446 6.81303 1.33398 7.16666 1.33398H9.83332C10.187 1.33398 10.5261 1.47446 10.7762 1.72451C11.0262 1.97456 11.1667 2.31369 11.1667 2.66732V4.00065"
                      stroke="#F04438"
                      strokeWidth="1.33402"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
