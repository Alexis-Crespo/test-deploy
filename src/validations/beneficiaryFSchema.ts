import { z } from "zod";

export const beneficiaryFSchema = z.object({
  personType: z.number().min(0, "Tipo de persona es requerido"),
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  cuitCuil: z
    .string()
    .regex(/^\d{11}$/, "El CUIT/CUIL debe contener exactamente 11 números"),
  dni: z
    .string()
    .regex(/^\d{7,8}$/, "El DNI debe contener entre 7 y 8 dígitos"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "La fecha de nacimiento es inválida",
  }),
  profession: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "La ocupación es obligatoria")
  ),
  maritalStatus: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "El estado civil es obligatorio")
  ),
  street: z.string().min(1, "La calle es obligatoria"),
  streetNumber: z.number().min(1, "El número de la calle es obligatorio"),
  floor: z.union([z.string(), z.number()]).optional(), // Piso puede ser string o number
  apartment: z.union([z.string(), z.number()]).optional(), // Departamento puede ser string o number
  city: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "La ciudad es obligatoria")
  ),
  state: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "La provincia es obligatoria")
  ),
  percentage: z
    .number()
    .min(0, "El porcentaje no puede ser menor a 0")
    .max(100, "El porcentaje no puede ser mayor a 100"),
  pep: z.number().refine((val) => val === 0 || val === 1, {
    message: "Es obligatorio indicar si es PEP o no",
  }),
  citizenshipCountry: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "El país de ciudadanía es obligatorio")
  ),
});
