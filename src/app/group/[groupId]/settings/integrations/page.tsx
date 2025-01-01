import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { INTEGRATION_LIST_ITEMS } from "@/constants/menus";
import Image from "next/image";
import { IntegrationsTrigger } from "./_components/intrigration-trigger";
import { onGetStripeIntegration } from "@/actions/stripe";

type Props = {
  params: Promise<{ groupId: string }>;
};
const IntegrationsPage = async ({ params }: Props) => {
  const { groupId } = await params;
  const payment = await onGetStripeIntegration();
  const connections = {
    stripe: payment ? true : false,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items-start gap-x-20">
              <div>
                <item.logo className="h-12 w-16 text-[#6772E3]" />
                <h2 className="font-bold capitalize">{item.name}</h2>
              </div>
              <IntegrationsTrigger
                connections={connections}
                descrioption={item.description}
                groupId={groupId}
                logo={item.logo}
                name={item.name}
                title={item.title}
              />
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationsPage;
