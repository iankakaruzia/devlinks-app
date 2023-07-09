import Link from "next/link";
import { RegisterForm } from "./components/RegisterForm";

export const metadata = {
  title: "Register | devlinks",
  description: "Create an account on devlinks",
};

export default function RegisterPage() {
  return (
    <>
      <section className="mb-10 flex flex-col gap-2">
        <h1 className="text-2xl font-bold md:text-3xl">Create account</h1>
        <p className="text-gray-700">
          Let’s get you started sharing your links!
        </p>
      </section>

      <RegisterForm />

      <div className="mt-6 text-center md:flex md:items-center md:justify-center md:gap-1">
        <p className="text-gray-700">Already have an account?</p>
        <Link className="text-purple-600" href="login">
          Login
        </Link>
      </div>
    </>
  );
}
