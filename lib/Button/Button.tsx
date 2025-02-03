import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps): ReactNode {
  return <button>{children}</button>;
}
