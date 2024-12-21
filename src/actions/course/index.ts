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

export const onGetCourseModules = async (courseId: string) => {
  try {
    const modules = await db.module.findMany({
      where: {
        courseId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        section: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (modules && modules.length > 0) {
      return { status: 200, modules };
    }

    return {
      status: 404,
      message: "No modules found",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  }
};

export const onCreateCourseModule = async (
  courseId: string,
  title: string,
  moduleId: string
) => {
  try {
    const courseModule = await db.course.update({
      where: { id: courseId },
      data: {
        modules: {
          create: {
            title,
            id: moduleId,
          },
        },
      },
    });
    if (courseModule) {
      return { status: 200, message: "Course created successfully" };
    }
    return { status: 404, message: "Course did not found" };
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  }
};

export const onUpdateModule = async (
  moduleId: string,
  type: "NAME" | "DATA",
  content: string
) => {
  try {
    if (type === "NAME") {
      const title = await db.module.update({
        where: {
          id: moduleId,
        },
        data: {
          title: content,
        },
      });

      if (title) {
        return { status: 200, message: "Name successfully updated" };
      }

      return {
        status: 404,
        message: "Module not found!",
      };
    }
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};

export const onUpdateSection = async (
  sectionId: string,
  type: "NAME" | "COMPLETE",
  content: string
) => {
  try {
    if (type === "NAME") {
      await db.section.update({
        where: {
          id: sectionId,
        },
        data: {
          name: content,
        },
      });

      return { status: 200, message: "Section successfully updated" };
    }
    if (type === "COMPLETE") {
      await db.section.update({
        where: {
          id: sectionId,
        },
        data: {
          complete: true,
        },
      });

      return { status: 200, message: "Section successfully completed" };
    }

    return { status: 404, message: "Section not found" };
  } catch (error) {
    return { status: 400, message: "Something went wrong!" };
  }
};

export const onCreateModuleSection = async (
  moduleId: string,
  sectionId: string
) => {
  try {
    const section = await db.module.update({
      where: {
        id: moduleId,
      },
      data: {
        section: {
          create: {
            id: sectionId,
          },
        },
      },
    });

    if (section) {
      return { status: 200, message: "New section created" };
    }

    return { status: 404, message: "Module not found" };
  } catch (error) {
    return { status: 400, message: "Oops! something went wrong" };
  }
};
