import { onGetGroupChannels } from "@/actions/group";
import { IUserGroups } from "@/app/group/[groupId]/_component/type";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useNavigation = () => {
  const pathName = usePathname();
  const [section, setSection] = useState<string>(pathName);
  const onSetSection = (page: string) => setSection(page);
  return {
    section,
    onSetSection,
  };
};

export const useSidebarHooks = (groupId: string) => {
  const { data: group } = useQuery({
    queryKey: ["group-user-info"],
  }) as { data: IUserGroups };
  const { data: groupChannels } = useQuery({
    queryKey: ["group-channels"],
    queryFn: () => onGetGroupChannels(groupId),
  });

  return { group, groupChannels };
};
