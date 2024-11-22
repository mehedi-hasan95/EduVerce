"use server";

import db from "@/lib/db";
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
