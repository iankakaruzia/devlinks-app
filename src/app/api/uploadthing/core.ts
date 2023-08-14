import { db } from "@/db";
import { profiles } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const profileFileRouter = {
  profileUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await currentUser();

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      await db
        .update(profiles)
        .set({ profilePicture: file.url })
        .where(eq(profiles.userId, metadata.userId));
    }),
} satisfies FileRouter;

export type ProfileFileRouter = typeof profileFileRouter;
