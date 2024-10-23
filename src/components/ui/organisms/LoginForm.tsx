"use client";
import Brand from "@atoms/Brand";
import Button from "@atoms/Button";
import Footer from "@atoms/Footer";
import Input from "@atoms/Input";
import LabelPassword from "@atoms/LabelPassword";
import LabelUser from "@atoms/LabelUser";
import NavbarLogin from "@atoms/NavbarLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validations/userSchema";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  type dataLogin = {
    user: string;
    password: string;
  };

  const onSubmit = (d: dataLogin) => console.log(JSON.stringify(d));

  return (
    <>
      <div className="md:flex h-[97vh]">
        <NavbarLogin />
        <div className="mt-4 md:mx-auto  md:w-full md:flex md:items-center ">
          <div className="  w-[340px]  h-[65vh]  mx-auto ">
            <Brand />
            <h1 className="font-semibold text-xl mt-14">
              Ingresá con tu cuenta
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <LabelUser />
              <Input
                typeI={"text"}
                placeholder={"Ingresá tu usuario o email"}
                register={register}
                name={"user"}
              />
              <LabelPassword />
              <Input
                typeI={"password"}
                placeholder={"Ingresá tu contraseña"}
                name={"password"}
                register={register}
              />
              <Button text={"Ingresar"} />
            </form>
            <div className="">{JSON.stringify(watch(), null, 2)}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
