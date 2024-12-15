/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { CreateGroupSchema, GroupSettingsSchema } from "@/schemas/schemas";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { onGetUserDetails } from "../auth";
import { revalidatePath } from "next/cache";

export const onGetAffiliateInfo = async (id: string) => {
  try {
    const affiliateInfo = await db.affiliate.findUnique({
      where: {
        id,
      },
      select: {
        Group: {
          select: {
            User: {
              select: {
                firstName: true,
                lastName: true,
                image: true,
                id: true,
                stripeId: true,
              },
            },
          },
        },
      },
    });

    if (affiliateInfo) {
      return { status: 200, affiliateUser: affiliateInfo };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const onCreateNewGroup = async (
  id: string,
  data: z.infer<typeof CreateGroupSchema>
) => {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        group: {
          create: {
            ...data,
            affiliate: {
              create: {},
            },
            member: { create: { userId: id } },
            channel: {
              create: [
                {
                  id: uuidv4(),
                  name: "general",
                  icon: "https://utfs.io/f/bfQmhClAQk0hGZ4mY7gkC7qKALH1Uw83RI6Q4zXbg5iydsto",
                },
                {
                  id: uuidv4(),
                  name: "anouncements",
                  icon: "https://utfs.io/f/bfQmhClAQk0hj2TUaXWiQY8RdKsIGkxqhpPbnHfUyNoZmS7l",
                },
              ],
            },
          },
        },
      },
      select: {
        id: true,
        group: {
          select: {
            id: true,
            channel: {
              select: { id: true },
              take: 1,
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (user) {
      return {
        status: 200,
        group: user,
        message: "Group created successfully",
      };
    }
    return { status: 400, message: "Opps!, Something went wrong" };
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};

export const onGetGroupInfo = async (id: string) => {
  try {
    const user = await onGetUserDetails();
    const groupInfo = await db.group.findUnique({ where: { id } });
    if (groupInfo) {
      return {
        status: 200,
        groupInfo,
        groupOwner: user?.id === groupInfo.userId ? true : false,
      };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const onGetUserGroups = async (userId: string) => {
  try {
    const groups = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        group: {
          select: {
            id: true,
            name: true,
            icon: true,
            channel: {
              where: {
                name: "general",
              },
              select: {
                id: true,
              },
            },
          },
        },
        membership: {
          select: {
            Group: {
              select: {
                id: true,
                icon: true,
                name: true,
                channel: {
                  where: {
                    name: "general",
                  },
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (groups && (groups.group.length > 0 || groups.membership.length > 0)) {
      return {
        status: 200,
        groups: groups.group,
        members: groups.membership,
      };
    }

    return {
      status: 404,
    };
  } catch (error) {
    return { status: 400 };
  }
};

export const onGetGroupChannels = async (groupId: string) => {
  try {
    const channels = await db.channel.findMany({
      where: { groupId },
      orderBy: { createdAt: "asc" },
    });

    return { status: 200, channels };
  } catch (error) {
    return { status: 400 };
  }
};

export const onGetGroupSubscriptions = async (groupId: string) => {
  try {
    const subscriptions = await db.subscription.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const sbuscriberCount = await db.members.count({
      where: {
        groupId: groupId,
      },
    });

    if (subscriptions) {
      return { status: 200, subscriptions, sbuscriberCount };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onGetAllGroupMembers = async (groupId: string) => {
  try {
    const user = await onGetUserDetails();
    const members = await db.members.findMany({
      where: {
        groupId,
        NOT: {
          userId: user?.id,
        },
      },
      include: {
        User: true,
      },
    });

    if (members && members.length > 0) {
      return { status: 200, members };
    }
  } catch (error) {
    return { status: 400, message: "Oops something went wrong" };
  }
};

export const onSearchGroups = async (
  mode: "GROUPS" | "POSTS",
  query: string,
  paginate?: number
) => {
  try {
    if (mode === "GROUPS") {
      const fetchedGroups = await db.group.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: 6,
        skip: paginate || 0,
      });
      if (fetchedGroups) {
        if (fetchedGroups.length > 0) {
          return { status: 200, groups: fetchedGroups };
        }
        return { status: 404 };
      }
    }
    if (mode === "POSTS") {
      const fetchedPosts = await db.post.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: 6,
        skip: paginate || 0,
      });
      if (fetchedPosts) {
        if (fetchedPosts.length > 0) {
          return { status: 200, posts: fetchedPosts };
        }
        return { status: 404 };
      }
    }
  } catch (error) {
    return { status: 400, message: "Opps! something went wrong" };
  }
};

export const onUpdateGroupSettings = async (
  groupid: string,
  values: z.infer<typeof GroupSettingsSchema>,
  path: string
) => {
  try {
    const user = await onGetUserDetails();
    if (!user) {
      return { status: 401, message: "Unauthorize user" };
    }
    const updateGroup = await db.group.update({
      where: {
        id_userId: {
          id: groupid,
          userId: user.id!,
        },
      },
      data: {
        description: values.description,
        htmlDescription: values.htmldescription,
        icon: values.icon,
        jsonDescription: values.jsondescription,
        name: values.name,
        thumbnail: values.thumbnail,
      },
    });
    if (updateGroup) {
      return { status: 200, message: "Group update" };
    }
    revalidatePath(path);
    return { status: 404, message: "Something went wrong" };
  } catch (error) {
    return { status: 500, message: "Internal server error" };
  }
};

export const onGetExploreGroup = async (category: string, paginate: number) => {
  try {
    const groups = await db.group.findMany({
      where: {
        category,
        NOT: {
          description: null,
          thumbnail: null,
        },
      },
      take: 6,
      skip: paginate,
    });

    if (groups && groups.length > 0) {
      return { status: 200, groups };
    }

    return {
      status: 404,
      message: "No groups found for this category",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  }
};

export const onGetPaginatedPosts = async (
  identifier: string,
  paginate: number
) => {
  try {
    const user = await onGetUserDetails();
    const posts = await db.post.findMany({
      where: {
        channelId: identifier,
      },
      skip: paginate,
      take: 2,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        channel: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
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
            userId: true,
            id: true,
          },
        },
      },
    });

    if (posts && posts.length > 0) return { status: 200, posts };

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const onGetAllGroup = async (
  page: number,
  limit: number,
  category?: string
) => {
  try {
    const skip = (page - 1) * limit;

    const groups = await db.group.findMany({
      where: {
        category,
      },
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await db.group.count();

    if (groups && groups.length > 0) {
      return {
        status: 200,
        groups,
        hasMore: skip + groups.length < total,
        total,
      };
    }
    return { status: 400 };
  } catch (error) {
    return { status: 500 };
  }
};

export const onUpdateGroupGallery = async (
  groupid: string,
  content: string
) => {
  console.log(content);
  try {
    const mediaLimit = await db.group.findUnique({
      where: {
        id: groupid,
      },
      select: {
        gallery: true,
      },
    });

    if (mediaLimit && mediaLimit?.gallery.length < 6) {
      await db.group.update({
        where: {
          id: groupid,
        },
        data: {
          gallery: {
            push: content,
          },
        },
      });
      revalidatePath(`/about/${groupid}`);
      return { status: 200, message: "Upload done" };
    }

    return {
      status: 400,
      message: "Looks like your gallery has the maximum media allowed",
    };
  } catch (error) {
    return { status: 400, message: "Looks like something went wrong" };
  }
};

export const onJoinGroup = async (groupId: string) => {
  try {
    const user = await onGetUserDetails();
    const member = await db.group.update({
      where: { id: groupId },
      data: {
        member: {
          create: {
            userId: user?.id,
          },
        },
      },
    });
    if (member) {
      return { status: 200 };
    }
  } catch (error) {
    return { status: 404 };
  }
};
