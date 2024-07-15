ALTER DATABASE test_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

USE test_db;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role FLOAT NOT NULL
);

INSERT INTO users (id, password, salt, name, role) VALUES
('starlawfirm', SHA2(CONCAT('1234', 'star240711'), 256), '1234', '김스타', 5.0),
('accept guest', SHA2(CONCAT('1234', 'guest240711'), 256), '1234', '게스트', 1.0);
