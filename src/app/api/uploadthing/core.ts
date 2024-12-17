import { onGetUserDetails } from "@/actions/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async () => {
  const user = await onGetUserDetails();
  const authUser = user?.id;
  if (!authUser) throw new Error("Unauthorize User");
  return { authUser };
};

export const ourFileRouter = {
  chapterIcon: f({ image: { maxFileCount: 1, maxFileSize: "512KB" } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  courseImage: f({ image: { maxFileCount: 1, maxFileSize: "2MB" } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
