import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export function Button({ children, className }: ButtonProps): ReactNode {
  return (
    <button className={`${className} px-3 py-2 bg-green-300 rounded-md`}>
      {children}
    </button>
  );
}
