import { z } from "zod";

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
