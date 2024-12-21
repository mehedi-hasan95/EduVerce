import {
  onCreateCourseModule,
  onCreateModuleSection,
  onGetCourseModules,
  onGetGroupCourses,
  onUpdateModule,
  onUpdateSection,
} from "@/actions/course";
import { onGetGroupInfo } from "@/actions/group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

export const useCourses = (groupId: string) => {
  const { data } = useQuery({
    queryKey: ["group-courses"],
    queryFn: () => onGetGroupCourses(groupId),
  });

  return { data };
};

export const useCreateModule = (courseId: string, groupId: string) => {
  const client = useQueryClient();

  const { data } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });

  const { mutate, variables, isPending } = useMutation({
    mutationKey: ["create-module"],
    mutationFn: (data: { courseId: string; title: string; moduleId: string }) =>
      onCreateCourseModule(data.courseId, data.title, data.moduleId),
    onSuccess: (data) => {
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["course-modules"],
      });
    },
  });
  const onCreateModule = () =>
    mutate({
      courseId,
      title: "New Module",
      moduleId: v4(),
    });

  return { data, onCreateModule, isPending, variables };
};
