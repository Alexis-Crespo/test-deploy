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

export const MartialStatus = ({ defaultValue, setValue }: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  // Obtener los datos del contexto
  const { staticData, isLoading, error } = useStaticData();

  // Filtrar las opciones de IncomeTax
  useEffect(() => {
    if (staticData) {
      const MaritalStatus = staticData.find(
        (item) => item.type === "MaritalStatus"
      );

      if (MaritalStatus && MaritalStatus.data) {
        // Asegúrate de que `Ocupation.data` tenga la estructura esperada
        const optionsArray = Object.entries(MaritalStatus.data).map(
          ([key, value]) => ({
            value: key, // ID
            label: value as string, // Texto asociado
          })
        );

        setSelectOptions(optionsArray);
        console.log("Opciones de ocupación:", optionsArray);

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
      options={selectOptions}
      value={selectedOption}
      id="maritalStatus"
      onChange={(option) => {
        setSelectedOption(option);

        if (option) {
          setValue("maritalStatus", option.value);
        } else {
          setValue("maritalStatus", undefined); // Si se borra la opción
        }
      }}
      isClearable
    />
  );
};
