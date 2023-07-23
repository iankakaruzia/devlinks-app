"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().min(1, "Can't be empty").email(),
    password: z.string().min(8, "Please check again"),
    confirmPassword: z.string().min(8, "Please check again"),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const verificationSchema = z
  .object({
    code: z.string(),
  })
  .required();

export function RegisterForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const {
    register: verificationRegister,
    handleSubmit: verificationHandleSubmit,
    formState: { errors: verificationErrors },
  } = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    mode: "all",
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const router = useRouter();

  const handleRegister = handleSubmit(async (data) => {
    if (!isLoaded) {
      return;
    }

    try {
      const response = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      console.log({ response });
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
    }
  });

  const handleVerification = verificationHandleSubmit(async (data) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code.toString(),
      });

      if (completeSignUp.status !== "complete") {
        console.log(completeSignUp);
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <>
      {pendingVerification ? (
        <form
          onSubmit={(e) => void handleVerification(e)}
          className="flex flex-col gap-6"
        >
          <Input
            type="number"
            id="code"
            placeholder="000000"
            label="Verification Code"
            {...verificationRegister("code")}
            error={verificationErrors.code?.message}
          />

          <Button type="submit">Verify your email</Button>
        </form>
      ) : (
        <form
          onSubmit={(e) => void handleRegister(e)}
          className="flex flex-col gap-6"
        >
          <Input
            type="email"
            id="email"
            placeholder="e.g. alex@email.com"
            label="Email address"
            {...register("email")}
            error={errors.email?.message}
            icon={
              <Image
                src="/assets/images/icon-email.svg"
                width={16}
                height={16}
                alt=""
              />
            }
          />

          <Input
            type="password"
            id="password"
            placeholder="At least 8 characters"
            label="Create password"
            {...register("password")}
            error={errors.password?.message}
            icon={
              <Image
                src="/assets/images/icon-password.svg"
                width={16}
                height={16}
                alt=""
              />
            }
          />

          <Input
            type="password"
            id="confirmPassword"
            placeholder="At least 8 characters"
            label="Confirm password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            icon={
              <Image
                src="/assets/images/icon-password.svg"
                width={16}
                height={16}
                alt=""
              />
            }
          />

          <span className="text-xs text-gray-700">
            Password must contain at least 8 characters
          </span>

          <Button type="submit">Create new account</Button>
        </form>
      )}
    </>
  );
}
