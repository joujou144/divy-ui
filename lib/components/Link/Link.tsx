import { LinkIcon } from "@/lib/components/icons";
import { cn } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
import { ComponentProps, forwardRef, ReactNode, useRef } from "react";

interface LinkProps extends ComponentProps<"a"> {
  isExternal?: boolean;
  showLinkIcon?: boolean;
  customIcon?: ReactNode;
}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      className,
      isExternal = false,
      showLinkIcon = false,
      customIcon,
      href,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLAnchorElement | null>(null);

    const icon = customIcon ?? (
      <LinkIcon
        data-testid="link-icon"
        className="transition-all duration-200 group-hover:rotate-[360deg]"
      />
    );

    return (
      <a
        ref={mergeRefs(localRef, ref)}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "group inline-flex items-center gap-1.5 text-blue-500 hover:text-opacity-85 transition-all duration-200",
          className
        )}
        role="link"
        {...props}
      >
        {children}
        {showLinkIcon && icon}
      </a>
    );
  }
);

Link.displayName = "Link";
