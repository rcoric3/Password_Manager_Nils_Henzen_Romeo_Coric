import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { findPersonByUserName } from "./repo/PwdManagerRepo";

const app = new Hono();

app.use(
    '*',
    cors({
      origin: ['http://localhost:5173'],
      allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
      maxAge: 600,
      credentials: true,
    }),
  );

  app.get('v1/user/:name',async (c) => {
    const name = c.req.param('name')
    const user = findPersonByUserName(name);
    return c.json(user, 200)
  })