"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validations/userSchema";
import Input from "../../components/ui/atoms/Input";
import Button from "@atoms/Button";
import { useRouter } from "next/navigation";
import { FieldLabel } from "../../components/ui/atoms/FieldLabel";
import EMAIL_USER from "@assets/email.svg";
import LEFT_ARROW from "@assets/left-arrow.svg";
import ERROR_FORM from "@assets/error-form.svg";
import Image from "next/image";
import Link from "next/link";
import Back from "@atoms/Back";

export default function CreateAccountEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  const onSubmit = (data: dataLogin) => {
    console.log("SUBMITIO");
    sessionStorage.setItem("email", data.email);
    router.push("./create-account-password");
  };

  // Agregar este console.log para verificar los errores
  console.log("Errors:", errors);

  return (
    <>
      <div className="w-full h-full justify-center flex items-center lg:max-w-[50%]">
        <div className="w-full">
          <Back goTo="./choose-type" />
          <h1 className="font-semibold relative mt-16">
            Empecemos por tu e-mail
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-col w-full">
              <div>
                <FieldLabel id={"email"} text={"E-mail"} labelIcon={EMAIL_USER}>
                  <Input
                    typeI={"text"}
                    placeholder={"Ej:andy@mail.com"}
                    register={register}
                    name={"email"}
                    error={errors.email}
                  />
                </FieldLabel>
                {errors.email && (
                  <div className="flex items-center mt-1 ">
                    <Image
                      src={ERROR_FORM}
                      height={12}
                      width={12}
                      alt="error icon"
                    />
                    <p className="text-red-500 text-[0.70rem] ml-2 relative ">
                      {errors.email.message}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <FieldLabel
                  id={"repeat_email"}
                  text={"Repetir e-mail"}
                  labelIcon={EMAIL_USER}
                >
                  <Input
                    typeI={"text"}
                    placeholder={"Ej:andy@mail.com"}
                    register={register}
                    name={"repeat_email"}
                    error={errors.repeat_email}
                  />
                </FieldLabel>
                {errors.repeat_email && (
                  <div className="flex items-center mt-1">
                    <Image
                      src={ERROR_FORM}
                      height={12}
                      width={12}
                      alt="error icon"
                    />
                    <p className="text-red-500 text-[0.70rem] ml-2 relative">
                      {errors.repeat_email?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-primary-500 text-sm mt-6 ml-1">
              ¿Tenés un código?
            </p>
            <div className="w-[100%] mx-auto relative top-4">
              <Button text={"Continuar"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

type dataLogin = {
  email: string;
  repeat_email: string;
};
