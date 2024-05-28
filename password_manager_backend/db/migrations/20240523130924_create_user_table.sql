-- migrate:up
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  unique_key VARCHAR(255) UNIQUE NOT NULL
);
-- migrate:down
DROP TABLE IF EXISTS users;
