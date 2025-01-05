import { onAddCustomDomain, onGetDomainConfig } from "@/actions/group";
import { validateURLString } from "@/lib/utils";
import { GroupStateProps } from "@/zustand/search-slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { JSONContent } from "novel";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useGroupInfo = () => {
  const { data } = useQuery({
    queryKey: ["group-info"],
  });

  const router = useRouter();

  if (!data) router.push("/explore");

  const { groupInfo, status, groupOwner } = data as {
    status: number;
    groupInfo: GroupStateProps;
    groupOwner: boolean;
  };

  if (status !== 200) router.push("/explore");

  return {
    groupInfo,
    groupOwner,
  };
};

export const useGroupAbout = (
  description: string | null,
  jsonDescription: string | null,
  htmlDescription: string | null,
  currentMedia: string
) => {
  const editor = useRef<HTMLFormElement | null>(null);
  const mediaType = validateURLString(currentMedia);
  const [activeMedia, setActiveMedia] = useState<
    | {
        url: string | undefined;
        type: string;
      }
    | undefined
  >(
    mediaType.type === "IMAGE"
      ? {
          url: currentMedia,
          type: mediaType.type,
        }
      : { ...mediaType }
  );
  const jsonContent =
    jsonDescription !== null
      ? JSON.parse(jsonDescription as string)
      : undefined;

  const [onJsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(jsonContent);

  const [onDescription, setOnDescription] = useState<string | undefined>(
    description || undefined
  );

  const [onHtmlDescription, setOnHtmlDescription] = useState<
    string | undefined
  >(htmlDescription || undefined);

  const [onEditDescription, setOnEditDescription] = useState<boolean>(false);

  const onEditTextEditor = (event: Event) => {
    if (editor.current) {
      if (editor.current.contains(event.target as Node | null)) {
        setOnEditDescription(true);
      } else {
        setOnEditDescription(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", onEditTextEditor, false);
    return () => {
      document.removeEventListener("click", onEditTextEditor, false);
    };
  }, []);

  const onSetActiveMedia = (media: { url: string | undefined; type: string }) =>
    setActiveMedia(media);

  return {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    onEditDescription,
    editor,
    activeMedia,
    onSetActiveMedia,
    setOnHtmlDescription,
    onHtmlDescription,
  };
};

export const useCustomDomain = (groupId: string) => {
  const client = useQueryClient();

  const { data } = useQuery({
    queryKey: ["domain-config"],
    queryFn: () => onGetDomainConfig(groupId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { domain: string }) =>
      onAddCustomDomain(groupId, data.domain),
    onSuccess: (data) => {
      return toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["domain-config"],
      });
    },
  });

  return {
    isPending,
    data,
    mutate,
  };
};
