import { onGetGroupCourses } from "@/actions/course";
import { useQuery } from "@tanstack/react-query";

export const useCourses = (groupId: string) => {
  const { data } = useQuery({
    queryKey: ["group-courses"],
    queryFn: () => onGetGroupCourses(groupId),
  });

  return { data };
};
