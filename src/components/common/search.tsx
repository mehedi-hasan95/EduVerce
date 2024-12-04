"use client";

import { useSearch } from "@/hooks/search";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
  className?: string;
  inputStyle?: string;
  placeholder?: string;
  searchType: "GROUPS" | "POSTS";
  iconStyle?: string;
  glass?: boolean;
};

export const Search = ({
  searchType,
  className,
  glass,
  iconStyle,
  inputStyle,
  placeholder,
}: Props) => {
  const { onSearchQuery, query } = useSearch(searchType);
  return (
    <div
      className={cn(
        "border-2 flex gap-2 items-center",
        className,
        glass &&
          "bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-20"
      )}
    >
      <SearchIcon className={cn(iconStyle || "text-themeTextGray")} />
      <Input
        onChange={onSearchQuery}
        value={query}
        className={cn(
          "bg-transparent border-0 focus-visible:ring-0",
          inputStyle
        )}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};
