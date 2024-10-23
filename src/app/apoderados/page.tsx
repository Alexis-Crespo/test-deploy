"use client";
import Dni from "@/components/ui/icons/Dni";
import Selfies from "@/components/ui/icons/Selfies";
import Button from "@atoms/Button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="lg:max-w-[70%] mx-auto text-center  relative 2xl:left-40 2xl:max-w-[90%] ">
        <h1 className="mt-16  font-semibold text-xl">
          ¡Vamos a validar tu identidad!
        </h1>
        <p className="text-gray-400 mt-2 text-md">
          Para completar este paso vas a necsitar:
        </p>
        <div className="w-[500px] lg:w-[600px] relative right-10 2xl:w-[800px] justify-center items-center">
          <div className="flex justify-center items-center gap-x-8">
            {/* Grupo DNI */}
            <div className=" h-[250px]  flex flex-col items-center justify-center">
              <div className="">
                <Dni />
              </div>
              <p className="text-xs mt-2 text-center relative top-11">
                Subir fotos de tu DNI, frente y dorso
              </p>
            </div>

            {/* Grupo Selfies */}
            <div className="flex flex-col items-center h-[250px]">
              <Selfies />
              <p className="text-xs mt-2 text-center w-[150px] ">
                Subir fotos dos selfies, una sonriendo y una neutral
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center relative top-6 mx-auto left-6 2xl:left-44">
        <Link
          className="bg-primary-500 py-1.5 px-8 rounded-lg text-white w-[60%] max-w-[240px] block text-center"
          href={"apoderados/upload/front-dni"}
        >
          Continuar
        </Link>
      </div>
    </>
  );
}
/*
 */
