import Link from "next/link";
import { LoginForm } from "./components/LoginForm";

export const metadata = {
  title: "Login | devlinks",
  description: "Log in to devlinks",
};

export default function LoginPage() {
  return (
    <>
      <section className="mb-10 flex flex-col gap-2">
        <h1 className="text-2xl font-bold md:text-3xl">Login</h1>
        <p className="text-gray-700">
          Add your details below to get back into the app
        </p>
      </section>

      <LoginForm />

      <div className="mt-6 text-center md:flex md:items-center md:justify-center md:gap-1">
        <p className="text-gray-700">Don’t have an account?</p>
        <Link className="text-purple-600" href="register">
          Create account
        </Link>
      </div>
    </>
  );
}
