"use client";

import { onGetSectionInfo } from "@/actions/course";
import { useQuery } from "@tanstack/react-query";

type Props = {
  groupOwner: boolean | undefined;
  sectionId: string;
};
export const SectionForm = ({ groupOwner, sectionId }: Props) => {
  const { data } = useQuery({
    queryKey: ["section-info"],
    queryFn: () => onGetSectionInfo(sectionId),
  });

  return <div>Mehedi</div>;
};
