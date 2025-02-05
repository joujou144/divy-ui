import { ComponentProps } from "react";

// const buttonStyles = cva([]);

type ButtonProps = ComponentProps<"button">;

export function Button({ ...props }: ButtonProps) {
  return <button className="px-4 py-2 bg-green-300 rounded-md" {...props} />;
}
