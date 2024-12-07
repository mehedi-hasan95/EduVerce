"use server";

import { utapi } from "./uploadthing-server";

export async function uploadImage(file: File) {
  try {
    const response = await utapi.uploadFiles([file]);
    return response[0];
  } catch (error) {
    console.error("UploadThing Error:", error);
    throw new Error("Failed to upload image.");
  }
}
