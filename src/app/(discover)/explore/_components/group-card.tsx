import { Card, CardHeader } from "@/components/ui/card";
import { descLength } from "@/lib/utils";
import { GroupStateProps } from "@/zustand/search-slice";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: GroupStateProps;
};
export const GroupCard = ({ item }: Props) => {
  // wp:redux
  return (
    <Link href={`/about/${item.id}`} key={item.id}>
      <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden">
        <CardHeader>
          <Image
            src={item.thumbnail ? item.thumbnail : "/no-preview.jpg"}
            alt=""
            height={300}
            width={300}
            className="w-full opacity-70 h-56"
          />
        </CardHeader>
        <div className="p-6">
          <h3 className="text-lg text-themeTextGray font-bold">{item.name}</h3>
          <p className="text-base text-themeTextGray">
            {item.description && descLength(item.description, 200)}
          </p>
        </div>
      </Card>
    </Link>
  );
};
