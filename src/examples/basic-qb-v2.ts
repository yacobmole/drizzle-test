//index.ts
import { db } from "../db.js";

await db.query.posts
  .findMany({
    with: {
      author: true,
    },
  })
  .then(console.log);

await db.query.users
  .findMany({
    with: {
      posts: true,
    },
  })
  .then(console.log);
