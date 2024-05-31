import { v4 as uuidv4 } from "uuid";
import { Users } from "./types";
import { createNewUser } from "./repo/PwdManagerRepo";

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
