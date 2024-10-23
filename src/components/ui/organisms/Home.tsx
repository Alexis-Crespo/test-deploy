import Button from "@atoms/Button";
import ErrorImg from "./../assets/img/error-handler-logo.svg";
import Image from "next/image";
import Card from "@atoms/Card";
import Sidebar from "@atoms/Sidebar";

const HomePage = () => {
  return (
    <div className="bg-slate-200 flex">
      <Sidebar />
      <div className="py-20 px-12  w-[100%]">
        <div className="">
          <h2 className="font-semibold text-2xl ">Inicio</h2>
          {/* Agregar botones  */}
        </div>
        <div className="mt-6">
          <p>Estado de cuenta</p>
        </div>
        <Card>
          <div className="flex justify-center md:justify-around items-center ">
            <div className="hidden md:flex">
              <Image
                className=" "
                src={ErrorImg}
                height={200}
                width={200}
                alt="imagen error"
              />
            </div>
            <div className=" relative  top-2 w-[210px] lg:w-[320px]   ">
              <h2 className="font-semibold text-md lg:text-xl  text-center">
                Te pedmios disculpas
              </h2>
              <p className="text-[0.80rem] lg:text-[0.90rem] mt-2 text-center">
                No pudimos cargar la informacion de tu dinero
              </p>
              <Button text={"Cargar de nuevo"} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
