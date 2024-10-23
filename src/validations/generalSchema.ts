import { z } from "zod";

export const generalSchema = z.object({
  businessName: z.string().min(1, "La razón social es requerida"),
  businessTypeId: z
    .union([z.string(), z.number()])
    .refine((value) => value !== "", {
      message: "El tipo de sociedad es requerido",
    }),
  incorporationDate: z.string().min(1, "Fecha de constitución requerida"),
  mainActivityId: z
    .union([z.string(), z.number()])
    .refine((value) => value !== "", {
      message: "La actividad principal es requerida",
    }),
  provinceId: z
    .union([z.string(), z.number()])
    .refine((value) => value !== undefined && value !== null, {
      message: "La provincia es requerida",
    })
    .optional(),

  cityId: z.union([z.string(), z.number()]).refine((value) => value !== "", {
    message: "La ciudad es requerida",
  }),
  street: z.string().min(1, "La calle es requerida"),
  streetNumber: z.string().min(1, "El número es requerido"),
  phoneNumber: z
    .union([z.string(), z.number()])
    .refine((value) => value !== "", {
      message: "El teléfono es requerido",
    })
    .optional(), // Permitir que sea undefined inicialmente
});
