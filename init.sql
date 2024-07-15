-- 데이터베이스 설정
ALTER DATABASE test_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

USE test_db;

-- 기존 테이블 삭제
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS supplies;
DROP TABLE IF EXISTS budgets;

-- 유저 테이블 생성
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role FLOAT NOT NULL
);

-- 유저 데이터 삽입
INSERT INTO users (id, password, salt, name, role) VALUES
('starlawfirm', SHA2(CONCAT('1234', 'star240711'), 256), '1234', '김스타', 5.0),
('accept guest', SHA2(CONCAT('1234', 'guest240711'), 256), '1234', '게스트', 1.0);



-- 비품 테이블 생성
CREATE TABLE supplies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 비품 데이터 삽입
INSERT INTO supplies (name, price) VALUES
('과자', 1000),
('문구', 2000);

-- 예산 테이블 생성
CREATE TABLE budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount BIGINT NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 예산 데이터 삽입
INSERT INTO budgets (name, amount) VALUES
('기획', 1000000),
('인사', 2000000);