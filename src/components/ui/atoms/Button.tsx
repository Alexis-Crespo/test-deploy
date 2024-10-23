"use client";

import { useRouter } from "next/navigation";

const Button = ({
  text,
  id,
  isDisabled = false, // Asegúrate de que tenga un valor predeterminado
  color = "bg-primary-500",
  textColor = "text-white",
  redirectTo,
  type = "submit",
}: IButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`w-[100%] h-[40px] flex justify-center items-center rounded-lg px-2 py-4 text-sm font-medium
        mt-6 mx-auto ease-in-out transition duration-500
        ${color} ${textColor} cursor-pointer hover:bg-primary-500 hover:text-white 
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`} // Cambia la apariencia cuando esté deshabilitado
      disabled={isDisabled} // Aquí se usa isDisabled para manejar el estado del botón
      id={id}
    >
      {text}
    </button>
  );
};
export default Button;

type IButtonProps = {
  id?: string;
  text: string;
  isDisabled?: boolean;
  color?: string;
  textColor?: string;
  redirectTo?: string;
  type?: string;
};
