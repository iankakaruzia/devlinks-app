import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/profile(.*)", "/api/uploadthing", "/api/webhooks/users"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
