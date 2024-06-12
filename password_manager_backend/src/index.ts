import { Hono } from "hono";
import { cors } from "hono/cors";
import { getAllCategoriesFromUser } from "./repo/PwdManagerRepo";
import {
  createNewAppCredential,
  createNewAppUser,
  create_new_app_category,
  deleteAppCredential,
  get_all_app_credentials,
  get_app_user,
  get_app_user_credential,
  resetUserPassword,
  updateAppCredential,
} from "./service";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
    maxAge: 600,
    credentials: true,
  })
);

app.post("/v1/register", async (c) => {
  const { username, user_password } = await c.req.json();

  if (!username || typeof username !== "string" || username.trim() === "") {
    return c.json({ error: "Invalid username" }, 400);
  }
  if (
    !user_password ||
    typeof user_password !== "string" ||
    user_password.trim() === ""
  ) {
    return c.json({ error: "Invalid password" }, 400);
  }

  try {
    const newUser = await createNewAppUser(username, user_password);
    return c.json(newUser?.unique_key, 200);
  } catch (err) {
    return c.json({ err: "Error creating user" }, 500);
  }
});

app.post("/v1/login", async (c) => {
  const { username, user_password } = await c.req.json();

  if (!username || typeof username !== "string" || username.trim() === "") {
    return c.json({ error: "Invalid username" }, 400);
  }
  if (
    !user_password ||
    typeof user_password !== "string" ||
    user_password.trim() === ""
  ) {
    return c.json({ error: "Invalid password" }, 400);
  }

  const user_from_db = await get_app_user(username, user_password);
  return c.json(user_from_db, 200);
});

app.post("/v1/credentials", async (c) => {
  const {
    site_url,
    username,
    user_password,
    site_notes,
    user_email,
    category_id,
    user_id,
  } = await c.req.json();

  if (!site_url || typeof site_url !== "string" || site_url.trim() === "") {
    return c.json({ error: "Invalid site URL" }, 400);
  }
  if (!username || typeof username !== "string" || username.trim() === "") {
    return c.json({ error: "Invalid username" }, 400);
  }
  if (
    !user_password ||
    typeof user_password !== "string" ||
    user_password.trim() === ""
  ) {
    return c.json({ error: "Invalid password" }, 400);
  }
  if (!category_id || typeof category_id !== "number") {
    return c.json({ error: "Invalid category ID" }, 400);
  }
  if (!user_id || typeof user_id !== "number") {
    return c.json({ error: "Invalid user ID" }, 400);
  }

  try {
    const newCredential = await createNewAppCredential(
      site_url,
      username,
      user_password,
      site_notes,
      user_email,
      category_id,
      user_id
    );
    return c.json(newCredential, 200);
  } catch (err) {
    return c.json({ err: "Error creating credential" }, 500);
  }
});

app.post("/v1/categories", async (c) => {
  const { user_id, category_name } = await c.req.json();
  const newCategory = await create_new_app_category(user_id, category_name);
  return c.json(newCategory, 200);
});

app.post("/v1/get/categories", async (c) => {
  const user_id = await c.req.json();
  try {
    const categories = await getAllCategoriesFromUser(user_id);
    return c.json(categories, 200);
  } catch (err) {
    return c.json({ error: "Error fetching categories" }, 500);
  }
});

app.post("/v1/user/credentials", async (c) => {
  const { user_id, category_id } = await c.req.json();

  try {
    let credentials;
    if (!category_id) {
      credentials = await get_all_app_credentials(user_id);
    } else {
      credentials = await get_app_user_credential(user_id, category_id);
    }
    return c.json(credentials, 200);
  } catch (err) {
    return c.json({ error: "Error fetching credentials" }, 500);
  }
});

app.post("/v1/reset-password", async (c) => {
  const { unique_key, new_password } = await c.req.json();

  if (
    !unique_key ||
    typeof unique_key !== "string" ||
    unique_key.trim() === ""
  ) {
    return c.json({ error: "Invalid unique key" }, 400);
  }
  if (
    !new_password ||
    typeof new_password !== "string" ||
    new_password.trim() === ""
  ) {
    return c.json({ error: "Invalid password" }, 400);
  }

  try {
    await resetUserPassword(unique_key, new_password);
    return c.json({ message: "Password reset successful" }, 200);
  } catch (err) {
    return c.json({ error: "Password reset failed" }, 500);
  }
});

app.put("/v1/credentials", async (c) => {
  const {
    credential_id,
    site_url,
    username,
    user_password,
    site_notes,
    user_email,
    category_id,
    user_id,
  } = await c.req.json();

  if (!credential_id || typeof credential_id !== "number") {
    return c.json({ error: "Invalid credential ID" }, 400);
  }

  try {
    const updatedCredential = await updateAppCredential(
      credential_id,
      site_url,
      username,
      user_password,
      site_notes,
      user_email,
      category_id,
      user_id
    );
    return c.json(updatedCredential, 200);
  } catch (err) {
    return c.json({ err: "Error updating credential" }, 500);
  }
});

app.delete("/v1/credentials", async (c) => {
  const { credential_id } = await c.req.json();

  if (!credential_id || typeof credential_id !== "number") {
    return c.json({ error: "Invalid credential ID" }, 400);
  }

  try {
    await deleteAppCredential(credential_id);
    return c.json({ message: "Credential deleted successfully" }, 200);
  } catch (err) {
    return c.json({ err: "Error deleting credential" }, 500);
  }
});


export default {
  port: 4000,
  fetch: app.fetch,
};
