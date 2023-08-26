"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const schema = z
  .object({
    email: z.string().min(1, "Can't be empty").email(),
    password: z.string().min(8, "Please check again"),
  })
  .required();

export function LoginForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const router = useRouter();

  const handleLogin = handleSubmit(async (data) => {
    console.log({ isLoaded });
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log({ result });
      }
    } catch (err) {
      toast.error("Something went wrong. Please check your credentials.");
      console.error({ err });
    }
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <Input
        type="email"
        id="email"
        placeholder="e.g. alex@email.com"
        label="Email address"
        {...register("email")}
        icon={
          <Image
            src="/assets/images/icon-email.svg"
            width={16}
            height={16}
            alt=""
          />
        }
        error={errors.email?.message as string}
      />

      <Input
        type="password"
        id="password"
        placeholder="Enter your password"
        label="Password"
        {...register("password")}
        icon={
          <Image
            src="/assets/images/icon-password.svg"
            width={16}
            height={16}
            alt=""
          />
        }
        error={errors.password?.message as string}
      />
      <Button type="submit" disabled={!isValid}>
        Login
      </Button>
    </form>
  );
}
