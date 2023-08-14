import type { profiles } from "@/db/schema";
import type { InferModel } from "drizzle-orm";

export type Profile = Omit<
  InferModel<typeof profiles>,
  "id" | "createdAt" | "updatedAt"
>;
