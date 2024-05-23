-- migrate:up
CREATE TABLE IF NOT EXISTS password_entries (
 id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  website VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- migrate:down
DROP TABLE IF EXISTS password_entries;

