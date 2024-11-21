import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  containerClass?: string;
};

const BackdropGradient = ({ children, className, containerClass }: Props) => {
  return (
    <div className={cn("relative w-full flex flex-col", containerClass)}>
      <div
        className={cn(
          "absolute rounded-[50%] radial--blur mx-10 z-0",
          className
        )}
      />
      {children}
    </div>
  );
};

export default BackdropGradient;
