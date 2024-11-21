"use client";
import GlassCard from "@/components/common/glass-card";
import { Card, CardContent } from "@/components/ui/card";
import { LANDING_MENUS } from "@/constants/menus";
import { useNavigation } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

type Props = {
  oriantation: "Desktop" | "Mobile";
};

export const LandingMenu = ({ oriantation }: Props) => {
  const { onSetSection, section } = useNavigation();
  switch (oriantation) {
    case "Desktop":
      return (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 md:flex hidden rounded-xl">
          <CardContent className="flex gap-2 p-0">
            {LANDING_MENUS.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                {...(item.section && {
                  onClick: () => onSetSection(item.href),
                })}
                className={cn(
                  item.href === section &&
                    "bg-[#09090B] border-[#27272A] rounded-2xl"
                )}
              >
                <GlassCard className="flex items-center gap-1 text-themeTextGray px-2 py-1">
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.label}
                </GlassCard>
              </Link>
            ))}
          </CardContent>
        </Card>
      );

    case "Mobile":
      return (
        <div className="">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="pt-10">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription className="flex flex-col gap-3">
                  {LANDING_MENUS.map((item) => (
                    <SheetClose key={item.id} asChild>
                      <Link
                        href={item.href}
                        key={item.id}
                        {...(item.section && {
                          onClick: () => onSetSection(item.href),
                        })}
                        className={cn(
                          item.href === section &&
                            "bg-[#09090B] border-[#27272A] rounded-2xl",
                          "text-center"
                        )}
                      >
                        <GlassCard
                          className={cn(
                            "flex items-center justify-center gap-1 text-themeTextGray/50 px-2 py-2",
                            item.href === section &&
                              "bg-[#09090B] border-[#27272A] text-themeTextWhite rounded-2xl"
                          )}
                        >
                          {item.icon && <item.icon className="h-5 w-5" />}
                          {item.label}
                        </GlassCard>
                      </Link>
                    </SheetClose>
                  ))}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      );

    default:
      return <></>;
  }
};
