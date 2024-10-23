import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import axios from "axios";
import { Spinner } from "./Spinner";

// Definir el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

// Props del componente Select
interface SelectProps {
  defaultValue?: number;
  onChange: (provinceId: number) => void;
}

export const Nationality = ({ defaultValue, onChange }: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [defaultOption, setDefaultOption] = useState<OptionType | null>(null);

  // Cargar las opciones de provincias desde el endpoint
  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get(`/api/countries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Verificar que response.data sea un arreglo
        if (Array.isArray(response.data)) {
          const optionsArray = response.data.map((item: any) => ({
            value: item.id.toString(),
            label: item.name, // Verificar que item.name exista
          }));

          setSelectOptions(optionsArray);

          // Establecer la opción por defecto si se pasa un defaultValue
          const defaultOpt = optionsArray.find(
            (option) => option.value === defaultValue?.toString()
          );
          if (defaultOpt) {
            setDefaultOption(defaultOpt);
          }
        } else {
          setError("Datos inesperados en la respuesta");
          console.error("Error: La respuesta no es un array", response.data);
        }
      } catch (error) {
        setError("Error al cargar las provincias");
        console.error("Error en la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [defaultValue]);

  if (isLoading)
    return <Spinner size="small" className="text-primary-500 mr-32" />;
  if (error) return <p>{error}</p>;

  const customStyles = {
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "0.74rem", // Tamaño del placeholder
      color: "#A0AEC0",
    }),
    control: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem", // Tamaño del texto en el select
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem", // Tamaño del valor seleccionado
    }),
    menu: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem", // Tamaño del texto de las opciones
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem", // Tamaño del texto de cada opción
    }),
  };

  return (
    <ReactSelect
      options={selectOptions}
      styles={customStyles}
      defaultValue={defaultOption}
      isClearable
      placeholder="Selecciona.."
      onChange={(selectedOption) => {
        // Validar si selectedOption es null o undefined
        if (selectedOption) {
          onChange(Number(selectedOption.value)); // Llamamos a onChange con el nuevo provinceId
        } else {
          onChange(0); // Si se limpia la selección, enviamos un valor por defecto.
        }
      }}
    />
  );
};
