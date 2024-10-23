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
  onChange: (countryId: number) => void;
}

export const SelectCountry = ({ onChange }: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar las opciones de países desde el endpoint
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

        const optionsArray = response.data.map((item: any) => ({
          value: item.id.toString(),
          label: item.name,
        }));

        setSelectOptions(optionsArray);
      } catch (error) {
        setError("Error al cargar los países");
        console.error("Error en la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  if (isLoading) return <Spinner size="small" className="text-primary-500" />;
  if (error) return <p>{error}</p>;

  const customStyles = {
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "0.74rem",
      color: "#A0AEC0",
    }),
    control: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem",
    }),
    menu: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem",
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: "0.78rem",
    }),
  };

  return (
    <ReactSelect
      options={selectOptions}
      styles={customStyles}
      isClearable
      placeholder="Selecciona un país"
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange(Number(selectedOption.value));
        } else {
          onChange(0);
        }
      }}
    />
  );
};
