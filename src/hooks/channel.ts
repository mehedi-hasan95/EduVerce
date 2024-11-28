import { onChannelDelete, onCreateNewChannel } from "@/actions/channel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChannelHooks = (groupId: string) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (channelData: { id: string; name: string; icon: string }) =>
      onCreateNewChannel(groupId, channelData),
    onSuccess: (data) => {
      toast("Success", { description: data.message });
      //   form.reset();
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
