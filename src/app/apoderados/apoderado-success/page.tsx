"use client";
export default function Home() {
  return (
    <>
      <div className="lg:max-w-[70%] mx-auto text-center  relative 2xl:left-40 2xl:max-w-[90%] ">
        <div className=" flex justify-center items-center">
          {
            //  <Success />
          }

          <h1 className=" font-semibold text-xl mt-16">¡Gracias!</h1>
        </div>

        <h1 className="mt-16  font-semibold text-md">
          Estaremos validando la información recibida.
        </h1>
        <div className="mt-10 text-sm text-gray-400 relative right-10 w-[125%] ">
          <p>
            En caso de que haya información inválida, vamos a solicitartela
            nuevamente. Tené en cuenta que la documentación de la empresa está
            en revisión.
          </p>
          <p className="mt-6">
            Al tener novedades, n os estaremos comunicando al mail de la empresa
            registrada.
          </p>
        </div>
      </div>
    </>
  );
}
/*
 */
