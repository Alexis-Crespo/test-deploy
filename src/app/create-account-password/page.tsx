"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./../../components/ui/atoms/Input";
import Button from "@atoms/Button";
import { useRouter } from "next/navigation";
import { FieldLabel } from "../../components/ui/atoms/FieldLabel";
import LOCK from "@assets/lock.svg";
import LEFT_ARROW from "@assets/left-arrow.svg";
import ERROR_FORM from "@assets/error-form.svg";
import CHECK_FORM from "@assets/check-form.svg";
import radioButtom from "@assets/radioButton.svg";
import Image from "next/image";
import { passwordSchema } from "@/validations/passwodSchema";

import axios from "axios";
import Back from "@atoms/Back";
import { useState } from "react";

export default function CreateAccountPassword() {
  const [registerError, setRegisterError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const storedEmail = sessionStorage.getItem("email");

  const router = useRouter();

  const tryRegister = async (requestBody) => {
    try {
      const response = await axios.post("/api/register", requestBody);

      if (response.status === 200) {
        console.log("Registro exitoso:", response.data);
        const { access_token, refresh_token, expires_in, token_type } =
          response.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expires_in", expires_in);
        localStorage.setItem("token_type", token_type);

        router.push("./send-email");
      } else {
        console.log("Error al registrar:", response.data);
        setRegisterError("Hubo un problema, intentar nuevamente.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setRegisterError("Hubo un problema, intentar nuevamente.");
    }
  };

  const onSubmit = (data: dataLogin) => {
    const requestBody = {
      email: storedEmail,
      password: data.password,
      origen: 3,
      version: 1,
    };

    tryRegister(requestBody);
  };

  const password = watch("password") || "";

  const passwordValidation = {
    minLength: password?.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const getIcon = (isValid: boolean, isEmpty: boolean) => {
    if (isEmpty) return radioButtom;
    return isValid ? CHECK_FORM : ERROR_FORM;
  };

  const isPasswordEmpty = password.length === 0;

  return (
    <>
      <div className="w-full h-full justify-center flex items-center lg:max-w-[50%]">
        <div className="w-full">
          <Back goTo="./create-account-email" />
          <h1 className="font-semibold text-lg mt-16">Creá una contraseña</h1>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-col w-full">
              <div className="-mt-2">
                <FieldLabel
                  id={"password"}
                  text={"Ingresá la nueva contraseña"}
                  labelIcon={LOCK}
                >
                  <Input
                    typeI={"password"}
                    placeholder={"Ejemplo: Juan123!"}
                    register={register}
                    name={"password"}
                    error={errors.password}
                  />
                </FieldLabel>
                <div className="flex-col text-sm">
                  <p className="mt-2 text-gray-500">Debe tener como minimo</p>
                  <div className="flex mt-2 ">
                    <Image
                      src={getIcon(
                        passwordValidation.minLength,
                        isPasswordEmpty
                      )}
                      height={15}
                      width={15}
                      alt="radio button"
                    />
                    <p className="ml-1.5">8 caracteres</p>
                  </div>
                  <div className="flex mt-1">
                    <Image
                      src={getIcon(
                        passwordValidation.hasUpperCase,
                        isPasswordEmpty
                      )}
                      height={15}
                      width={15}
                      alt="radio button"
                    />
                    <p className="ml-1.5">1 mayúscula</p>
                  </div>
                  <div className="flex mt-1">
                    <Image
                      src={getIcon(
                        passwordValidation.hasLowerCase,
                        isPasswordEmpty
                      )}
                      height={15}
                      width={15}
                      alt="radio button"
                    />
                    <p className="ml-1.5">1 minúscula</p>
                  </div>
                  <div className="flex mt-1">
                    <Image
                      src={getIcon(
                        passwordValidation.hasNumber,
                        isPasswordEmpty
                      )}
                      height={15}
                      width={15}
                      alt="radio button"
                    />
                    <p className="ml-1.5">1 número</p>
                  </div>
                  <div className="flex mt-1">
                    <Image
                      src={getIcon(
                        passwordValidation.hasSpecialChar,
                        isPasswordEmpty
                      )}
                      height={15}
                      width={15}
                      alt="radio button"
                    />
                    <p className="ml-1.5">Caracter especial</p>
                  </div>
                </div>
                {errors.password && (
                  <div className="flex items-center mt-1 ">
                    <Image
                      src={ERROR_FORM}
                      height={12}
                      width={12}
                      alt="error icon"
                    />
                    <p className="text-red-500 text-[0.70rem] ml-2 relative ">
                      {errors.password.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <FieldLabel
                  id={"repeat_email"}
                  text={"Repetí la nueva contraseña"}
                  labelIcon={LOCK}
                >
                  <Input
                    typeI={"password"}
                    placeholder={"Ejemplo: Juan123!"}
                    register={register}
                    name={"repeat_password"}
                    error={errors.repeat_password}
                  />
                </FieldLabel>
                {errors.repeat_password && (
                  <div className="flex items-center mt-1">
                    <Image
                      src={ERROR_FORM}
                      height={12}
                      width={12}
                      alt="error icon"
                    />
                    <p className="text-red-500 text-[0.70rem] ml-2 relative">
                      {errors.repeat_password?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {registerError && (
              <div className="flex items-center mt-4">
                <Image
                  src={ERROR_FORM}
                  height={12}
                  width={12}
                  alt="error icon"
                />
                <p className="text-red-500 text-sm ml-2 relative">
                  {registerError}
                </p>
              </div>
            )}
            <p className=" text-sm mt-6 ml-1">
              Al registrarme acepto haber leído y estar de acuerdo con las{" "}
              <span className="text-primary-500 cursor-pointer">
                Condiciones de uso y Politicas de Privacidad
              </span>
            </p>
            <div className="w-[100%] mx-auto relative top-4">
              <Button text={"Continuar"} />
              <p className="text-primary-500 mt-6 text-center cursor-pointer">
                Ya tengo cuenta
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

type dataLogin = {
  email: string;
  password: string;
};
