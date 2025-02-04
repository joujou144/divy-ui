import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export function Button({ children, className }: ButtonProps): ReactNode {
  return (
    <button className={`py-2 px-3 rounded-sm ${className}`}>{children}</button>
  );
}
