/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { onGetUserDetails } from "../auth";

export const onGetChannelInfo = async (
  id: string,
  page: number,
  limit: number
) => {
  try {
    const user = await onGetUserDetails();
    const skip = (page - 1) * limit;
    const channelInfo = await db.channel.findUnique({
      where: { id },
      include: {
        posts: {
          take: limit,
          skip: skip,
          orderBy: { createdAt: "desc" },
          include: {
            channel: { select: { name: true } },
            author: {
              select: { firstName: true, lastName: true, image: true },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            likes: {
              where: {
                userId: user?.id,
              },
              select: {
                id: true,
                userId: true,
              },
            },
          },
        },
      },
    });
    const total = await db.post.count({
      where: { channelId: id },
    });
    if (channelInfo) {
      return {
        status: 200,
        channelInfo,
        hasMore: skip + channelInfo?.posts?.length < total,
        total,
      };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onCreateNewChannel = async (
  groupId: string,
  values: { id: string; icon: string; name: string }
) => {
  try {
    const user = await onGetUserDetails();
    if (!user) {
      return { status: 401, message: "Unauthorize user" };
    }
    const channel = await db.group.update({
      where: {
        id_userId: {
          id: groupId,
          userId: user?.id as string,
        },
      },
      data: {
        channel: {
          create: {
            id: values.id,
            icon: values.icon,
            name: values.name,
          },
        },
      },
    });
    if (channel) {
      return { status: 200, message: "Group created" };
    }
    return { status: 404, message: "Group not found" };
  } catch (error) {
    return { status: 500, message: "Something went wrong" };
  }
};

export const onChannelDelete = async (groupId: string, channelId: string) => {
  try {
    const user = await onGetUserDetails();
    if (!user) {
      return { status: 403, message: "Unauthorize user" };
    }
    const group = await db.group.findUnique({
      where: {
        id_userId: {
          id: groupId,
          userId: user.id!,
        },
      },
    });
    if (group) {
      const channel = await db.channel.delete({
        where: { id: channelId },
      });
      if (channel) {
        return { status: 200, message: "Chanel deleted" };
      }
      return { status: 401, message: "Opps! Something went wrong" };
    }
    return { status: 400, message: "Opps! Something went wrong" };
  } catch (error) {
    return { status: 500, message: "Something went wrong" };
  }
};

export const onLikeChannelPost = async (postid: string, likeid: string) => {
  try {
    const user = await onGetUserDetails();

    if (!user) {
      return { status: 401, message: "Please login first" };
    }
    const liked = await db.like.findFirst({
      where: {
        id: likeid,
        userId: user?.id,
      },
    });

    if (liked) {
      await db.like.delete({
        where: {
          id: likeid,
          userId: user?.id,
        },
      });

      return { status: 200, message: "You unliked this post" };
    }

    const like = await db.like.create({
      data: {
        id: likeid,
        postId: postid,
        userId: user?.id as string,
      },
    });

    if (like) return { status: 200, message: "You liked this post" };

    return { status: 404, message: "Post not found!" };
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};
