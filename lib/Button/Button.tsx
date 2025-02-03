import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps): ReactNode {
  return (
    <button className="bg-pink-300 py-2 px-3 rounded-sm">{children}</button>
  );
}
