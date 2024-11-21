import BackdropGradient from "@/components/common/backdrop-gradient";
import { TextGradient } from "@/components/common/text-gradient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export const LandingPrice = () => {
  return (
    <div
      id="price"
      className="max-w-2xl mx-auto px-6 text-center -mt-20 md:-mt-44 pb-10"
    >
      <BackdropGradient>
        <TextGradient element="H1">
          Chouse the course you feet most
          <p className="font-medium text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            accusamus vel in provident ducimus reiciendis nostrum odio nam ipsam
            voluptates!
          </p>
        </TextGradient>
        <Card className="mt-5 pb-5">
          <CardHeader>
            <CardTitle className="text-themeTextGray flex items-start text-2xl">
              $99/month
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 text-themeTextGray">
              <p className="flex gap-x-1">
                <Check /> Email and live chat support
              </p>
              <p className="flex gap-x-1">
                <Check /> Secure invite-only access
              </p>
              <p className="flex gap-x-1">
                <Check /> Advanced certification
              </p>
              <p className="flex gap-x-1">
                <Check /> Academy included
              </p>
              <p className="flex gap-x-1">
                <Check /> All Features
              </p>
            </div>
          </CardContent>
          <Link href="#">
            <Button
              variant={"outline"}
              className="font-semibold border-themeTextGray"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </Card>
      </BackdropGradient>
    </div>
  );
};
