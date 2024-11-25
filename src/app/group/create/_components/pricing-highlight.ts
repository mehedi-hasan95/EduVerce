import {
  Airplay,
  BadgeDollarSign,
  ChartBar,
  LampCeiling,
  LucideIcon,
  MessageSquareDiff,
  Tag,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

type Props = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const PRICING_HIGHLIGHTS: Props[] = [
  {
    id: "1",
    label: "Manage users, courses, and platform settings.",
    icon: UserRoundPlus,
  },
  {
    id: "2",
    label: "Create, update, and manage courses, quizzes, and assignments.",
    icon: UsersRound,
  },
  {
    id: "3",
    label: "Enroll in courses, track progress, and access learning materials.",
    icon: LampCeiling,
  },
  {
    id: "4",
    label: "Course creation with multimedia content",
    icon: Airplay,
  },
  {
    id: "5",
    label: "Categorization and tagging for easy discovery.",
    icon: Tag,
  },
  {
    id: "6",
    label: "Stripe or PayPal integration for purchasing courses.",
    icon: BadgeDollarSign,
  },
  {
    id: "7",
    label: "Progress bars for courses.",
    icon: ChartBar,
  },
  {
    id: "8",
    label: "Discussion forums for each course.",
    icon: MessageSquareDiff,
  },
];
