import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  children,
  className: classnames,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "h-11 w-full rounded-lg font-semibold transition-colors disabled:pointer-events-none",
        classnames,
        {
          "bg-purple-600 text-white hover:bg-purple-300 disabled:pointer-events-none disabled:opacity-25":
            variant === "primary",
        },
        {
          "border border-solid border-purple-600 bg-transparent text-purple-600 hover:bg-purple-100 disabled:opacity-25":
            variant === "secondary",
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
