import React from "react";
import Image from "next/image";
import ErrorImg from "./../../../assets/img/error-handler-logo.svg";
import Button from "./Button";

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }) => {
  return (
    <div className="bg-white mt-4 rounded-lg p-10 shadow-[0_0_10px_#3f3f3f26] w-[100%]">
      {children}
    </div>
  );
};

export default Card;
