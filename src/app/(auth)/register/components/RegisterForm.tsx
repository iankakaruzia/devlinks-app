"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Image from "next/image";
import type { FormEvent } from "react";

export function RegisterForm() {
  function handleRegister(event: FormEvent) {
    event.preventDefault();
    console.log("register");
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-6">
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
        placeholder="At least 8 characters"
        label="Create password"
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
  );
}
