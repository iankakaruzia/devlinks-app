import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getAuth } from "@clerk/nextjs/server";
import { appRouter } from "@/server";
import { db } from "@/db";
import type { NextRequest } from "next/server";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: ({ req }) => {
      const sesh = getAuth(req as NextRequest);

      const userId = sesh.userId;

      return {
        db,
        userId,
      };
    },
  });

export { handler as GET, handler as POST };
