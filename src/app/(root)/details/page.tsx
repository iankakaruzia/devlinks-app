import { db } from "@/db";
import { ProfileForm } from "./components/ProfileForm";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Profile } from "@/app/types/profile";

export default async function DetailsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  const profilesFound = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id));

  return <ProfileForm profile={profilesFound[0] as Profile} />;
}
