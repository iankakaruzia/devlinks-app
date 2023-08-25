import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export const profileRouter = createTRPCRouter({
  getProfileInfo: protectedProcedure.query(async ({ ctx }) => {
    console.log({ profileRouter: ctx });
    const profilesFound = await ctx.db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, ctx.userId));

    if (profilesFound.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return profilesFound[0];
  }),
});
