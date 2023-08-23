import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const profiles = mysqlTable(
  "profiles",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: varchar("userId", { length: 256 }).notNull(), // From Clerk
    firstName: varchar("firstName", { length: 256 }),
    lastName: varchar("lastName", { length: 256 }),
    email: varchar("email", { length: 256 }), // Initially the same from Clerk
    profilePicture: varchar("profilePicture", { length: 256 }),
    slug: varchar("slug", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  },
  (profile) => ({
    emailIndex: index("profiles__email__idx").on(profile.email),
    userIdIndex: uniqueIndex("profiles__userId__idx").on(profile.userId),
    slugIndex: uniqueIndex("profiles__slug__idx").on(profile.slug),
  })
);

export const links = mysqlTable(
  "links",
  {
    platform: mysqlEnum("platform", [
      "github",
      "frontendMentor",
      "twitter",
      "linkedin",
      "youtube",
      "facebook",
      "twitch",
      "devTo",
      "codewars",
      "codepen",
      "freeCodeCamp",
      "gitlab",
      "hashnode",
      "stackOverflow",
    ]).notNull(),
    url: varchar("url", { length: 256 }).notNull(),
    profileId: varchar("profileId", { length: 256 })
      .notNull()
      .references(() => profiles.userId),
    order: int("order").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey(table.profileId, table.platform),
  })
);
