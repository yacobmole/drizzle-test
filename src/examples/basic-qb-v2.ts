import { db } from "../db.js";

await db.query.posts
  .findMany({
    with: {
      author: true,
    },
  })
  .then((s) => console.log(s));

await db.query.users
  .findMany({
    with: {
      posts: true,
    },
  })
  .then((s) => console.log(s));
