import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import axios from "axios";

// Define el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

// Props del componente Select
interface SelectProps {
  options?: OptionType[]; // Opciones proporcionadas directamente
  endpoint?: string; // Endpoint para obtener las opciones
}

export const Select = ({ options, endpoint }: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Si se proporciona un endpoint, carga las opciones de manera asincrónica
  useEffect(() => {
    if (endpoint) {
      setIsLoading(true);
      axios
        .get(endpoint)
        .then((response) => {
          // Asume que la respuesta tiene un array de opciones
          setSelectOptions(response.data);
        })
        .catch((error) => {
          setError("Error al cargar las opciones");
          console.error("Error en la solicitud:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (options) {
      // Si se proporcionan opciones directamente, úsalas
      setSelectOptions(options);
    }
  }, [endpoint, options]);

  if (isLoading) return <p>Cargando opciones...</p>;
  if (error) return <p>{error}</p>;

  return <ReactSelect options={selectOptions} />;
};
