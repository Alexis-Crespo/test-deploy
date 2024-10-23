import { useState } from "react";
import { ProvinceSelect } from "./ProvinceSelect";
import { CitySelect } from "./CitySelect";

export const LocationForm = ({
  defaultProvinceId,
  defaultCityId,
  setValue,
  onSelectProvince,
  onSelectCity,
}) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number>(
    defaultProvinceId || 0
  );

  return (
    <div className="flex mt-4 justify-between">
      <div className="w-[45%]">
        <span className="text-xs  ">Provincia*</span>
        <ProvinceSelect
          defaultValue={selectedProvinceId}
          nationalityId={54}
          onChange={(provinceId) => {
            setSelectedProvinceId(provinceId);
            onSelectProvince(provinceId);
          }}
        />
      </div>
      <div className="w-[45%]">
        <span className="text-xs  ">Ciudad*</span>
        <CitySelect
          provinceId={selectedProvinceId}
          defaultCityId={defaultCityId}
          onChange={(cityId) => onSelectCity(cityId)} // Aquí pasamos el valor de la ciudad seleccionada
        />
      </div>
    </div>
  );
};
