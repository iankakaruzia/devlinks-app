import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle-output",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
