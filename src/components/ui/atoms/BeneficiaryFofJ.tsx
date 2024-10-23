"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MartialStatus } from "@atoms/MartialStatus";
import { Ocupation } from "@atoms/Ocupation";
import { Location } from "@molecules/locationNationality/Location";
import axios from "axios";
import { useRouter } from "next/navigation";

import { beneficiaryFSchema } from "@/validations/beneficiaryFSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDateToISO } from "@/components/utils/parseDate";
import { SheetClose } from "@/components/ui/sheet";

export const BeneficiaryFofJ = ({ beneficiaryId, setRefresh }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(beneficiaryFSchema),
    defaultValues: {
      personType: 0,
      firstName: "",
      lastName: "",
      cuitCuil: "",
      dni: undefined,
      birthDate: "",
      profession: undefined,
      maritalStatus: undefined,
      street: "",
      streetNumber: "",
      floor: 0,
      apartment: "",
      city: undefined,
      state: 2,
      percentage: undefined,
      pep: undefined,
      citizenshipCountry: 54,
    },
  });

  const addBeneficiary = async (
    requestBody: BeneficiaryRequest
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
    const parseData: BeneficiaryRequest = {
      personType: 0,
      firstName: data.firstName,
      parentBeneficiaryId: Number(beneficiaryId),
      lastName: data.lastName,
      cuitCuil: data.cuitCuil,
      dni: data.dni,
      birthDate: formatDateToISO(data.birthDate),
      profession: data.profession,
      maritalStatus: Number(data.maritalStatus),
      street: data.street,
      streetNumber: data.streetNumber,
      floor: data.floor,
      apartment: data.apartment,
      city: data.city,
      state: data.state,
      percentage: data.percentage,
      pep: Number(data.pep),
      citizenshipCountry: data.citizenshipCountry,
    };
    console.log("parseData enviada: ", parseData);
    addBeneficiary(parseData);
  };

  const formValues = watch();

  console.log("Beneficiary formValues: ", formValues);

  return (
    <form className="mt-2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <Label htmlFor="cuit" className="text-xs ">
          CUIT/CUIL*
        </Label>
        <Input
          id="cuitCuil"
          placeholder="Ingresá el número sin guiones"
          {...register("cuitCuil")}
        />
        {errors.cuitCuil && (
          <p className="text-red-500 text-xs">{errors.cuitCuil?.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="firstName" className="text-xs ">
            Nombres*
          </Label>
          <Input
            id="firstName"
            placeholder="Ej: Juan"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName" className="text-xs">
            Apellidos*
          </Label>
          <Input
            id="lastName"
            placeholder="Ej: Perez"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="dni" className="text-xs f">
          DNI*
        </Label>
        <Input id="dni" placeholder="Ej: 24785665" {...register("dni")} />
        {errors.dni && (
          <p className="text-red-500 text-xs">{errors.dni.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="birthDate" className="text-xs ">
            Fecha de nacimiento*
          </Label>
          <Input type="date" id="birthDate" {...register("birthDate")} />
          {errors.birthDate && (
            <p className="text-red-500 text-xs">{errors.birthDate.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="maritialStatus" className="text-xs ">
            Estado civil*
          </Label>
          <MartialStatus
            control={control}
            name="maritialStatus"
            setValue={setValue}
          />
          {errors.maritalStatus && (
            <p className="text-red-500 text-xs">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1 relative -top-2">
        <Label htmlFor="profession" className="text-xs ">
          Ocupación*
        </Label>
        <Ocupation control={control} name="profession" setValue={setValue} />
        {errors.profession && (
          <p className="text-red-500 text-xs">{errors.profession.message}</p>
        )}
      </div>

      <Location
        defaultProvinceId={watch("state")}
        defaultCityId={watch("city")}
        setValue={setValue}
        onSelectProvince={(state: number) => setValue("state", state)}
        onSelectCity={(city) => setValue("city", city)}
      />
      {errors.state && (
        <p className="text-red-500 text-xs">{errors.state.message}</p>
      )}
      {errors.city && (
        <p className="text-red-500 text-xs">{errors.city.message}</p>
      )}

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

      <div className="space-y-1">
        <Label htmlFor="floor" className="text-xs ">
          Piso y departamento
        </Label>
        <Input
          id="floor"
          placeholder="Ingresá piso y departamento"
          {...register("floor", {
            setValueAs: (value) => (value ? Number(value) : undefined),
          })}
        />
        {errors.floor && (
          <p className="text-red-500 text-xs">{errors.floor?.message}</p>
        )}
      </div>

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
            setValueAs: (v) => (v === "" ? undefined : Number(v)), // Convertir a número
          })}
        />
        {errors.percentage && (
          <p className="text-red-500 text-xs">{errors.percentage.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label className="text-xs ">¿Es PEP?*</Label>
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
      <SheetClose>
        <button
          type="submit"
          className={`relative top-8 py-2 px-6 rounded-lg text-white ${
            Object.keys(errors).length === 0 ? "bg-primary-500" : "bg-gray-400"
          }`}
          disabled={Object.keys(errors).length !== 0}
        >
          Registrar Beneficiarios
        </button>
      </SheetClose>
    </form>
  );
};

type BeneficiaryRequest = {
  personType: number;
  firstName: string;
  lastName: string;
  parentBeneficiaryId: number;
  cuitCuil: string;
  dni: string;
  birthDate: string;
  profession: string;
  maritalStatus: number;
  street: string;
  streetNumber: string;
  floor?: string;
  apartment?: string;
  city: string;
  state: string;
  percentage: string;
  pep: number;
  citizenshipCountry: string;
};
