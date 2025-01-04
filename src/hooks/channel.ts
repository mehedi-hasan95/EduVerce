import {
  onChannelDelete,
  onCreateNewChannel,
  onGetChannelInfo,
  onLikeChannelPost,
} from "@/actions/channel";
import { onUpdateCourseSectionContent } from "@/actions/course";
import {
  onCreateNewComment,
  onGetCommentReplies,
  onGetPostComments,
  onGetPostInfo,
} from "@/actions/post";
import { courseContentSchema, CreateCommentSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JSONContent } from "novel";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useChannelHooks = (groupId: string) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (channelData: { id: string; name: string; icon: string }) =>
      onCreateNewChannel(groupId, channelData),
    onSuccess: (data) => {
      toast("Success", { description: data.message });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["group-channels"],
      });
    },
    onError: (error: any) => {
      toast("Error", { description: error.message });
    },
  });

  const { mutate: channelDeleteMutate, variables: channelDeleteVariables } =
    useMutation({
      mutationFn: (data: { groupId: string; channelId: string }) =>
        onChannelDelete(data.groupId, data.channelId),
      onSuccess: (data) => {
        toast("Success", { description: data.message });
      },
      onSettled: async () => {
        return await client.invalidateQueries({
          queryKey: ["group-channels"],
        });
      },
      onError: (error: any) => {
        toast("Error", { description: error.message });
      },
    });

  const onDeleteChannel = (groupId: string, channelId: string) =>
    channelDeleteMutate({ groupId, channelId });
  return { mutate, isPending, onDeleteChannel, channelDeleteVariables };
};

export const useChannelPage = (channelid: string) => {
  const { data } = useQuery({
    queryKey: ["channel-info"],
    queryFn: () => onGetChannelInfo(channelid, 1, 6),
  });

  const mutation = useMutationState({
    filters: { mutationKey: ["create-post"], status: "pending" },
    select: (mutation) => {
      return {
        state: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });

  return { data, mutation };
};

export const useCrateChannelPost = (channelId: string) => {
  const [onJsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(undefined);

  const [onDescription, setOnDescription] = useState<string | undefined>(
    undefined
  );

  const [onHtmlDescription, setOnHtmlDescription] = useState<
    string | undefined
  >(undefined);

  return {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    setOnHtmlDescription,
    onHtmlDescription,
  };
};

export const useLikeChannelPost = (postId: string) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { likeid: string }) =>
      onLikeChannelPost(postId, data.likeid),
    onSuccess: (data) => {
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      });
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: ["unique-post"],
      });
      return await client.invalidateQueries({
        queryKey: ["channel-infinity-scroll"],
      });
    },
  });

  return { mutate, isPending };
};

export const useChannelSection = (
  sectionId: string,
  description: string | null,
  jsonDescription: string | null,
  htmlDescription: string | null
) => {
  const client = useQueryClient();
  const editor = useRef<HTMLFormElement | null>(null);
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

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof courseContentSchema>) =>
      onUpdateCourseSectionContent(
        sectionId,
        values.htmlcontent!,
        values.jsoncontent!,
        values.content!
      ),
    onSuccess: (data) => {
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["section-info"],
      });
    },
  });

  return {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    onEditDescription,
    editor,
    setOnHtmlDescription,
    onHtmlDescription,
    mutate,
    isPending,
  };
};

export const usePostInfo = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["unique-post"],
    queryFn: () => onGetPostInfo(postId),
  });
  return { data };
};

export const usePostComment = (postId: string) => {
  const client = useQueryClient();
  const { mutate, variables, isPending } = useMutation({
    mutationFn: (data: { content: string; commentId: string }) =>
      onCreateNewComment(postId, data.content, data.commentId),
    onMutate: () => "",
    onSuccess: (data) =>
      toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.message,
      }),

    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: ["unique-post", postId],
      });
      await client.invalidateQueries({
        queryKey: ["post-comments", postId],
      });
    },
  });
  return { mutate, variables, isPending };
};

export const useAllComment = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => onGetPostComments(postId),
  });
  return { data };
};

export const useGetReplies = (commentId: string) => {
  const { isFetching, data } = useQuery({
    queryKey: ["comment-replies", commentId],
    queryFn: () => onGetCommentReplies(commentId),
    enabled: Boolean(commentId),
  });

  return { isFetching, data };
};
