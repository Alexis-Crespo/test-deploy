import Image from "next/image";
import footerImg from "./../../../../public/footerImg.svg";

const Footer = () => {
  return (
    <div className="h-[10vh] text-white text-sm bg-primary-900 flex flex-col justify-center  w-full  px-4 py-8 ">
      <div className="flex justify-between items-center">
        <p className=" w-[250px] text-clip text-[0.6rem] sm:w-[400px] md:w-[530px] lg:text-[0.7rem] lg:w-[700px]">
          © Copyright 1999 - 2024 invertirOnline.com | 0810-1222-IOL(465)
          Humboldt 1550, Piso 2, UF 201, CABA (C1414CTN) - Argentina
        </p>
        <Image src={footerImg} width={170} height={170} alt="footer img" />
      </div>
    </div>
  );
};

export default Footer;
