import { z } from "zod";

export const passwordSchema = z
  .object({
   
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    repeat_password: z.string().min(6, {
      message: "Complete the repeat password field",
    }),
  }).refine((data) => data.password === data.repeat_password, {
    path: ["repeat_password"],
    message: "Las contraseñas no coinciden",
  });
