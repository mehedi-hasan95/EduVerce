import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
};
export const LoadingButton = ({ className }: Props) => {
  return (
    <Button
      disabled
      variant={"ghost"}
      className={cn("bg-themeBlack", className)}
    >
      Please wait
      <Loader2 className="h-6 w-6 animate-spin" />
    </Button>
  );
};
