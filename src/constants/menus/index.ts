import {
  Compass,
  CreditCard,
  Home,
  HomeIcon,
  Info,
  LayoutDashboard,
  LucideIcon,
  Orbit,
  Zap,
} from "lucide-react";
import { BsFillPeopleFill } from "react-icons/bs";
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
import { FaLaravel, FaStripe } from "react-icons/fa";

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

type MenuBar = {
  id: string;
  label: string;
  icon: LucideIcon | IconType;
  path: string;
  integration?: boolean;
};
export const SIDEBAR_SETTINGS_MENU: MenuBar[] = [
  {
    id: "1",
    label: "General",
    icon: HomeIcon,
    path: "",
  },
  {
    id: "2",
    label: "Subscriptions",
    icon: CreditCard,
    path: "subscriptions",
  },
  {
    id: "3",
    label: "Affiliates",
    icon: BsFillPeopleFill,
    path: "affiliates",
  },
  {
    id: "4",
    label: "Domain Config",
    icon: Info,
    path: "domains",
  },
  {
    id: "5",
    label: "Integration",
    icon: Zap,
    path: "integrations",
    integration: true,
  },
];

type IntegrationsListItemProps = {
  id: string;
  name: "stripe";
  logo: IconType;
  description: string;
  title: string;
  modalDescription: string;
};

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: "1",
    name: "stripe",
    description:
      "Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.",
    logo: FaStripe,
    title: "Connect Stripe Account",
    modalDescription:
      "The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.",
  },
];
