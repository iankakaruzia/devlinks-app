import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./components/NavLinks";
import { SignOutButton } from "./components/SignOutButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex items-center justify-between bg-white py-4 pl-6 pr-4 md:pb-4 md:pl-12 md:pr-8 md:pt-10">
        <Image
          src="/assets/images/logo-devlinks-small.svg"
          height={32}
          width={32}
          alt="devlinks"
          className="md:hidden"
        />

        <div className="relative hidden h-8 w-[146px] md:block">
          <Image
            src="/assets/images/logo-devlinks-large.svg"
            alt="devlinks"
            fill
          />
        </div>

        <NavLinks />

        <div className="flex items-center gap-2 self-stretch">
          <Link
            href="profile/ianka"
            className="flex h-full items-center justify-center rounded-lg border border-solid border-purple-600 bg-transparent px-4 transition-colors hover:bg-purple-100"
            data-testid="preview"
          >
            <Image
              src="/assets/images/icon-preview-header.svg"
              height={20}
              width={20}
              alt="Preview"
              className="md:hidden"
            />

            <span className="hidden font-semibold text-purple-600 md:block">
              Preview
            </span>
          </Link>

          <SignOutButton />
        </div>
      </header>

      <div className="lg:flex lg:gap-6 lg:pl-6">
        <div className="my-6 hidden w-full max-w-lg items-center justify-center rounded-xl bg-white lg:flex">
          <Image
            src="/assets/images/illustration-phone-mockup.svg"
            alt=""
            height={632}
            width={308}
          />
        </div>

        <main className="p-4 md:p-6 lg:flex-1 lg:pl-0">{children}</main>
      </div>
    </>
  );
}
