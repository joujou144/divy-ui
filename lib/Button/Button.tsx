import type { ReactNode } from "react";
import cn from "classnames";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export function Button({ children, className }: ButtonProps): ReactNode {
  return (
    <button className={cn("py-2 px-3 rounded-sm bg-green-300", className)}>
      {children}
    </button>
  );
}
