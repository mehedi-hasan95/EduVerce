/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { CreateGroupSchema } from "@/schemas/schemas";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { onGetUserDetails } from "../auth";

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
    }
  } catch (error) {
    return { status: 400, message: "Opps! something went wrong" };
  }
};
