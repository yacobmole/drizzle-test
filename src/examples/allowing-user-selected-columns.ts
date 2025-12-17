//index.ts
import { createSelectSchema } from "drizzle-zod";
import { db } from "../db.js";
import { users } from "../schema.js";
import z from "zod";

const UsersSchema = createSelectSchema(users);

// create an array of keys allowed to be fetched
const ClientAccessibleKeys: Array<keyof typeof users._.columns> = [
  "id",
  "name",
];
const ClientAccessibleKeySchema = z.enum(ClientAccessibleKeys); // ClientAccessibleKeySchema.parse("notValid") // <- throws

// Schema for input (Min one suggestion)
const ClientSelectInputSchema = z.array(ClientAccessibleKeySchema).min(1); // ClientSelectInputSchema.parse(["notValid"]) // <- throws

// A custom function to fetch rows with certain columns
function selectUsers<Keys extends typeof ClientAccessibleKeys>(keys: Keys) {
  const select = Object.fromEntries(
    keys.map((key) => [key, users._.columns[key]]),
  ) as { [K in Keys[number]]: (typeof users._.columns)[K] };

  return db.select(select).from(users);

  // Optional
  /*
  const OutputSchema = UsersSchema.pick(
    Object.fromEntries([...selectKeys].map((key) => [key, true])),
  );

  const validated = OutputSchema.parse(output);

  return validated;
  */
}

function createUsersSelectSchema<Keys extends typeof ClientAccessibleKeys>(
  keys: Keys,
) {
  const OutputSchema = UsersSchema.pick(
    Object.fromEntries([...keys].map((key) => [key, true])),
  ) as z.ZodObject<{
    [K in Keys[number]]: (typeof UsersSchema.shape)[K];
  }>;

  return OutputSchema;
}

// Examples
const test1 = await selectUsers(["id"]); // -> const test: { id: string; }[]
const test2 = await selectUsers(["id", "name"]); // -> const test: { id: string; name: string; }[]

// you can still extend the db query as normal
const test3 = selectUsers(["id", "name"]).orderBy(users.id);

// you can validate the output
const output1 = await selectUsers(["id"]); // -> const test: { id: string; }[]
const parsed1 = createUsersSelectSchema(["id", "name"]).parse(test3);

/*
1. User sends to server an array of ['id', 'name'])
2. Parse/Validate the array with ClientSelectInputSchema
3. Use parsed output from with selectUsers(parsed)
4. The output is completely typesafe based on the selectedkeys
*/
