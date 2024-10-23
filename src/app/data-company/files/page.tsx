"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/validations/companySchema";
import Input from "@atoms/Input";
import { Select } from "@atoms/Select";
import Link from "next/link";
import { InputFile } from "@atoms/InputFile";
import Back from "@atoms/Back";

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  return (
    <>
      {" "}
      <div className="relative -top-44 lg:-top-40">
        <Back goTo="./tax" />
      </div>
      <div>
        <h1 className="text-lg font-semibold md:-mt-8">
          Subí documentacion de la empresa
        </h1>
        <p className="text-[0.7rem] mt-2">
          Asegurate de que sean en los siguientes formatos .png, .pdf, .jpg,
          .jpeg.
        </p>
      </div>
      <div className="mt-3">
        <form action="">
          <span className="text-sm font-semibold ">
            Constancia de inscripcion de AFIP*
          </span>
          <p className="text-[0.7rem] mb-1">
            {" "}
            Tené en cuenta que debe ser la que está vigente.
          </p>

          <InputFile documentType="30" />

          <div className="mt-3">
            <span className="text-sm font-semibold ">Estatuto*</span>
            <p className="text-[0.7rem] mb-1 ">
              {" "}
              Tené en cuenta que debe ser certificado por escribano.
            </p>

            <InputFile documentType="24" />
          </div>

          <div className="mt-6">
            <h2 className="text-md font-semibold ">
              Documentación complementaria
            </h2>
            <p className="text-[0.7rem] mt-1">
              Solo si corresponde subí la siguiente documentacion en formato
              .png, .pdf, .jpg, .jpeg.
            </p>
          </div>
          <div className="mt-3">
            <span className="text-sm font-semibold ">
              Acta de designación de autoridades*
            </span>
            <p className="text-[0.7rem] mb-1 ">
              {" "}
              Solo en caso de que no forme parte del estatuto.
            </p>

            <InputFile documentType="25" />
          </div>
          <div className="mt-3">
            <span className="text-sm font-semibold ">Poder vigente*</span>
            <p className="text-[0.7rem] mb-1 ">
              {" "}
              Solo en caso de que no forme parte del estatuto.
            </p>

            <InputFile documentType="26" />
          </div>
          <div className="mt-3">
            <span className="text-sm font-semibold ">
              Último balance comercial*
            </span>
            <p className="text-[0.7rem] mb-1 ">
              {" "}
              Solo si tu empresa tiene mas de un año de antiguedad.
            </p>

            <InputFile documentType="27" />
          </div>
          <div className="mt-3">
            <span className="text-sm font-semibold ">
              Últimas 6 declaraciones juradas IVA con pago VEP
            </span>
            <p className="text-[0.7rem] mb-1">
              {" "}
              Solo si tu empresa no tiene el último balance comercial.
            </p>

            <InputFile documentType="28" />
          </div>
          <div className="mt-3">
            <span className="text-[0.84rem] font-semibold mb-1">
              Registro de accionistas o actas de órganos de administración o
              cesión de cuotas
            </span>

            <InputFile documentType="29" />
          </div>
          <div className="mt-3">
            <span className="text-sm font-semibold ">Otros</span>
            <p className="text-[0.7rem] mb-1 ">
              Cualquier otro documento de origen de fondos que quieras
              compartirnos
            </p>

            <InputFile documentType="31" />
          </div>

          <Link
            className="relative top-8 bg-primary-500 py-2 px-6 rounded-lg text-white"
            href={"./ddjj"}
          >
            {" "}
            Continuar
          </Link>
        </form>
      </div>
    </>
  );
}
