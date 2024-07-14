CREATE DATABASE IF NOT EXISTS ads;
USE ads;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role FLOAT NOT NULL
);

INSERT INTO users (id, password, salt, name, role) VALUES
('starlawfirm', SHA2(CONCAT('star240711', '1234'), 256), 'salt값', '김스타', 5.0),
('accept guest', SHA2(CONCAT('guest240711', '1234'), 256), 'salt값', '게스트', 1.0);
