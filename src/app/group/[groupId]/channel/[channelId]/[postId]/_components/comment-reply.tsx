"use client";
import { FormGenerator } from "@/components/common/forms/form-generator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostReply } from "@/hooks/channel";
import { CreateCommentSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import { UserComment } from "./user-comment";

type Props = {
  commentId: string;
  postId: string;
  username: string;
  image: string;
};

export const CommentReply = ({ commentId, image, postId, username }: Props) => {
  const form = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      comment: "",
    },
  });
  function onSubmit(values: z.infer<typeof CreateCommentSchema>) {
    mutate(
      { comment: values.comment, replyId: v4() },
      { onSuccess: () => form.reset() }
    );
  }
  const { isPending, mutate, variables } = usePostReply(postId, commentId);
  return (
    <div className="flex flex-col gap-y-5 w-full">
      {isPending && variables && (
        <UserComment
          postId={postId}
          id={variables.replyId}
          optimistic
          username={username}
          image={image}
          content={variables.comment}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormGenerator
            form={form}
            inputType="input"
            name="comment"
            placeholder="Reply to comment..."
            id={"1"}
          />
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
