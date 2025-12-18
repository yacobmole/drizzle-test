import type { users } from "../schema.js";
import { z } from "zod";

// Utility functions
export type AssertEqual<T, U> =
  (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2
    ? true
    : false;

const matches =
  <T>() =>
  <S extends z.ZodType<T>>(
    schema: AssertEqual<S["_output"], T> extends true
      ? S
      : S & {
          "types do not match": {
            expected: T;
            received: S["_output"];
          };
        },
  ): S => {
    return schema;
  };

const UserSchema = matches<typeof users.$inferSelect>()(
  z.object({
    id: z.uuid(),
    name: z.string().min(2).max(100),
    invitedBy: z.string().nullable(),
  }),
);
