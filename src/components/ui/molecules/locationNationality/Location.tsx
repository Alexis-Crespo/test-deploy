import { useState } from "react";
import { ProvinceSelect } from "./../../atoms/ProvinceSelect";
import { CitySelect } from "./../../atoms/CitySelect";
import { Nationality } from "@atoms/Nationality";

export const Location: React.FC<LocationProps> = ({
  defaultProvinceId,
  defaultCityId,
  setValue,
  onSelectProvince,
  onSelectCity,
}) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number>(
    defaultProvinceId || 0
  );
  const [selectedNationalityId, setSelectedNationalityId] =
    useState<number>(54); // Valor predeterminado de nacionalidad

  return (
    <div className="justify-between">
      <div className="w-[100%]">
        <span className="text-xs ">Nacionalidad*</span>
        <Nationality
          defaultValue={selectedNationalityId}
          onChange={(nationalityId) => {
            setSelectedNationalityId(nationalityId);
            // Resetear provincia y ciudad cuando cambia la nacionalidad
            setSelectedProvinceId(0);
            onSelectProvince(0);
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <div className="w-[45%]">
          <span className="text-xs  ">Provincia*</span>
          <ProvinceSelect
            defaultValue={selectedProvinceId}
            nationalityId={selectedNationalityId} // Pasamos nationalityId al select de provincia
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
            onChange={(cityId) => onSelectCity(cityId)}
          />
        </div>
      </div>
    </div>
  );
};

type LocationProps = {
  defaultProvinceId: number | null | undefined;
  defaultCityId: number | undefined;
  setValue: (field: string, value: any) => void;
  onSelectProvince: (state: number) => void;
  onSelectCity: (city: number) => void;
};
