"use client";
import Button from "@atoms/Button";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="lg:max-w-[70%]">
        <h1 className="mt-16  font-semibold text-xl">
          ¡Qué bueno que estés acá!
        </h1>
        <p className="text-gray-400 mt-2 text-md">
          Desde IOL invertironline vas a poder potenciar todas tus inversiones.
        </p>
        <Button
          text="Ingresar a mi cuenta"
          type="button"
          redirectTo={
            "https://micuenta.invertironline.com/ingresar?_gl=1*19q0a8s*_gcl_aw*R0NMLjE3MjI2NDU5MTkuQ2owS0NRandoN0sxQmhDWkFSSXNBS09yVnFHRkdsWERoOUFhck9EcnhvT3UtUWwxeUFGYTEyRjNWS01qVlk3QkxtbHlzbEViSlA1bVowa2FBbEFjRUFMd193Y0I.*_gcl_au*MTQ0OTE0NjU2OS4xNzIwODEzMzUw*_ga*ODAxMTMzNDMyLjE3MjA4MTMzNTA.*_ga_3ZJ55WFL39*MTcyNTYwMDU0MS42LjAuMTcyNTYwMDU0MS42MC4wLjg2MDUwMTUyNQ.."
          }
        />
        <Button
          text="Abrir cuenta"
          type="button"
          color={"bg-shadow"}
          textColor="text-primary-500"
          redirectTo="./choose-type"
        />
      </div>
    </>
  );
}
