import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import axios from "axios";
import { Spinner } from "./../atoms/Spinner";

// Definir el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

// Props del componente Select
interface SelectProps {
  defaultValue?: number;
  nationalityId: number; // Añadimos el id de la nacionalidad
  onChange: (provinceId: number) => void;
}

export const ProvinceSelect = ({
  defaultValue,
  nationalityId,
  onChange,
}: SelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [defaultOption, setDefaultOption] = useState<OptionType | null>(null);

  // Cargar las opciones de provincias dependiendo de la nacionalidad
  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      setError(null); // Limpiar el error antes de realizar la nueva solicitud
      const token = localStorage.getItem("access_token");

      try {
        console.log("Hará la petición a: ", nationalityId);
        const response = await axios.get(
          `/api/province?nationalityId=${nationalityId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const optionsArray = response.data.map((item: any) => ({
          value: item.id.toString(),
          label: item.name,
        }));

        setSelectOptions(optionsArray);

        // Establecer la opción por defecto si se pasa un defaultValue
        const defaultOpt = optionsArray.find(
          (option) => option.value === defaultValue?.toString()
        );
        if (defaultOpt) {
          setDefaultOption(defaultOpt);
        } else {
          setDefaultOption(null); // Limpia la opción por defecto si no hay coincidencia
        }
      } catch (error) {
        setError("Error al cargar las provincias");
        console.error("Error en la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (nationalityId) {
      fetchOptions();
    } else {
      setSelectOptions([]); // Limpiamos las opciones si no hay nationalityId
      setDefaultOption(null); // Limpia la opción por defecto si no hay nacionalidad
      setError(null); // También limpiamos el error si no hay nacionalidad seleccionada
    }
  }, [nationalityId, defaultValue]);

  if (isLoading)
    return <Spinner size="small" className="text-primary-500 mr-32" />;
  if (error) return <p>{error}</p>;

  const customStyles = {
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "0.64rem", // Tamaño del placeholder
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
      placeholder="Selecciona una provincia"
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange(Number(selectedOption.value)); // Llamamos a onChange con el nuevo provinceId
        } else {
          onChange(0); // Si se limpia la selección, enviamos un valor por defecto.
        }
      }}
    />
  );
};
