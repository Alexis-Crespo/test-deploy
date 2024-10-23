import Link from "next/link"; // Usar el Link de Next.js
import arrowLeft from "./../../../assets/arrowLeft.svg";
import Image from "next/image";

type BackProps = {
  goTo: string;
};

const Back: React.FC<BackProps> = ({ goTo }) => {
  return (
    <div className="flex relative top-12 -ml-1 ">
      <Image src={arrowLeft} height={20} width={20} alt="arrow" />
      <Link href={goTo} className="text-primary-550 text-sm ml-1">
        Volver
      </Link>
    </div>
  );
};

export default Back;
