"use client";

import Dni from "@/components/ui/icons/Dni";
import InvalidDni from "@/components/ui/icons/InvalidDni";
import Error from "@/components/ui/icons/Error";
import Download from "@/components/ui/icons/Download";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Importa el hook del contexto
import { useApoderadoContext } from "@/context/ApoderadoContext";

export default function Home() {
  const [photoPreview, setPhotoPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Accede a las funciones del contexto
  const { foto, renaper, setFoto } = useApoderadoContext();

  console.log("Estados, Foto: ", foto, " y renaper: ", renaper);

  const tokenProvisorio =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZENsaWVudGUiOiIxMTk3MzQ1IiwiSWRBcG9kZ" +
    "XJhZG8iOiI4NzcxIiwic2NvcGUiOiJSLU9OQi1PTkJPQVJESU5HIn0.lm01p4YnKDoHpfyCzkxRSe9IvBgi" +
    "fsX0GM4kWlSUikk";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadAnotherPhoto = () => {
    setPhotoPreview("");
    fileInputRef.current.value = "";
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("origin", "3");
    formData.append("token", tokenProvisorio);

    try {
      const response = await axios.post("/api/apoderado-front-dni", formData);
      const status = response.data.status;

      if (status === 200) {
        setFoto(true);
        router.push("./back-dni");
      } else if (status === 260 || status === 400) {
        setIntentos((prev) => prev + 1);
        setFoto(false); // contexto
        handleUploadAnotherPhoto();
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setIntentos((prev) => prev + 1);
      setFoto(false); // contexto
      handleUploadAnotherPhoto();
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithoutValidation = () => {
    router.push("./back-dni");
  };

  const renderIconOrPreview = () => {
    if (photoPreview) {
      return (
        <div className="relative -top-2">
          <img
            src={photoPreview}
            alt="Previsualización"
            className="w-[280px] h-[180px] object-cover rounded-xl"
          />
        </div>
      );
    }

    if (intentos === 0) {
      return <Dni />;
    } else if (intentos === 1) {
      return <InvalidDni />;
    } else {
      return <Error />;
    }
  };

  return (
    <>
      <div className="mx-auto h-72 text-center relative w-[350px] 2xl:left-40 2xl:max-w-[90%]">
        <h1 className="mt-16 font-semibold text-xl">
          {intentos === 0 && !selectedFile
            ? "Subí una foto del frente del DNI"
            : intentos === 1 && !selectedFile
            ? "¡Ups! No pudimos validar la foto"
            : intentos >= 2 && !selectedFile
            ? "¡Ups! Ocurrió un error"
            : "Confirmanos si la foto salió bien"}
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          {intentos === 0 && !selectedFile
            ? "Para completar este paso vas a necesitar:"
            : intentos === 1 && !selectedFile
            ? "No te preocupes, puedes intentarlo de nuevo."
            : intentos >= 2 && !selectedFile
            ? "No pudimos validar el frente del DNI"
            : "Te pedimos que verifiques si la imagen se ve nítida y sin reflejo de las luces. Si es así presiona 'Siguiente'."}
        </p>

        <div className="w-[300px] relative left-8 top-8 h-[200px] flex flex-col items-center py-1">
          {renderIconOrPreview()}
          {intentos === 1 && !selectedFile ? (
            <div className="mt-4 space-y-2 relative top-4">
              <p className="text-gray-500 text-sm">
                <span className="text-base">•</span> Utilizar un fondo liso para
                mejorar el enfoque.
              </p>
              <p className="text-gray-500 text-sm">
                <span className="text-base">•</span> Verificar que en la foto se
                vea la imagen completa y esté centrada.
              </p>
            </div>
          ) : null}
        </div>

        {intentos === 0 && !selectedFile ? (
          <div className="w-[350px] text-center text-sm relative -top-8">
            <p>
              <span className="text-base">•</span> Contar con DNI original (no
              fotocopia)
            </p>
            <p>
              <span className="text-base">•</span> Utilizar un fondo liso para
              mejorar el enfoque
            </p>
            <p>
              <span className="text-base">•</span> Verificar que en la foto se
              vea la imagen completa y esté centrada
            </p>
          </div>
        ) : null}

        {intentos >= 2 && !selectedFile ? (
          <div className="mt-4 space-y-2 relative -top-10 left-2">
            <p className="text-gray-500 text-sm">
              Podés intentar con una nueva foto o continuar sin validar con el
              proceso de apertura. En este último caso, la cuenta podría no
              activarse en el momento.
            </p>
            {/* Botón de continuar sin validación */}
          </div>
        ) : null}
      </div>

      <div className="w-full flex justify-center relative top-20 mx-auto left-6 2xl:left-44">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {selectedFile && photoPreview ? (
          <div className="flex w-[350px] h-16 justify-between gap-x-4 relative -top-8">
            <button
              onClick={handleUploadAnotherPhoto}
              className="py-2 flex justify-center gap-x-3 rounded-lg text-primary-500 w-[200px] h-[40px] text-center"
            >
              Cargar otra foto
            </button>
            <button
              onClick={handleSubmit}
              className={`bg-primary-500 py-2 px-10 flex justify-center gap-x-3 text-sm items-center rounded-lg text-white w-[180px] h-[42px] text-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Subiendo..." : "Siguiente"}
            </button>
          </div>
        ) : (
          <div className="flex w-[400px] h-16 justify-center relative -top-8">
            <button
              onClick={handleUploadPhotoClick}
              className={`${
                intentos >= 2 && !selectedFile
                  ? "bg-white text-primary-500"
                  : "bg-primary-500 text-white"
              } py-2 px-6 flex justify-center gap-x-3 rounded-lg h-10 max-w-[240px] relative right-2 top-2`}
            >
              <p className="ml-3 text-sm relative top-1">
                {intentos >= 2 && !selectedFile
                  ? "Cargar otra foto"
                  : "Subir foto"}
              </p>
              <Download />
            </button>
            {intentos >= 2 && !selectedFile && (
              <button
                onClick={handleContinueWithoutValidation}
                className="bg-primary-500 text-xs py-2 px-6 rounded-lg text-white h-10 max-w-[240px] relative top-2 mb-4"
              >
                Continuar sin validación
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
