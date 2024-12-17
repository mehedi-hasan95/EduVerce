"use server";

import db from "@/lib/db";
import { createCourseSchema } from "@/schemas/schemas";
import { v4 } from "uuid";
import { z } from "zod";

export const onGetGroupCourses = async (groupId: string) => {
  try {
    const courses = await db.course.findMany({
      where: {
        groupId,
      },
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (courses && courses.length > 0) {
      return { status: 200, courses };
    }

    return {
      status: 404,
      message: "No courses found",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  }
};

export const onCreateGroupCourse = async (
  groupId: string,
  values: z.infer<typeof createCourseSchema>
) => {
  try {
    const course = await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        courses: {
          create: {
            id: v4(),
            ...values,
          },
        },
      },
    });

    if (course) {
      return { status: 200, message: "Course successfully created" };
    }

    return { status: 404, message: "Group not found" };
  } catch (error) {
    return { status: 400, message: "Oops! something went wrong" };
  }
};
