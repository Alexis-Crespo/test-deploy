import Image from "next/image";
import IOL_LOGO from "@assets/iol-logo.svg";

const Brand = () => {
  return (
    <Image
      className="md:ml-7 "
      src={IOL_LOGO}
      alt="brand"
      width={195}
      height={60}
      priority
    />
  );
};

export default Brand;
