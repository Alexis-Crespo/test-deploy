"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTable from "../icons/EmptyTable";
import Trash from "../icons/Trash";

interface TableApoderadoProps {
  apoderados: string[]; // Recibir los correos de los apoderados
  handlerDelete: (email: string) => void; // Función para eliminar un correo
}

export function StatusApertura({
  apoderados,
  handlerDelete,
}: TableApoderadoProps) {
  return (
    <div className="py-4 rounded-lg border px-2 mt-4 md:max-w-[600px] min-h-[400px]">
      <div className="w-full max-w-2xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Estado de apoderados</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apoderados.length > 0 ? (
              apoderados.map((email, index) => (
                <TableRow key={index}>
                  <TableCell className="px-3 text-xs">{email}</TableCell>
                  <TableCell>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full relative left-14"
                      aria-label="Eliminar apoderado"
                      onClick={() => handlerDelete(email)} // Llamar a la función de eliminar
                    >
                      <Trash handleDelete={handlerDelete} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex flex-col items-center justify-center py-12">
                    <EmptyTable />
                    <p className="mt-4 text-gray-600 text-lg tracking-wide">
                      Ingresa previamente apoderados
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
