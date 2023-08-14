import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createInsertSchema } from "drizzle-zod";
import { profiles } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

const insertProfileSchema = createInsertSchema(profiles);

export async function PATCH(request: Request) {
  const { userId } = auth();

  const req = (await request.json()) as Record<string, unknown>;

  const profile = insertProfileSchema.parse({
    ...req,
    userId,
  });

  await db
    .update(profiles)
    .set({
      ...(profile.email ? { email: profile.email } : {}),
      ...(profile.firstName ? { firstName: profile.firstName } : {}),
      ...(profile.lastName ? { lastName: profile.lastName } : {}),
    })
    .where(eq(profiles.userId, userId || ""));

  return NextResponse.json({ userId, profile });
}
