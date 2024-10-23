import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import axios from "axios";
import { Spinner } from "./Spinner";

// Define el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

// Props del componente Select
interface SelectProps {
  defaultValue?: number;
  setValue: (name: string, value: string) => void;
}

export const MainActivitySelect = ({ defaultValue, setValue }: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [defaultOption, setDefaultOption] = useState<OptionType | null>(null);

  // Cargar las opciones desde el endpoint
  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get(`/api/main-activity`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Mapeamos las opciones: solo mostramos la descripción en la UI
        const optionsArray = response.data.map((item: any) => ({
          value: String(item.code), // Convertimos el código a string
          label: item.description, // Solo mostramos la descripción
        }));

        setSelectOptions(optionsArray);

        // Convertimos el defaultValue a string para compararlo con las opciones
        const defaultOpt = optionsArray.find(
          (option) => option.value === String(defaultValue)
        );
        if (defaultOpt) {
          setDefaultOption(defaultOpt);
        }
      } catch (error) {
        setError("Error al cargar las opciones");
        console.error("Error en la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [defaultValue]);

  if (isLoading) return <Spinner size="small" className="text-primary-500" />;
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
      styles={customStyles}
      options={selectOptions}
      onChange={(selectedOption) => {
        setValue("activity", selectedOption ? selectedOption.value : "");
      }}
      defaultValue={defaultOption}
      isClearable
    />
  );
};
