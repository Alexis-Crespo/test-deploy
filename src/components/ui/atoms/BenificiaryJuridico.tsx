"use client";
import Beneficiarios from "../../../components/ui/icons/Beneficiarios";
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
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { MartialStatus } from "@atoms/MartialStatus";
import { Ocupation } from "@atoms/Ocupation";
import { Location } from "@molecules/locationNationality/Location";
import { MainActivitySelect } from "./MainActivitySelect";
import { LocationForm } from "./LocationForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export const BeneficiaryJuridico = ({ setRefresh }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      personType: 1, // Persona jurídica
      businessName: "",
      cuitCuil: "",
      street: "",
      streetNumber: undefined,
      floor: undefined,
      apartment: "",
      city: undefined,
      state: undefined,
      percentage: undefined,
      activity: undefined,
    },
  });

  const formValues = watch();

  console.log("FormValues Juridico: ", formValues);

  const addBeneficiary = async (
    requestBody: BeneficiaryJRequest
  ): Promise<void> => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post("/api/beneficiary", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Beneficiario adherido", response.data);
        setRefresh((prevState) => prevState + 1);
      }
    } catch (error) {
      console.error("Error al adherir un beneficiario:", error);
    }
  };

  const onSubmit = (data: any) => {
    addBeneficiary(data);
  };

  return (
    <form className="mt-2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <Label htmlFor="cuit" className="text-xs ">
          CUIT*
        </Label>
        <Input
          id="cuitCuil"
          placeholder="Ingresá el número sin guiones"
          {...register("cuitCuil")}
        />
        {errors.cuitCuil && (
          <p className="text-red-500 text-xs">{errors.cuitCuil.message}</p>
        )}
      </div>

      {/* Razon Social */}
      <div className="space-y-1">
        <Label htmlFor="businessName" className="text-xs ">
          Razón Social*
        </Label>
        <Input
          id="businessName"
          placeholder="Ingresá el nombre de la empresa"
          {...register("businessName")}
        />
        {errors.businessName && (
          <p className="text-red-500 text-xs">{errors.businessName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="activity" className="text-xs ">
          Actividad Principal*
        </Label>

        <MainActivitySelect setValue={setValue} defaultValue={0} />

        {errors.activity && (
          <p className="text-red-500 text-xs mt-1">{errors.activity.message}</p>
        )}
      </div>

      <LocationForm
        defaultProvinceId={2}
        defaultCityId={1}
        setValue={setValue}
        onSelectProvince={(state) => setValue("state", state)}
        onSelectCity={(city) => setValue("city", city)} // Actualiza cityId en el formulario
      />

      {/* Calle y Número */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="street" className="text-xs ">
            Calle*
          </Label>
          <Input
            id="street"
            placeholder="Ej: Humbold"
            {...register("street")}
          />
          {errors.street && (
            <p className="text-red-500 text-xs">{errors.street.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="streetNumber" className="text-xs ">
            Número*
          </Label>
          <Input
            id="streetNumber"
            placeholder="Ej: 1550"
            {...register("streetNumber", {
              setValueAs: (value) => (value ? Number(value) : undefined),
            })}
          />
          {errors.streetNumber && (
            <p className="text-red-500 text-xs">
              {errors.streetNumber.message}
            </p>
          )}
        </div>
      </div>

      {/* Piso y Departamento */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="floor" className="text-xs">
            Piso
          </Label>
          <Input
            id="floor"
            placeholder="Piso"
            {...register("floor", {
              setValueAs: (value) => (value ? Number(value) : undefined),
            })}
          />
          {errors.floor && (
            <p className="text-red-500 text-xs">{errors.floor.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="apartment" className="text-xs ">
            Departamento
          </Label>
          <Input
            id="apartment"
            placeholder="Depto."
            {...register("apartment")}
          />
          {errors.apartment && (
            <p className="text-red-500 text-xs">{errors.apartment.message}</p>
          )}
        </div>
      </div>

      {/* Porcentaje de participación */}
      <div className="space-y-1">
        <Label htmlFor="percentage" className="text-xs ">
          Porcentaje de participación*
        </Label>
        <Input
          id="percentage"
          placeholder="Ingresá el porcentaje"
          type="text"
          min={0}
          max={100}
          {...register("percentage", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
        />
        {errors.percentage && (
          <p className="text-red-500 text-xs">{errors.percentage.message}</p>
        )}
      </div>
      <SheetClose>
        <button
          type="submit"
          className={`relative top-8 py-2 px-6 rounded-lg text-white ${
            Object.keys(errors).length === 0 ? "bg-primary-500" : "bg-gray-400"
          }`}
          disabled={Object.keys(errors).length !== 0}
        >
          Registrar Beneficiario
        </button>
      </SheetClose>
    </form>
  );
};

type BeneficiaryJRequest = {
  personType: number;
  businessName: string;
  cuitCuil: string;
  street: string;
  streetNumber: number;
  floor?: number;
  apartment?: string;
  city: number;
  state: number;
  percentage: number;
  activity: number;
};
