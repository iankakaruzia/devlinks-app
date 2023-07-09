"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Image from "next/image";
import type { FormEvent } from "react";

export function LoginForm() {
  function handleLogin(event: FormEvent) {
    event.preventDefault();
    console.log("login");
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <Input
        type="email"
        id="email"
        placeholder="e.g. alex@email.com"
        label="Email address"
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
        placeholder="Enter your password"
        label="Password"
        icon={
          <Image
            src="/assets/images/icon-password.svg"
            width={16}
            height={16}
            alt=""
          />
        }
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
