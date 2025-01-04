"use server";
import db from "@/lib/db";
import { onGetUserDetails } from "../auth";
import { v4 } from "uuid";
import { revalidateTag } from "next/cache";

export const onCreatePost = async (
  channelId: string,
  title: string,
  content: string,
  htmlContent: string,
  jsonContent: string
) => {
  try {
    const user = await onGetUserDetails();
    if (!user?.id) {
      return { status: 401, message: "Unauthorize user" };
    }
    const post = await db.post.create({
      data: {
        id: v4(),
        authorId: user.id!,
        channelId: channelId,
        title,
        content,
        htmlContent,
        jsonContent,
      },
    });
    if (post) {
      return { status: 200, message: "Post successfully created" };
    }
    revalidateTag("channel-infinity-scroll");
    return { status: 404, message: "Channel not found" };
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};

export const onGetPostInfo = async (postId: string) => {
  try {
    const user = await onGetUserDetails();
    const post = await db.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            firstName: true,
            image: true,
          },
        },
        channel: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        likes: {
          where: {
            userId: user?.id,
          },
          select: {
            userId: true,
            id: true,
          },
        },
        comments: true,
      },
    });
    if (post) {
      return { status: 200, data: post };
    }
    return { status: 404, message: "Post not found" };
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};

export const onGetPostComments = async (postId: string) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId: postId,
        replied: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        _count: {
          select: {
            reply: true,
          },
        },
      },
    });

    if (comments && comments.length > 0) {
      return { status: 200, comments };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onCreateNewComment = async (
  postId: string,
  content: string,
  commentId: string
) => {
  try {
    const user = await onGetUserDetails();
    if (!user?.id) {
      return { status: 401, message: "Unauthorize user" };
    }
    const comment = await db.post.update({
      where: { id: postId },
      data: {
        comments: {
          create: {
            userId: user.id,
            content: content,
            id: commentId,
          },
        },
      },
    });
    if (comment) {
      return { status: 200, message: "Comment successfully created" };
    }
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};

export const onGetCommentReplies = async (commentId: string) => {
  try {
    const replies = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        reply: {
          include: {
            user: true,
          },
        },
      },
    });

    if (replies && replies.reply.length > 0) {
      return { status: 200, replies: replies.reply };
    }

    return { status: 404, message: "No replies found" };
  } catch (error) {
    return { status: 400, message: "Oops something went wrong" };
  }
};

export const onCreateCommentReply = async (
  postid: string,
  commentId: string,
  comment: string,
  replyId: string
) => {
  try {
    const user = await onGetUserDetails();
    const reply = await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        reply: {
          create: {
            content: comment,
            id: replyId,
            postId: postid,
            userId: user?.id as string,
            replied: true,
          },
        },
      },
    });

    if (reply) {
      return { status: 200, message: "Reply posted" };
    }
  } catch (error) {
    return { status: 400, message: "Oops something went wrong" };
  }
};
