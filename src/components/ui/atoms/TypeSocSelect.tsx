import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useStaticData } from "./../../../context/StaticDataContext";
import { Spinner } from "./Spinner";

// Define el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

// Props del componente Select
interface SelectProps {
  defaultValue?: number; // Valor por defecto que coincide con el índice de la opción
}

export const TypeSocSelect = ({ defaultValue }: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  // Obtener los datos del contexto
  const { staticData, isLoading, error } = useStaticData();

  // Filtrar las opciones de BusinessType
  useEffect(() => {
    if (staticData) {
      const businessType = staticData.find(
        (item) => item.type === "BusinessType"
      );

      if (businessType && businessType.data) {
        const optionsArray = Object.entries(businessType.data).map(
          ([key, value]) => ({
            value: key,
            label: value as string,
          })
        );

        setSelectOptions(optionsArray);

        // Encuentra la opción seleccionada por defaultValue
        const defaultOpt = optionsArray.find(
          (option) => Number(option.value) === defaultValue
        );
        if (defaultOpt) {
          setSelectedOption(defaultOpt);
        }
      }
    }
  }, [staticData, defaultValue]);

  if (isLoading)
    return <Spinner size="small" className="text-primary-500 mr-20" />;
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
      styles={customStyles}
      options={selectOptions}
      value={selectedOption}
      onChange={setSelectedOption}
      isClearable
    />
  );
};
