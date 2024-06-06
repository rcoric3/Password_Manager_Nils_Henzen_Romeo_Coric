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

export const get_user = async (username: string, user_password: string) => {
  const user_from_db = await db
    .selectFrom("users")
    .where("username", "=", username)
    .selectAll()
    .executeTakeFirst();

  return user_from_db;
};
