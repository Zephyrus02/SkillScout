import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";

// Configure uploadthing
const f = createUploadthing();

// Set custom timeout in the onUploadComplete handler

// Use Clerk auth instead of fake auth
const auth = async () => {
  const user = await currentUser();
  if (!user) throw new UploadThingError("Unauthorized");
  return { 
    userId: user.id, 
    name: user.firstName ?? user.username ?? "user"
  };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Add new PDF uploader route for resumes
  resumeUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // Get authenticated user from Clerk
      const user = await auth();
      return { userId: user.userId, name: user.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Resume upload complete for userId:", metadata.userId);
      console.log("Resume file url:",file.ufsUrl );
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
