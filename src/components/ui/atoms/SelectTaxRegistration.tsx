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
  defaultValue?: number; // Valor por defecto que coincide con el índice de la opción
  onChange?: (value: OptionType | null) => void; // Callback para cuando se selecciona una opción
}

export const SelectTaxRegistration = ({
  defaultValue,
  onChange,
}: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  // Obtener los datos del contexto
  const { staticData, isLoading, error } = useStaticData();

  // Filtrar las opciones de IIBBType
  useEffect(() => {
    if (staticData) {
      const incomeTax = staticData.find(
        (item) => item.type === "IncomeTax" // Cambiado a "IIBBType"
      );

      if (incomeTax && incomeTax.data) {
        const optionsArray = Object.entries(incomeTax.data).map(
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

  // Controlador para cuando se selecciona una opción
  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
    onChange?.(option); // Llamar al onChange si está definido
  };

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
      onChange={handleChange}
      isClearable
    />
  );
};
