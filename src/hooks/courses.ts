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

export const useCourseModule = (courseId: string, groupId: string) => {
  // for the module
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const client = useQueryClient();

  // get course module
  const { data } = useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: () => onGetCourseModules(courseId),
  });

  // find the group owner
  const { data: owner } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });
  const groupOwner = owner?.groupOwner;

  // update the module
  const { mutate, variables, isPending } = useMutation({
    mutationFn: (data: { moduleId: string; type: "NAME"; content: string }) =>
      onUpdateModule(data.moduleId, data.type, data.content),
    onMutate: () => setEditingModuleId(null),
    onSuccess: (data) => {
      toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.message,
      });
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: ["course-modules", courseId],
      });
    },
  });

  // while group owner edit the module
  const onEditModuleName = (event: MouseEvent) => {
    if (!editingModuleId || !inputRef.current) return;

    const target = event.target as Node | null;

    if (
      !inputRef.current.contains(target) &&
      !triggerRef.current?.contains(target)
    ) {
      if (inputRef.current.value.trim()) {
        mutate({
          moduleId: editingModuleId,
          type: "NAME",
          content: inputRef.current.value.trim(),
        });
      } else {
        setEditingModuleId(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", onEditModuleName, true);
    return () => {
      document.removeEventListener("click", onEditModuleName, true);
    };
  }, [editingModuleId]);

  const onEditModule = (id: string) => {
    setEditingModuleId(id);
  };

  const isEditing = (id: string) => editingModuleId === id;

  return {
    data,
    onEditModule,
    isEditing,
    inputRef,
    triggerRef,
    isPending,
    variables,
    groupOwner,
  };
};
