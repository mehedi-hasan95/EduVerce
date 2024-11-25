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

type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
};

export const CATEGORY_MENUS: Category[] = [
  {
    id: "1",
    label: "Next.Js",
    icon: Home,
    path: "next.js",
  },
  {
    id: "2",
    label: "React",
    icon: Home,
    path: "react",
  },
  {
    id: "3",
    label: "Tailwind",
    icon: Home,
    path: "tailwind",
  },
  {
    id: "4",
    label: "Javascript",
    icon: Home,
    path: "javascript",
  },
  {
    id: "5",
    label: "Typescript",
    icon: Home,
    path: "typescript",
  },
  {
    id: "6",
    label: "WordPress",
    icon: Home,
    path: "wordpress",
  },
  {
    id: "7",
    label: "HTML",
    icon: Home,
    path: "html",
  },
  {
    id: "8",
    label: "CSS",
    icon: Home,
    path: "css",
  },
  {
    id: "9",
    label: "Laravel",
    icon: Home,
    path: "laravel",
  },
];
