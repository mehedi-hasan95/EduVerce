/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { onGetUserDetails } from "../auth";
import { z } from "zod";
import { CreateChannelSchema } from "@/schemas/schemas";

export const onGetChannelInfo = async (id: string) => {
  try {
    const user = await onGetUserDetails();
    const channelInfo = await db.channel.findUnique({
      where: { id },
      include: {
        posts: {
          take: 3,
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
    if (channelInfo) {
      return { status: 200, channelInfo };
    }
    return { status: 404 };
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