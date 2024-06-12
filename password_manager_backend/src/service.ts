import { v4 as uuidv4 } from "uuid";
import { Credentials, NewCredential, Users } from "./types";
import {
  createNewCredential,
  createNewUser,
  create_new_category,
  getAllCredentials,
  getCredentialsByCategory,
  get_user,
  get_user_by_id,
  get_user_by_unique_key,
  update_user_password,
} from "./repo/PwdManagerRepo";
import CryptoJS from "crypto-js";

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
  const user_from_db = await get_user(username);

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

const encryptPassword = (password: string, key: string) => {
  if (!password || !key) {
    throw new Error("Password and key must be provided");
  }
  return CryptoJS.AES.encrypt(password, key).toString();
};

const decryptPassword = (ciphertext: string, key: string) => {
  if (!ciphertext || !key) {
    throw new Error("Ciphertext and key must be provided");
  }
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
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
  const user = await get_user_by_id(user_id);

  if (!user || !user.unique_key) {
    throw new Error("User not found or user has no unique key");
  }

  const unique_key = user?.unique_key;

  const encryptedPassword = encryptPassword(user_password, unique_key);

  const newCredential: NewCredential = {
    site_url,
    username,
    user_password: encryptedPassword,
    site_notes,
    user_email,
    category_id,
    user_id,
  };

  return await createNewCredential(newCredential);
};

export const get_app_user_credential = async (
  user_id: number,
  category_id: number
) => {
  const user = await get_user_by_id(user_id);
  if (!user || !user.unique_key) {
    throw new Error("User not found or user has no unique key");
  }

  const unique_key = user.unique_key;

  const credentials = await getCredentialsByCategory(user_id, category_id);

  if (!credentials || credentials.length === 0) {
    throw new Error("Credentials not found");
  }

  const credentialsWithConvertedPWD = credentials.map((cred) => ({
    ...cred,
    user_password: decryptPassword(cred.user_password, unique_key),
  }));
  return credentialsWithConvertedPWD;
};

export const get_all_app_credentials = async (user_id: number) => {
  const user = await get_user_by_id(user_id);
  if (!user || !user.unique_key) {
    throw new Error("User not found or user has no unique key");
  }

  const unique_key = user.unique_key;

  const credentials = await getAllCredentials(user_id);

  if (!credentials || credentials.length === 0) {
    throw new Error("Credentials not found");
  }

  const credentialsWithConvertedPWD = credentials.map((cred) => ({
    ...cred,
    user_password: decryptPassword(cred.user_password, unique_key),
  }));

  return credentialsWithConvertedPWD;
};

export const resetUserPassword = async (unique_key: string, new_password: string) => {
  const user_from_db = await get_user_by_unique_key(unique_key);

  if (!user_from_db) {
    throw new Error("User not found");
  }

  const hashedPassword = await Bun.password.hash(new_password);

  await update_user_password(user_from_db.user_id, hashedPassword);

  return { message: "Password reset successful" };
};
