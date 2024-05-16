import { serve } from "bun";

serve({
  fetch(req) {
    return new Response("Hello World!");
  },
  port: 4000,
});

console.log("Server running on http://localhost:4000");
