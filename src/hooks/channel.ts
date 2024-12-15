import {
  onChannelDelete,
  onCreateNewChannel,
  onGetChannelInfo,
} from "@/actions/channel";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";

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

// export const useChannelPage = (channelId: string) => {
//   const { data } = useQuery({
//     queryKey: ["channel-info"],
//     queryFn: () => onGetChannelInfo(channelId),
//   });
//   const mutation = useMutationState({
//     filters: { mutationKey: ["create-post"], status: "pending" },
//     select: (mutation) => {
//       return {
//         status: mutation.state.status,
//         state: mutation.state.variables as any,
//       };
//     },
//   });
//   return { data, mutation };
// };

export const useChannelPage = (channelid: string) => {
  const { data } = useQuery({
    queryKey: ["channel-info"],
    queryFn: () => onGetChannelInfo(channelid),
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

  const JsonContent = JSON.stringify(onJsonDescription);

  return {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    setOnHtmlDescription,
    onHtmlDescription,
  };
};
