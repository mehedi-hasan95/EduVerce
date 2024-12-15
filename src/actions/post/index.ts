"use server";
import db from "@/lib/db";
import { createPostSchema } from "@/schemas/schemas";
import { z } from "zod";
import { onGetUserDetails } from "../auth";
import { v4 } from "uuid";

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

    return { status: 404, message: "Channel not found" };
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};
