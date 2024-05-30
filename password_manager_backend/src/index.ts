import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createNewUser } from "./repo/PwdManagerRepo";

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
