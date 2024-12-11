import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const descLength = (string: string, limit?: number) => {
  return string.slice(0, limit || 60) + "...";
};
