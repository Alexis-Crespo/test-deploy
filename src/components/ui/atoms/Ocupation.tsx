import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useStaticData } from "../../../context/StaticDataContext";

// Define el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

// Props del componente Select
interface SelectProps {
  defaultValue?: number;
  setValue: Function;
}

export const Ocupation = ({ defaultValue, setValue }: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  // Obtener los datos del contexto
  const { staticData, isLoading, error } = useStaticData();

  // Filtrar las opciones de IncomeTax
  useEffect(() => {
    if (staticData) {
      const Ocupation = staticData.find((item) => item.type === "Occupation");

      if (Ocupation && Ocupation.data) {
        const optionsArray = Object.entries(Ocupation.data).map(
          ([key, value]) => ({
            value: key, // ID como string
            label: value as string, // Texto asociado
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

  if (isLoading) return <p>Cargando opciones...</p>;
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
      id="profession"
      options={selectOptions}
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option);

        if (option) {
          // Convertir el valor a número antes de asignarlo
          setValue("profession", Number(option.value));
        } else {
          setValue("profession", undefined);
        }
      }}
      isClearable
    />
  );
};
