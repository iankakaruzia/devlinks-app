import type { User } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/db";
import { profiles } from "@/db/schema";

type UnwantedKeys = "emailAddresses" | "id";

interface UserInterface extends Omit<User, UnwantedKeys> {
  email_addresses: {
    email_address: string;
    id: string;
  }[];
  id: string;
}

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId);
    console.log("svixIdTimeStamp", svixIdTimeStamp);
    console.log("svixSignature", svixSignature);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as Event;
  } catch (_) {
    console.log("Error when verifying webhook");
    return new Response("Error occured", {
      status: 400,
    });
  }

  const email = evt.data.email_addresses[0].email_address;
  const slug = generateSlug(email);

  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    await db.insert(profiles).values({
      userId: evt.data.id,
      email,
      slug,
    });
  }
  return new Response("", {
    status: 201,
  });
}

type Event = {
  data: UserInterface;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "*";

function generateRandomNumbers(): string {
  const randomNumbers = [];
  for (let i = 0; i < 3; i++) {
    randomNumbers.push(Math.floor(Math.random() * 10).toString());
  }
  return randomNumbers.join("");
}

function generateSlug(email: string): string {
  const [username] = email.split("@");
  const randomNumbers = generateRandomNumbers();
  const slug = `${username}-${randomNumbers}`;
  return slug;
}
