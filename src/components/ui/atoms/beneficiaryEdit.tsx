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


type BeneficiaryData = {
  firstName: string;
  lastName: string;
  cuitCuil: string;
  profession: string;
  maritalStatus: string;
  percentage: number;
  personType: string;
  street: string;
  streetNumber: string;
  floor?: string;
  apartment?: string;
  city: string;
  state: string;
  pep: boolean;
  birthDate: string; 
  dni: string;
  citizenshipCountry?: number; 
  activity?: string; 
};


type BeneficiaryEditProps = {
  beneficiaryData: BeneficiaryData;
};




export const BeneficiaryEdit = ({ beneficiaryData }: BeneficiaryEditProps) => {
  const onEdit = async () => {};

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    //resolver: zodResolver(beneficiarySchema),
    defaultValues: {
      firstName: beneficiaryData.firstName,
      lastName: beneficiaryData.lastName, // corregido typo de "lasttName"
      businessName: "", // si no hay dato asociado en beneficiaryData
      cuitCuil: beneficiaryData.cuitCuil,
      profession: beneficiaryData.profession,
      maritalStatus: beneficiaryData.maritalStatus,
      percentage: beneficiaryData.percentage,
      personType: beneficiaryData.personType, // no lo mencionaste pero asumo que está en beneficiaryData
      street: beneficiaryData.street,
      streetNumber: beneficiaryData.streetNumber,
      floor: beneficiaryData.floor,
      apartment: beneficiaryData.apartment,
      city: beneficiaryData.city,
      state: beneficiaryData.state,
      pep: beneficiaryData.pep,
      birthDate: beneficiaryData.birthDate,
      dni: beneficiaryData.dni,
      citizenshipCountry: beneficiaryData.citizenshipCountry || 54, // Valor predeterminado si es undefined
      activity: beneficiaryData.activity, // no mencionado pero añadido por consistencia
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <p className="text-primary-500 font-semibold text-[0.75rem] md:text-[0.70rem] flex">
            Agregar beneficiario{" "}
            <span className="ml-2">
              <Beneficiarios fillColor="white" strokeColor="#6439ff" />{" "}
            </span>
          </p>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
        <SheetHeader className="text-left">
          <SheetTitle>Beneficiario de invertironline</SheetTitle>
          <SheetDescription>Tipo de persona</SheetDescription>
          <SheetDescription>
            Persona Fisica{" "}
            <span className="text-primary-500 text-xs ml-4 ">Cambiar</span>
          </SheetDescription>
        </SheetHeader>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4 text-violet-500" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onEdit)}>
          {/* CUIT/CUIL */}
          <div className="space-y-1">
            <Label htmlFor="cuit" className="text-xs font-semibold">
              CUIT/CUIL*
            </Label>
            <Input
              id="cuitCuil"
              placeholder="Ingresá el número sin guiones"
              {...register("cuitCuil")}
            />
            {errors.cuit && (
              <p className="text-red-500 text-xs">{errors.cuitCuil?.message}</p>
            )}
          </div>

          {/* Nombres y Apellidos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-xs font-semibold">
                Nombres*
              </Label>
              <Input
                id="firstName"
                placeholder="Ej: Juan"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-xs font-semibold">
                Apellidos*
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Ej: Perez"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* DNI */}
          <div className="space-y-1">
            <Label htmlFor="dni" className="text-xs font-semibold">
              DNI*
            </Label>
            <Input
              id="dni"
              name="dni"
              placeholder="Ej: 24785665"
              {...register("dni")}
            />
            {errors.dni && (
              <p className="text-red-500 text-xs">{errors.dni.message}</p>
            )}
          </div>

          {/* Fecha de Nacimiento y Estado Civil */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="birthDate" className="text-xs font-semibold">
                Fecha de nacimiento*
              </Label>
              <Input type="date" id="birthDate" {...register("birthDate")} />
              {errors.birthDate && (
                <p className="text-red-500 text-xs">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="maritialStatus" className="text-xs font-semibold">
                Estado civil*
              </Label>
              <MartialStatus
                control={control}
                name="maritialStatus"
                setValue={setValue}
              />
              {errors.maritialStatus && (
                <p className="text-red-500 text-xs">
                  {errors.martialStatus.message}
                </p>
              )}
            </div>
          </div>

          {/* Ocupación */}
          <div className="space-y-1 relative -top-2">
            <Label htmlFor="profession" className="text-xs font-semibold">
              Ocupación*
            </Label>
            <Ocupation
              control={control}
              name="profession"
              setValue={setValue}
            />
            {errors.profession && (
              <p className="text-red-500 text-xs">
                {errors.profession.message}
              </p>
            )}
          </div>

          {/* Ubicación */}
          <Location
            defaultProvinceId={watch("state")}
            defaultCityId={watch("city")}
            setValue={setValue}
            onSelectProvince={(state) => setValue("state", state)}
            onSelectCity={(city) => setValue("city", city)}
          />
          {errors.state && (
            <p className="text-red-500 text-xs">{errors.state.message}</p>
          )}
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}

          {/* Calle y Número */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="street" className="text-xs font-semibold">
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
              <Label htmlFor="streetNumber" className="text-xs font-semibold">
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
          <div className="space-y-1">
            <Label htmlFor="floor" className="text-xs font-semibold">
              Piso y departamento
            </Label>
            <Input
              id="floor"
              placeholder="Ingresá piso y departamento"
              {...register("floor", {
                setValueAs: (value) => (value ? Number(value) : undefined),
              })}
            />
            {errors.apartmentFloor && (
              <p className="text-red-500 text-xs">{errors.floor.message}</p>
            )}
          </div>

          {/* Porcentaje de participación */}
          <div className="space-y-1">
            <Label htmlFor="percentage" className="text-xs font-semibold">
              Porcentaje de participación*
            </Label>
            <Input
              id="percentage"
              placeholder="Ingresá el porcentaje"
              type="text"
              min={0}
              max={100}
              {...register("percentage", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)), // Convertir a número
              })}
            />
            {errors.percentage && (
              <p className="text-red-500 text-xs">
                {errors.percentage.message}
              </p>
            )}
          </div>

          {/* Es PEP */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold">¿Es PEP?*</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1" // El valor sigue siendo una cadena en el input
                  className="form-radio"
                  {...register("pep", {
                    setValueAs: (value) => parseInt(value), // Convierte la cadena en número
                  })}
                />
                <span>Sí</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0" // El valor sigue siendo una cadena en el input
                  className="form-radio"
                  {...register("pep", {
                    setValueAs: (value) => Number(value), // Convierte la cadena en número
                  })}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <SheetFooter>
            {/* Condición para desactivar el botón si hay errores */}
            <button
              type="submit"
              className={`relative top-8 py-2 px-6 rounded-lg text-white ${
                Object.keys(errors).length === 0
                  ? "bg-primary-500"
                  : "bg-gray-400"
              }`}
              disabled={Object.keys(errors).length !== 0}
            >
              Registrar Beneficiarios
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
