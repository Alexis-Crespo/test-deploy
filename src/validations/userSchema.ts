import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string().email({
      message: "El formato del e-mail es incorrecto",
    }),
    repeat_email: z.string().email({
      message: "El formato del e-mail es incorrecto",
    }),
  })
  .refine((data) => data.email === data.repeat_email, {
    path: ["repeat_email"],
    message: "Los e-mails no coinciden",
  })
