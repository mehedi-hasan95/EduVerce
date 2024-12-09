import { Card } from "@/components/ui/card";
import { truncateString } from "@/lib/utils";
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
        <Image
          src={item.thumbnail ? item.thumbnail : "/no-image.svg"}
          alt=""
          height={300}
          width={300}
          className="w-full opacity-70 h-56"
        />
        <div className="p-6">
          <h3 className="text-lg text-themeTextGray font-bold">{item.name}</h3>
          <p className="text-base text-themeTextGray">
            {item.description && truncateString(item.description)}
          </p>
        </div>
      </Card>
    </Link>
  );
};
