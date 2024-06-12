import { use } from "hono/jsx";
import { db } from "../db";
import {
  Users,
  NewUser,
  NewCredential,
  Credentials,
  Categories,
  NewCategory,
} from "../types";

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
    .where("user_password", "=", user_password)
    .selectAll()
    .executeTakeFirst();

  return user_from_db;
};

export const get_user_by_id = async (user_id: number) => {
  return await db
    .selectFrom("users")
    .where("user_id", "=", user_id)
    .selectAll()
    .executeTakeFirst();
};

export const createNewCredential = async (
  credential: NewCredential
): Promise<Credentials | undefined> => {
  return await db
    .insertInto("credentials")
    .values(credential)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const create_new_category = async (
  categories: NewCategory
): Promise<Categories | undefined> => {
  return await db
    .insertInto("categories")
    .values(categories)
    .returningAll()
    .executeTakeFirst();
};

export const getAllCategories = async () => {
  return await db.selectFrom("categories").selectAll().execute();
};

export const getAllCredentials = async (user_id: number) => {
  return await db
    .selectFrom("credentials")
    .where("user_id", "=", user_id)
    .selectAll()
    .execute();
};

export const getCredentialsByCategory = async (
  user_id: number,
  category_id: number
) => {
  return await db
    .selectFrom("credentials")
    .where("user_id", "=", user_id)
    .where("category_id", "=", category_id)
    .selectAll()
    .execute();
};
