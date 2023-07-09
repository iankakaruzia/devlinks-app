import classNames from "classnames";
import type { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  id: string;
  icon?: JSX.Element;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function Input({ label, id, type, icon, error, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-xs">
        {label}
      </label>
      <div
        className={classNames(
          "relative flex items-center gap-3 rounded-lg border border-solid border-gray-300 px-4 py-3 transition-colors focus-within:border-purple-600 focus-within:shadow-sm",
          {
            "border-red-500 focus-within:border-red-500 focus-within:shadow-none":
              error,
          }
        )}
      >
        {icon && icon}
        <input
          type={type || "text"}
          id={id}
          placeholder="e.g. alex@email.com"
          className={classNames(
            "w-full flex-1 border-none bg-transparent p-0 placeholder:opacity-25 focus:outline-none focus:ring-0",
            {
              "pr-28 text-red-500": error,
            }
          )}
          {...rest}
        />
        {error && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
