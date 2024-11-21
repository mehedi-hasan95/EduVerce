import {
  Compass,
  CreditCard,
  Home,
  LayoutDashboard,
  LucideIcon,
  Orbit,
} from "lucide-react";

export type LandingMenus = {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  hasUser?: boolean;
  section?: boolean;
};

export const LANDING_MENUS: LandingMenus[] = [
  {
    id: "1",
    label: "Home",
    href: "/",
    icon: Home,
    section: true,
  },
  {
    id: "2",
    label: "Category",
    href: "#category",
    icon: Orbit,
    section: true,
  },
  {
    id: "3",
    label: "Price",
    href: "#price",
    icon: CreditCard,
    section: true,
  },
  {
    id: "4",
    label: "explore",
    href: "/explore",
    icon: Compass,
  },
  {
    id: "5",
    label: "dashboard",
    href: "/dashboard",
    hasUser: true,
    icon: LayoutDashboard,
  },
];
