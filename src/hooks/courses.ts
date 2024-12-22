import {
  onCreateCourseModule,
  onCreateModuleSection,
  onGetCourseModules,
  onGetGroupCourses,
  onGetSectionInfo,
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
  const pathName = usePathname();
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

  // create new section
  const {
    mutate: mutateSection,
    variables: sectionVariables,
    isPending: pendingSection,
  } = useMutation({
    mutationFn: (data: { moduleId: string; sectionId: string }) =>
      onCreateModuleSection(data.moduleId, data.sectionId),
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

  // Section start here
  const contentRef = useRef<HTMLAnchorElement | null>(null);
  const sectionInputRef = useRef<HTMLInputElement | null>(null);
  const [editSection, setEditSection] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | undefined>(
    undefined
  );

  const {
    mutate: updateSection,
    isPending: sectionUpdatePending,
    variables: updateVariables,
  } = useMutation({
    mutationFn: (data: { type: "NAME"; content: string }) =>
      onUpdateSection(activeSection!, data.type, data.content),
    onMutate: () => setEditSection(false),
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
  const onEditSectionName = (event: Event) => {
    if (sectionInputRef.current && contentRef.current) {
      const target = event.target as Node | null;
      if (
        !sectionInputRef.current.contains(target) &&
        !contentRef.current.contains(target)
      ) {
        if (sectionInputRef.current.value.trim()) {
          updateSection({
            type: "NAME",
            content: sectionInputRef.current.value.trim(),
          });
        } else {
          setEditSection(false);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", onEditSectionName, false);
    return () => {
      document.removeEventListener("click", onEditSectionName, false);
    };
  }, [activeSection]);

  const onEditSection = () => setEditSection(groupOwner ? true : false);

  return {
    pathName,
    data,
    onEditModule,
    isEditing,
    inputRef,
    triggerRef,
    isPending,
    variables,
    groupOwner,
    // for section
    mutateSection,
    sectionVariables,
    pendingSection,

    // update section
    setActiveSection,
    activeSection,
    onEditSection,
    sectionInputRef,
    contentRef,
    editSection,
    sectionUpdatePending,
    updateVariables,
  };
};

export const useSectionNavBar = (sectionId: string) => {
  const { data } = useQuery({
    queryKey: ["section-info"],
    queryFn: () => onGetSectionInfo(sectionId),
  });

  const client = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => onUpdateSection(sectionId, "COMPLETE", ""),
    onSuccess: async (data) => {
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      });
      return await client.invalidateQueries({
        queryKey: ["section-info"],
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["course-modules"],
      });
    },
  });

  return { data, mutate, isPending };
};
