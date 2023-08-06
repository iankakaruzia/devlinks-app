import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  return (
    <div>
      <h1>Home</h1>

      <p>User: {email}</p>
    </div>
  );
}
