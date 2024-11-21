import { cn } from "@/lib/utils";

type Props = {
  element?: "H1" | "H2";
  className?: string;
  children: React.ReactNode;
};
export const TextGradient = ({ element, children, className }: Props) => {
  switch (element) {
    case "H1":
      return (
        <h1 className={cn("text-2xl font-bold", className, "text-gradient")}>
          {children}
        </h1>
      );
    case "H2":
      return (
        <h1 className={cn("text-xl font-bold", className, "text-gradient")}>
          {children}
        </h1>
      );
    default:
      return (
        <p className={cn("text-lg font-bold", className, "text-gradient")}>
          {children}
        </p>
      );
  }
};
