"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  content: string;
};
export const CopyButton = ({ content }: Props) => {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(content);
        toast("Copied", { description: "Affiliate link copied to clipboard" });
      }}
      className=""
      variant={"outline"}
    >
      <Copy className="h-5 w-5" />
      Copy Link
    </Button>
  );
};
