import { profileRouter } from "./routes/profile";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;
