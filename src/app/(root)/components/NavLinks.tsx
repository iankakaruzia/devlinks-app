"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex items-center gap-1 lg:gap-4">
      <Link
        href="/"
        className={classNames(
          "group flex h-10 w-16 items-center justify-center rounded-lg transition-colors md:w-auto md:gap-2 md:px-7",
          {
            "bg-purple-100": isHome,
          }
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            className={classNames(
              "transition-colors group-hover:fill-purple-600",
              {
                "fill-purple-600": isHome,
                "fill-gray-700": !isHome,
              }
            )}
            d="M8.523 11.72a.749.749 0 010 1.063l-.371.371A3.751 3.751 0 112.847 7.85l1.507-1.506A3.75 3.75 0 019.5 6.188a.753.753 0 01-1 1.125 2.25 2.25 0 00-3.086.091L3.908 8.91a2.25 2.25 0 003.183 3.183l.37-.371a.748.748 0 011.062 0zm4.63-8.874a3.756 3.756 0 00-5.305 0l-.371.37A.751.751 0 108.539 4.28l.372-.37a2.25 2.25 0 013.182 3.182l-1.507 1.507a2.25 2.25 0 01-3.086.09.753.753 0 00-1 1.125 3.75 3.75 0 005.144-.152l1.507-1.507a3.756 3.756 0 00.002-5.307v-.001z"
          ></path>
        </svg>

        <span
          className={classNames(
            "hidden font-semibold transition-colors group-hover:text-purple-600 md:block",
            {
              "text-gray-700": !isHome,
              "text-purple-600": isHome,
            }
          )}
        >
          Links
        </span>
      </Link>

      <Link
        href="/details"
        className={classNames(
          "group flex h-10 w-16 items-center justify-center rounded-lg md:w-auto md:gap-2 md:px-7",
          {
            "bg-purple-100": !isHome,
          }
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          fill="none"
          viewBox="0 0 21 20"
        >
          <path
            className={classNames(
              "transition-colors group-hover:fill-purple-600",
              {
                "fill-purple-600": !isHome,
                "fill-gray-700": isHome,
              }
            )}
            d="M10.5 1.563A8.437 8.437 0 1018.938 10 8.447 8.447 0 0010.5 1.562zM6.716 15.357a4.688 4.688 0 017.568 0 6.54 6.54 0 01-7.568 0zm1.596-5.982a2.188 2.188 0 114.376 0 2.188 2.188 0 01-4.376 0zm7.344 4.683a6.523 6.523 0 00-2.265-1.83 4.062 4.062 0 10-5.782 0 6.522 6.522 0 00-2.265 1.83 6.562 6.562 0 1110.304 0h.008z"
          ></path>
        </svg>

        <span
          className={classNames(
            "hidden font-semibold  transition-colors group-hover:text-purple-600 md:block",
            {
              "text-gray-700": isHome,
              "text-purple-600": !isHome,
            }
          )}
        >
          Profile Details
        </span>
      </Link>
    </div>
  );
}
