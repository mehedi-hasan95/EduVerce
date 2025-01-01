import { IconType } from "react-icons";
import { IntrigrationModal } from "./intrigration-modal";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Cloud } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StripeConnect } from "./stripe-connect";

type Props = {
  name: "stripe";
  logo: IconType;
  title: string;
  descrioption: string;
  groupId: string;
  connections: {
    [key in "stripe"]: boolean;
  };
};
export const IntegrationsTrigger = ({
  connections,
  descrioption,
  groupId,
  logo,
  name,
  title,
}: Props) => {
  return (
    <IntrigrationModal
      logo={logo}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2 bg-themeBlack border-themeGray">
          <Cloud />
          {connections[name] ? "connected" : "connect"}
        </Card>
      }
      description={descrioption}
      title={title}
      type="Integration"
    >
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">Stripe would like to access</h2>
        {[
          "Payment and bank information",
          "Products and services you sell",
          "Business and tax information",
          "Create and update Products",
        ].map((item, key) => (
          <div key={key} className="flex gap-2 items-center pl-3">
            <CheckCircle2 />
            <p>{item}</p>
          </div>
        ))}
        <div className="flex justify-between mt-10">
          <Button
            variant="outline"
            className="bg-themeBlack border-themeDarkGray"
          >
            Learn more
          </Button>
          <StripeConnect connected={connections["stripe"]} groupId={groupId} />
        </div>
      </div>
    </IntrigrationModal>
  );
};
