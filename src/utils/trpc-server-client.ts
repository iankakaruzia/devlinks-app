import { db } from "@/db";
import { appRouter } from "@/server";

export const trpcServerClient = appRouter.createCaller({
  db,
  userId: "sd",
});
