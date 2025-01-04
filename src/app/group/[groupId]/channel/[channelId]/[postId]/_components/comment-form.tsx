"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostComment } from "@/hooks/channel";
import { v4 } from "uuid";
import { CreateCommentSchema } from "@/schemas/schemas";
import { FormGenerator } from "@/components/common/forms/form-generator";
import { UserComment } from "./user-comment";

type Props = {
  postId: string;
  name: string;
  image: string;
};
export const CommentForm = ({ image, name, postId }: Props) => {
  const { isPending, mutate, variables } = usePostComment(postId);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateCommentSchema>) {
    mutate(
      {
        content: values.comment,
        commentId: v4(),
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }
  return (
    <div className="py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormGenerator
            form={form}
            inputType="input"
            name="comment"
            label="Add Comment"
            placeholder="Add comment..."
            id={"1"}
          />
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
        </form>
      </Form>
      {isPending && variables && (
        <div className="pt-5">
          <UserComment
            content={variables.content}
            image={image}
            postId={postId}
            username={name}
            id={variables.commentId}
            optimistic
          />
        </div>
      )}
    </div>
  );
};
