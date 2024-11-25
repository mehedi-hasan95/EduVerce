import { z } from "zod";

export const CreateGroupSchema = z.object({
  category: z.string().min(2, {
    message: "Category is required.",
  }),
  name: z.string().min(2, {
    message: "Category name is required.",
  }),
});
