import Image from "next/image";

export const FieldLabel: React.FC<FieldLabelrops> = ({
  children,
  id,
  labelIcon,
  text,
}) => {
  return (
    <>
      <div className="">
        <div className="flex items-baseline  mt-8">
          {" "}
          <Image
            className="mr-2 relative top-0.5 "
            src={labelIcon}
            height={12}
            width={14}
            alt="iconUser"
          />
          <label className="text-[13px]  font-semibold mb-1">{text}</label>
        </div>
        {children}
      </div>
    </>
  );
};

type FieldLabelrops = {
  children: React.ReactNode;
  id: string;
  labelIcon: string;
  text: string;
};
