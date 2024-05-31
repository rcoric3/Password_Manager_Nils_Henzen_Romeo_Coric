import { Hono } from "hono";
import { cors } from "hono/cors";
import { createNewAppUser } from "./service";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE"],
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
  } catch (error) {
    return c.json({ error: "Error creating user" }, 500);
  }
});

export default { 
  port: 4000, 
  fetch: app.fetch, 
} 