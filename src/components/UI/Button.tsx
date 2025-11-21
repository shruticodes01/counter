import React, { memo } from "react";
import { log } from "../../log.ts";

type Variant = "primary" | "text" | "icon";

interface ButtonProps {
  variant?: Variant;
  label?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = memo(function Button({
  children,
  variant = "primary",
  label,
  icon,
  className,
  onClick,
  ...props
}: ButtonProps) {
  log("<Button/> rendered", 2);

  const base =
    "inline-flex items-center justify-center gap-2 py-2 px-4 text-center border-none text-base cursor-pointer";

  const variantClasses = {
    primary:
      "bg-electric-cyan text-shade-black-200 rounded-sm transition-colors duration-[0.3s] ease-in",
    text: "bg-transparent text-dull-light-cyan hover:text-electric-cyan",
    icon: "bg-electric-cyan text-shade-black-200",
  };
  const Icon = icon;

  return (
    <button
      className={`${base} ${variant !== "icon"} ${
        variantClasses[variant]
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
      {Icon ? <Icon /> : null}
      {label}
    </button>
  );
});

export default Button;
