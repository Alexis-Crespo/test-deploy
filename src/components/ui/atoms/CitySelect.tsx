import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import axios from "axios";
import { Spinner } from "./Spinner";

// Definir el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

interface CitySelectProps {
  provinceId: number; // El provinceId seleccionado
  onChange: (cityId: number | null) => void; // Función para manejar el cambio de ciudad
  defaultCityId?: number; // Valor predeterminado de la ciudad
}

export const CitySelect = ({
  provinceId,
  onChange,
  defaultCityId,
}: CitySelectProps) => {
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (provinceId === 0) return;
      setIsLoading(true);
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get(
          `/api/cities/?provinceId=${provinceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cityArray = response.data.map((item: any) => ({
          value: item.id.toString(),
          label: item.name,
        }));

        setCityOptions(cityArray);
      } catch (error) {
        setError("Error al cargar las ciudades");
        console.error("Error en la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [provinceId]);

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
      styles={customStyles}
      options={cityOptions}
      isClearable
      placeholder="Selecciona una ciudad"
      onChange={(selectedOption) => {
        const cityId = selectedOption ? parseInt(selectedOption.value) : null;
        onChange(cityId); // Llamamos a onChange para pasar el valor de la ciudad seleccionada
      }}
    />
  );
};
