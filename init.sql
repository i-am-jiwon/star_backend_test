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


-- 비품 테이블 생성
CREATE TABLE supplies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


-- 예산 테이블 생성
CREATE TABLE budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount BIGINT NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
