//db.ts
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema.js";
import { PGlite } from "@electric-sql/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { defineRelations } from "drizzle-orm";

// Define relations V2
export const relations = defineRelations(schema, (r) => ({
  users: {
    invitee: r.one.users({
      from: r.users.invitedBy,
      to: r.users.id,
    }),
    posts: r.many.posts(),
  },
  posts: {
    author: r.one.users({
      from: r.posts.authorId,
      to: r.users.id,
    }),
  },
}));

// Initialize pglite (in memory)
const client = new PGlite();
export const db = drizzle({ client, schema, relations });

// Migrate drizle at runtime (since its in memory)
await migrate(db, { migrationsFolder: "./migrations" });
