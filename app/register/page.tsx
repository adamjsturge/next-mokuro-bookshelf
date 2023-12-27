"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import Input from "@/input";

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [users, setUsers] = useState<User[]>([]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signIn("register", data);
    fetch("/api/volume", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-3/5 max-w-2xl card bg-base-300 rounded-box">
        <div className="items-center card-body">
          <h2 className="card-title">Sign Up</h2>
          <form className="flex flex-col justify-around items-center w-full">
            <Input
              label="Username"
              placeholder="renge"
              errors={errors?.username || null}
              register={register("username", {
                required: "Username is required",
              })}
            />
            <Input
              label="Password"
              placeholder="ny@np@55u"
              type="password"
              errors={errors?.password || null}
              register={register("password", {
                required: "Username is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <Input
              label="Confirm Password"
              placeholder="ny@np@55u"
              type="password"
              errors={errors?.confirmPassword || null}
              register={register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <Input
              label="Invite Code"
              errors={errors?.inviteCode || null}
              register={register("inviteCode", {
                required: "Invite Code is required",
              })}
            />

            <button className="mt-8 max-w-xs btn btn-block" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
