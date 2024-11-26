import {
  Compass,
  CreditCard,
  Home,
  LayoutDashboard,
  LucideIcon,
  Orbit,
} from "lucide-react";
import { IconType } from "react-icons";
import {
  RiHtml5Fill,
  RiJavascriptFill,
  RiNextjsFill,
  RiReactjsLine,
  RiTailwindCssFill,
  RiWordpressFill,
} from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { PiFileCssDuotone } from "react-icons/pi";
import { FaLaravel } from "react-icons/fa";

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
  icon: LucideIcon | IconType;
  path: string;
};

export const CATEGORY_MENUS: Category[] = [
  {
    id: "1",
    label: "Next.Js",
    icon: RiNextjsFill,
    path: "next.js",
  },
  {
    id: "2",
    label: "React",
    icon: RiReactjsLine,
    path: "react",
  },
  {
    id: "3",
    label: "Tailwind",
    icon: RiTailwindCssFill,
    path: "tailwind",
  },
  {
    id: "4",
    label: "Javascript",
    icon: RiJavascriptFill,
    path: "javascript",
  },
  {
    id: "5",
    label: "Typescript",
    icon: BiLogoTypescript,
    path: "typescript",
  },
  {
    id: "6",
    label: "WordPress",
    icon: RiWordpressFill,
    path: "wordpress",
  },
  {
    id: "7",
    label: "HTML",
    icon: RiHtml5Fill,
    path: "html",
  },
  {
    id: "8",
    label: "CSS",
    icon: PiFileCssDuotone,
    path: "css",
  },
  {
    id: "9",
    label: "Laravel",
    icon: FaLaravel,
    path: "laravel",
  },
];
