-- migrate:up
CREATE TABLE IF NOT EXISTS credentials (
 credential_id SERIAL PRIMARY KEY,
 site_url VARCHAR(255) NOT NULL,
 username VARCHAR(255) NOT NULL,
 user_password VARCHAR(255) NOT NULL,
 site_notes TEXT,
 user_email VARCHAR(255),
 category_id INT NOT NULL REFERENCES categories(category_id),
 user_id INT NOT NULL REFERENCES users(user_id)
);
-- migrate:down
DROP TABLE IF EXISTS credentials;

