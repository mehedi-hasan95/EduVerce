import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Cloud } from "lucide-react";
import Image from "next/image";
import { IconType } from "react-icons";

type Props = {
  trigger: JSX.Element;
  children: React.ReactNode;
  title?: string;
  description?: string;
  type?: "Integration";
  logo: IconType;
};

export const IntrigrationModal = ({
  trigger,
  children,
  type,
  title,
  logo: Icon,
  description,
}: Props) => {
  switch (type) {
    case "Integration":
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="bg-themeBlack border-themeDarkGray">
            <div className="flex justify-center gap-3 items-center">
              <Cloud className="h-10 w-10 text-[#6772E3]" />
              <div className="text-gray-400">
                <ArrowLeft size={20} />
                <ArrowRight size={20} />
              </div>
              <Icon className="h-12 w-16 text-[#6772E3]" />
            </div>
            <DialogHeader className="flex items-center">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className=" text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
    default:
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="bg-[#1C1C1E] !max-w-2xl border-themeGray">
            {children}
          </DialogContent>
        </Dialog>
      );
  }
};
