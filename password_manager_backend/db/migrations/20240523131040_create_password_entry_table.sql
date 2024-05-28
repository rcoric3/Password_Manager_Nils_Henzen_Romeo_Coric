-- migrate:up
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id)
);
-- migrate:down
DROP TABLE IF EXISTS categories;

