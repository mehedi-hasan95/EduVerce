import { onGetUserDetails } from "@/actions/auth";
import BackdropGradient from "@/components/common/backdrop-gradient";
import { TextGradient } from "@/components/common/text-gradient";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CATEGORY_MENUS } from "@/constants/menus";
import Link from "next/link";
import { ExploreSearch } from "../_component/explore-search";

const ExplorePageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await onGetUserDetails();
  return (
    <div className="container mx-auto px-6">
      <div className="py-10 text-center">
        <div>
          <TextGradient
            element="H2"
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
          >
            Explore Group
          </TextGradient>
          <p className="text-themeTextGray leading-none pt-2">
            or{" "}
            <Link
              href={user?.status === 200 ? `/group/create` : "/sign-in"}
              className="underline"
            >
              create your own
            </Link>
          </p>
        </div>
      </div>
      <BackdropGradient
        className="w-4/12 md:w-5/12 xl:w-3/12 xl:h-2/6 h-3/6"
        containerClass="items-center"
      >
        <ExploreSearch />
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="max-w-3xl border px-3 py-2 rounded-lg"
        >
          <CarouselContent>
            {CATEGORY_MENUS.map((item) => (
              <CarouselItem key={item.id} className="basis-auto">
                <Card
                  className={
                    "bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 md:flex hidden rounded-xl"
                  }
                >
                  <CardContent className="flex gap-2 p-0">
                    <Link
                      href={`/explore/${item.path}`}
                      className={"flex gap-1 items-center cursor-pointer px-3"}
                    >
                      <item.icon className="h-5 w-5" /> {item.label}
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </BackdropGradient>
      {children}
    </div>
  );
};

export default ExplorePageLayout;
