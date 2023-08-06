import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/profile(.*)", "/api/uploadthing"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
