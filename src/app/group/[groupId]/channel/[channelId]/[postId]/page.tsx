import { onGetUserDetails } from "@/actions/auth";
import { onGetPostComments, onGetPostInfo } from "@/actions/post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PostInfo } from "./_components/post-info";
import { ChannelGroupSidebar } from "../_components/create-post/channel-group-sidebar";
import { CommentForm } from "./_components/comment-form";
import { PostComment } from "./_components/post-comment";

type Props = {
  params: Promise<{ postId: string; groupId: string }>;
};
const PostIdPage = async ({ params }: Props) => {
  const { postId, groupId } = await params;
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["unique-post", postId],
    queryFn: () => onGetPostInfo(postId),
  });
  await query.prefetchQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => onGetPostComments(postId),
  });

  const user = await onGetUserDetails();
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="grid grid-cols-4 py-5 gap-x-10 container">
        <div className="col-span-4 lg:col-span-3">
          <PostInfo postId={postId} userId={user?.id as string} />
          <CommentForm
            image={user?.image ? user?.image : "https://github.com/shadcn.png"}
            name={user?.name as string}
            postId={postId}
          />
          <PostComment postId={postId} />
        </div>
        <div className="col-span-1 hidden lg:inline relative">
          <ChannelGroupSidebar groupId={groupId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default PostIdPage;
