"use client";
import Image from "next/image";
import openEye from "./../../../assets/opened-eye-violet.svg";
import closedEye from "./../../../assets/closed-eye-violet.svg";
import { useState } from "react";

interface inputProps {
  typeI: string;
  placeholder: string;
  register: object;
  name: string;
  error?: string;
}

const Input = ({ typeI, placeholder, register, name, error }: inputProps) => {
  const [statusEye, setStatusEye] = useState(false);
  const [typeInput, setTypeInput] = useState(typeI);

  const handlerEye = () => {
    setStatusEye(!statusEye);
    setTypeInput(statusEye ? "password" : "text");
  };

  return (
    <div
      className={`w-full  h-[40px] mt-1 border-2 border-disabled rounded-md flex items-center transition duration-500 relative ${
        error
          ? "border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      }`}
    >
      <input
        className={`w-full h-[38px] px-4 py-2 rounded-sm  pr-10 ${
          error
            ? "border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-[0.78rem] text-[0.78rem]"
        }`}
        type={typeInput}
        placeholder={placeholder}
        {...register(name)}
      />
      {typeI === "password" && (
        <Image
          className="absolute right-4 cursor-pointer"
          src={statusEye ? openEye : closedEye}
          onClick={handlerEye}
          alt={statusEye ? "open eye" : "closed eye"}
          width={26}
          height={26}
        />
      )}
    </div>
  );
};

export default Input;
