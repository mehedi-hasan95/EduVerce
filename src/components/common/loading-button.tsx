import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const LoadingButton = () => {
  return (
    <Button disabled variant={"ghost"} className="bg-themeBlack">
      Please wait
      <Loader2 className="h-6 w-6 animate-spin" />
    </Button>
  );
};
