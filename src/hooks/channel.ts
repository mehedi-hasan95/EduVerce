import { onCreateNewChannel } from "@/actions/channel";
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

  return { mutate, isPending };
};
