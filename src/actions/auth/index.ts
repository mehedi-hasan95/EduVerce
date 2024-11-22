"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { User_Role } from "@prisma/client";

export const onCreateAccount = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  userRole: User_Role;
  clerkId: string;
  image: string;
}) => {
  try {
    const user = await db.user.create({
      data: { ...data },
    });
    if (user) {
      return {
        status: 200,
        message: "User created successfully",
        user: user.id,
      };
    }
    return {
      status: 400,
      message: "Opps! Could not create the user",
    };
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Opps! Something went wrong. Try again" };
  }
};

export const onGetUserDetails = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const getUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        id: true,
        userRole: true,
      },
    });
    if (getUser) {
      return {
        status: 200,
        id: getUser.id,
        name: `${getUser.firstName} ${getUser.lastName}`,
        email: getUser.email,
        userType: getUser.userRole,
        image: user.imageUrl,
      };
    }
  } catch (error) {
    console.error(error);
    return { status: 400 };
  }
};
