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
import EmptyTable from "../icons/EmptyTable";

interface Registro {
  beneficiaryId: number;
  firstName: string;
  lastName: string;
  cuitCuil: string;
  percentage: number;
  businessName: string;
  personType: number;
}

export function TableDemo({ setIsCompany, refresh, setRefresh }) {
  const [registros, setRegistros] = useState<Registro[]>([]);
  console.log("Registros de tableDemo: ", registros);

  const deleteBeneficiary = async (beneficiaryId) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Token recuperado desde front: ", token);
      const response = await axios.post(
        "/api/beneficiary-delete",
        { beneficiaryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        console.log("deleteBeneficiary..");
        console.log("¿Es setRefresh una función?", typeof setRefresh); // <--- Agregar esto
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
      console.log("Token recuperado desde front: ", token);
      const response = await axios.get("/api/retrieveBeneficiary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const beneficiarios = response.data;
      setRegistros(beneficiarios);

      const companyStatus = {
        juridico: beneficiarios.some(
          (beneficiary) => beneficiary.personType === 1
        ),
        fisico: beneficiarios.some(
          (beneficiary) => beneficiary.personType === 0
        ),
      };

      setIsCompany(companyStatus);
    } catch (error) {
      console.error("Error al recuperar los beneficiarios:", error);
    }
  };

  useEffect(() => {
    retrieveBeneficiary();
  }, [refresh]);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const sortedRegistros = [...registros].sort((a, b) => {
    if (sortOrder === null) return 0;
    return sortOrder === "asc"
      ? a.percentage - b.percentage
      : b.percentage - a.percentage;
  });

  const handleSort = () => {
    setSortOrder((current) => {
      if (current === null) return "asc";
      if (current === "asc") return "desc";
      return null;
    });
  };

  const handleDelete = (beneficiaryId: number) => {
    setRegistros((prevRegistros) =>
      prevRegistros.filter(
        (registro) => registro.beneficiaryId !== beneficiaryId
      )
    );
  };

  return (
    <>
      {registros.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full w-full text-center relative top-16">
          <EmptyTable />
          <p className="mt-4">Agregá los beneficiarios de la empresa</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%] text-xs">
                Nombre y CUIT/CUIL
              </TableHead>
              <TableHead className="cursor-pointer" onClick={handleSort}>
                <div className="flex items-center text-xs">
                  % Part
                  <div className="ml-2 flex flex-col">
                    <svg
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        sortOrder === "asc"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.66724 0.137832C3.85102 -0.045944 4.14898 -0.045944 4.33276 0.137832L7.86217 3.66724C8.04594 3.85102 8.04594 4.14898 7.86217 4.33276C7.67839 4.51653 7.38043 4.51653 7.19666 4.33276L4 1.1361L0.803344 4.33276C0.619568 4.51653 0.321608 4.51653 0.137832 4.33276C-0.045944 4.14898 -0.045944 3.85102 0.137832 3.66724L3.66724 0.137832Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`mt-[2px] ${
                        sortOrder === "desc"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.66724 4.86217C3.85102 5.04594 4.14898 5.04594 4.33276 4.86217L7.86217 1.33276C8.04594 1.14898 8.04594 0.85102 7.86217 0.667244C7.67839 0.483468 7.38043 0.483468 7.19666 0.667244L4 3.8639L0.803344 0.667244C0.619568 0.483468 0.321608 0.483468 0.137832 0.667244C-0.045944 0.85102 -0.045944 1.14898 0.137832 1.33276L3.66724 4.86217Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </TableHead>
              <TableHead>
                <p className="text-xs">Acciones</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRegistros.map((registro) => (
              <TableRow key={registro.beneficiaryId}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium">{`${
                      registro.firstName
                        ? `${registro.firstName} ${registro.lastName}`
                        : registro.businessName
                    } `}</div>
                    <div className="text-gray-500">{registro.cuitCuil}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center w-[18%] md:w-[25%]">
                  {registro.percentage}
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
                    <div className="cursor-pointer">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        onClick={() =>
                          deleteBeneficiary(registro.beneficiaryId)
                        }
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.49995 3.99993H3.83328M3.83328 3.99993H14.4999M3.83328 3.99993L3.83332 13.334C3.83332 13.6876 3.9738 14.0267 4.22385 14.2768C4.4739 14.5268 4.81303 14.6673 5.16666 14.6673H11.8333C12.1869 14.6673 12.526 14.5268 12.7761 14.2768C13.0261 14.0267 13.1666 13.6876 13.1666 13.334V3.99993M10.5 3.99993V2.6666C10.5 2.31297 10.3595 1.97384 10.1094 1.72379C9.85937 1.47374 9.52024 1.33326 9.16661 1.33326H7.83328C7.47965 1.33326 7.14052 1.47374 6.89047 1.72379C6.64042 1.97384 6.49995 2.31297 6.49995 2.6666V3.99993M7.83328 7.33326V11.3333M9.83328 7.33326V11.3333"
                          stroke="#F04438"
                          strokeWidth="1.33402"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
