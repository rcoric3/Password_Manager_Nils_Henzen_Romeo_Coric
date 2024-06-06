import { v4 as uuidv4 } from "uuid";
import { Users } from "./types";
import { createNewUser, get_user } from "./repo/PwdManagerRepo";

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
