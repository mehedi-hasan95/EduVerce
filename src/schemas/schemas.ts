import { COURSE_PRIVACY } from "@prisma/client";
import { z } from "zod";

export const CreateGroupSchema = z.object({
  category: z.string().min(2, {
    message: "Category is required.",
  }),
  name: z.string().min(2, {
    message: "Category name is required.",
  }),
});

export const CreateChannelSchema = z.object({
  name: z.string().min(2, {
    message: "Category name is required.",
  }),
  icon: z.string(),
});

export const GroupSettingsSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must have atleast 3 characters" })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  description: z
    .string()
    .min(100, {
      message: "description must have atleast 100 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  icon: z.string().optional(),
  thumbnail: z.string().optional(),
  htmldescription: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  jsondescription: z
    .string()
    .min(5, {
      message: "description must have atleast 5 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const UpdateGallerySchema = z.object({
  videourl: z
    .string()
    .refine(
      (url) =>
        /https?:\/\/(.+?\.)(?:youtube|loom)\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/.test(
          url ?? ""
        ),
      "Invalid url, embedded videos must either be loom or youtube urls"
    )
    .optional()
    .or(z.literal("").transform(() => undefined)),
  image: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Titel must have atleast 3 characters" })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  content: z
    .string()
    .min(100, {
      message: "description must have atleast 100 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  htmlContent: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  jsonContent: z
    .string()
    .min(5, {
      message: "description must have atleast 5 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const createCourseSchema = z.object({
  name: z.string().min(3, { message: "Course name is atleast 3 characters" }),
  thumbnail: z.string({ message: "Thumbnail is required" }),
  description: z
    .string()
    .min(5, { message: "Description is atleast 5 characters" }),
  privacy: z
    .enum([
      COURSE_PRIVACY.OPEN,
      COURSE_PRIVACY.PRIVATE,
      COURSE_PRIVACY.LAVEL_UNLOCK,
    ])
    .default(COURSE_PRIVACY.OPEN),
  published: z.boolean().default(false),
});

export const courseContentSchema = z.object({
  content: z
    .string()
    .min(5, {
      message: "description must have atleast 5 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  htmlcontent: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  jsoncontent: z
    .string()
    .min(5, {
      message: "description must have atleast 5 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const CreateCommentSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "Comment must have atleast 1 character" }),
});
