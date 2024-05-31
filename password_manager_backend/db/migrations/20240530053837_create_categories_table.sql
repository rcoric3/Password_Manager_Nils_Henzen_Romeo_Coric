-- migrate:up
CREATE TABLE IF NOT EXISTS categories (
 category_id SERIAL PRIMARY KEY,
 category_name VARCHAR(255) UNIQUE NOT NULL,
 user_id INT NOT NULL REFERENCES users(user_id)
);
-- migrate:down
DROP TABLE IF EXISTS categories;

