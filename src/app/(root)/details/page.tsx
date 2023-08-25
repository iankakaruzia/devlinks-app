import { ProfileForm } from "./components/ProfileForm";
import { trpcServerClient } from "@/utils/trpc-server-client";

export default async function DetailsPage() {
  const profile = await trpcServerClient.profile.getProfileInfo();

  return <ProfileForm initialProfile={profile} />;
}
