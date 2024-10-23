import { z } from "zod";

// Función para validar CUIT
const isValidCuit = (cuit: string) => {
  if (cuit.length !== 11) return false;

  const digits = cuit.split("").map(Number);
  const verificationDigit = digits.pop();

  const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const calculatedSum = digits.reduce((acc, digit, index) => {
    return acc + digit * multipliers[index];
  }, 0);

  const calculatedVerificationDigit = 11 - (calculatedSum % 11);
  return (
    (calculatedVerificationDigit === 11 ? 0 : calculatedVerificationDigit) ===
    verificationDigit
  );
};

export const companySchema = z.object({
  cuit: z
    .string()
    .min(11, { message: "El cuit debe tener al menos 11 dígitos" })
    .max(11, { message: "El cuit no debe tener más de 11 dígitos" })
    .refine((cuit) => /^[0-9]+$/.test(cuit), {
      message: "El cuit debe contener solo números",
    })
    .refine(isValidCuit, {
      message: "El cuit no es válido",
    }),
});
