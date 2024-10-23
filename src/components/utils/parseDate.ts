export function formatDateToISO(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0] + "T20:26:56.981Z"; // Retorna solo el string
}
