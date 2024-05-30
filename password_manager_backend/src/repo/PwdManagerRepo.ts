import { db } from "../db";
import { Users, NewUser } from "../types";

export const createNewUser = async (
  users: NewUser
): Promise<Users | undefined> => {
  return await db
    .insertInto("users")
    .values(users)
    .returningAll()
    .executeTakeFirstOrThrow();
};
