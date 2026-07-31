const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded font-medium " +
  "transition-colors duration-200 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles = {
  primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",

  secondary: "bg-secondary text-black hover:opacity-90 focus:ring-secondary",

  outline:
    "border border-border bg-white text-text-primary hover:border-primary hover:text-primary",

  dark: "bg-black text-white hover:bg-gray-800 focus:ring-black",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-10 py-4 text-base",
};

export default function AppButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  as: Component = "button",
  className = "",
  ...props
}) {
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
