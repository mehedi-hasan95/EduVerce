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
