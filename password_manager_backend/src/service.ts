import { v4 as uuidv4 } from "uuid";
import { NewCredential, Users } from "./types";
import {
  createNewCredential,
  createNewUser,
  create_new_category,
  get_user,
} from "./repo/PwdManagerRepo";

export const createNewAppUser = async (
  username: string,
  user_password: string
): Promise<Users | undefined> => {
  const unique_key = uuidv4();
  const hashedPassword = await Bun.password.hash(user_password);

  const newUser = {
    username: username,
    user_password: hashedPassword,
    unique_key: unique_key,
  };

  return await createNewUser(newUser);
};
export const create_new_app_category = async (
  user_id: number,
  category_name: string
) => {
  const newCategory = {
    user_id: user_id,
    category_name: category_name,
  };
  return await create_new_category(newCategory);
};

export const get_app_user = async (username: string, user_password: string) => {
  const user_from_db = await get_user(username, user_password);

  if (!user_from_db) {
    throw new Error("User not found");
  }

  const isPasswordValid = await Bun.password.verify(
    user_password,
    user_from_db.user_password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user_from_db;
};

export const createNewAppCredential = async (
  site_url: string,
  username: string,
  user_password: string,
  site_notes: string | null,
  user_email: string | null,
  category_id: number,
  user_id: number
): Promise<NewCredential | undefined> => {
  const newCredential: NewCredential = {
    site_url,
    username,
    user_password,
    site_notes,
    user_email,
    category_id,
    user_id,
  };

  return await createNewCredential(newCredential);
};
