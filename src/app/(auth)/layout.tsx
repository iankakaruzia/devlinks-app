import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-16 p-8 md:min-h-screen md:items-center md:justify-center md:gap-14">
      <div className="relative h-10 w-[182.5px]">
        <Image
          src="/assets/images/logo-devlinks-large.svg"
          alt="devlinks"
          fill
        />
      </div>

      <main className="md:max-w-lg md:rounded-xl md:bg-white md:p-10">
        {children}
      </main>
    </div>
  );
}
