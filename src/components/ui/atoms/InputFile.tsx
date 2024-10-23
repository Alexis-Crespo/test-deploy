"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Trash from "../icons/trash";
import Upload from "../icons/Upload";
import FileUpload from "../icons/FileUpload";
import axios from "axios";
import { Spinner } from "./Spinner";

interface InputFileProps {
  documentType: string; // Prop para aceptar el tipo de documento
}

export function InputFile({ documentType }: InputFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Estado para manejar la carga
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null); // Estado para manejar el éxito de la carga
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("access_token");

  // Función para manejar el cambio de archivo
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Inicia la carga del archivo al endpoint
      await uploadFile(selectedFile);
    }
  };

  // Función para enviar el archivo al endpoint interno
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file); // Añade el archivo
    formData.append("documentType", documentType); // Añade el tipo de documento
    formData.append("origin", "1"); // Añade el valor de origen

    try {
      setIsUploading(true); // Estado de carga
      const response = await axios.post("/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Ajusta si tienes el token disponible
        },
      });

      if (response.status === 200) {
        setUploadSuccess(true); // Éxito en la carga
        console.log("Archivo subido correctamente", response.data);
      } else {
        setUploadSuccess(false); // Error en la carga
        console.error("Error al subir el archivo");
      }
    } catch (error) {
      setUploadSuccess(false); // Error en la carga
      console.error("Error al subir el archivo", error);
    } finally {
      setIsUploading(false); // Termina el estado de carga
    }
  };

  // Función para abrir el selector de archivos
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Función para eliminar el archivo seleccionado
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  // Confirmar eliminación del archivo
  const confirmDelete = () => {
    setFile(null);
    setIsDeleteDialogOpen(false);
    setUploadSuccess(null); // Resetea el estado de éxito de la carga
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid w-fullmax-w-sm items-center gap-1.5">
      <div className="relative">
        <Input
          id="picture"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer w-96 md:w-[97%] border-2 ${
            file
              ? "border-[#008842]"
              : "border-transparent bg-white shadow-sm ring-1 ring-inset ring-gray-300"
          }`}
          onClick={handleClick}
        >
          <span
            className={`truncate ${
              file ? "text-gray-400 text-xs" : "text-gray-400 text-sm"
            }`}
          >
            {file ? file.name : "Subí tu archivo"}
          </span>
          {file ? <Trash handleDelete={handleDelete} /> : <Upload />}
        </div>
      </div>
      {file && uploadSuccess === true && (
        <div className="flex text-[#008842] items-center font-thin text-sm">
          <FileUpload />
          <span className="flex-grow -mt-0.5 font-light opacity-85 ml-1">
            Archivo subido correctamente
          </span>
        </div>
      )}
      {file && uploadSuccess === false && (
        <div className="flex text-red-500 items-center font-thin text-sm">
          <span className="flex-grow -mt-0.5 font-light opacity-85 ml-1">
            Error al subir el archivo
          </span>
        </div>
      )}
      {isUploading && (
        <div className="flex text-blue-500 items-center font-thin text-sm">
          <Spinner size="small" className="text-primary-500" />
        </div>
      )}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[350px] p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              ¿Estás seguro que quieres eliminar este archivo?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="text-violet-500 hover:text-violet-600 border-none">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-violet-500 text-white rounded-lg hover:bg-violet-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
