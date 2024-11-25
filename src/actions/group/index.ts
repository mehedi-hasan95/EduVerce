/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { CreateGroupSchema } from "@/schemas/schemas";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

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
                  icon: "https://utfs.io/f/bfQmhClAQk0h9J7v64yLGOuRz16ynMgUjxYKZTCDftecrIa4",
                },
                {
                  id: uuidv4(),
                  name: "anouncements",
                  icon: "https://utfs.io/f/bfQmhClAQk0hbY4NQjFlAQk0hm3gMq1zEtlJP9uHiIWcZjaV",
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
