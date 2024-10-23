import Link from "next/link";
import individualAccount from "./../../../public/individual-account.svg";
import companyAccount from "./../../../public/company-account.svg";
import arrowRight from "./../../../public/arrowRight.svg";
import arrowLeft from "./../../assets/arrowLeft.svg";
import Image from "next/image";
import Back from "@atoms/Back";

export default function Home() {
  return (
    <>
      <Back goTo="/" />
      <h2 className="mt-16  font-semibold text-lg">Tipo de cuenta</h2>
      <p className="text-gray-400 mt-2">
        Para iniciar, elegí el tipo de cuenta que querés abrir:
      </p>
      <div className="lg:max-w-[75%] xl:max-w-[55%]">
        <a href="https://micuenta.invertironline.com/registrarme?intencion=0">
          <div className="flex border mt-4 border-violet-300 rounded-md py-4 px-3 justify-between hover:outline hover:outline-1 hover:outline-violet-500 transition-all cursor-pointer">
            <div className="ml-4  flex">
              <Image
                src={individualAccount}
                alt="cuenta individuo"
                width={50}
                height={50}
              />
              <div className="mt-1 ml-4">
                <p className="text-black text-sm">Cuenta individuo</p>
                <p className="text-gray-400 text-sm">Soy persona fisica</p>
              </div>
            </div>
            <div className="mt-2">
              <Image
                src={arrowRight}
                width={25}
                height={25}
                alt={"arrow right"}
              />
            </div>
          </div>
        </a>

        <Link href={"./create-account-email"}>
          <div className="flex border mt-4 border-violet-300 rounded-md py-4 px-3 justify-between hover:outline hover:outline-1 hover:outline-violet-500 transition-all cursor-pointer">
            <div className="ml-4  flex">
              <Image
                src={companyAccount}
                alt="cuenta individuo"
                width={50}
                height={50}
              />
              <div className="mt-1 ml-4">
                <p className="text-black text-sm">Cuenta empresa</p>
                <p className="text-gray-400 text-sm">Soy persona juridica</p>
              </div>
            </div>
            <div className="mt-2">
              <Image
                src={arrowRight}
                width={25}
                height={25}
                alt={"arrow right"}
              />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
