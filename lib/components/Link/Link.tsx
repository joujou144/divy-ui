import { LinkIcon } from "@/lib/components/icons";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface LinkProps extends ComponentProps<"a"> {
  isExternal?: boolean;
  showLinkIcon?: boolean;
  customIcon?: ReactNode;
}

export const Link = ({
  children,
  className,
  isExternal = false,
  showLinkIcon = false,
  customIcon,
  href,
  ...props
}: LinkProps) => {
  const icon = customIcon ?? (
    <LinkIcon className="transition-all duration-200 group-hover:rotate-[360deg]" />
  );

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-1.5 text-blue-500 hover:transition-all hover:text-opacity-85 duration-200",
        className
      )}
      {...props}
    >
      {children}
      {showLinkIcon && icon}
    </a>
  );
};
