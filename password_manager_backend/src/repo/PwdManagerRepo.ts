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

export const get_user = async (username: string) => {
  const user_from_db = await db
    .selectFrom("users")
    .where("username", "=", username)
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

export const getAllCategoriesFromUser = async (user_id: number) => {
  return await db
    .selectFrom("categories")
    .where("user_id", "=", user_id)
    .selectAll()
    .execute();
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

export const get_user_by_unique_key = async (unique_key: string) => {
  return await db
    .selectFrom("users")
    .where("unique_key", "=", unique_key)
    .selectAll()
    .executeTakeFirst();
};

export const update_user_password = async (
  user_id: number,
  hashedPassword: string
) => {
  return await db
    .updateTable("users")
    .set({ user_password: hashedPassword })
    .where("user_id", "=", user_id)
    .executeTakeFirst();
};
