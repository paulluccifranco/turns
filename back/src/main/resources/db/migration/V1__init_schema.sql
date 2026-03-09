-- Schema initialization for turns application (H2)
-- All table and column names are in lowercase to match JPA mappings

CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(40),
    code VARCHAR(30),
    price DECIMAL(19,2),
    stock INT,
    type INT,
    UNIQUE (code)
);

CREATE TABLE platform_parameter (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    param_key VARCHAR(30),
    description VARCHAR(255),
    "value" VARCHAR(255),
    UNIQUE (param_key)
);

CREATE TABLE permanent_turn (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    "day" INT,
    "hour" INT,
    "field" INT,
    name VARCHAR(255),
    phone VARCHAR(255),
    comment VARCHAR(255)
);

CREATE TABLE reservation_turn (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    "day" INT,
    "hour" INT,
    "field" INT,
    name VARCHAR(255),
    phone VARCHAR(255),
    comment VARCHAR(255)
);

CREATE TABLE deleted_turn (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    "day" DATE,
    permanent_turn_id BIGINT,
    UNIQUE ("day", permanent_turn_id)
);

CREATE TABLE shift (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    "day" DATE,
    "shift" VARCHAR(15),
    employee VARCHAR(40),
    UNIQUE ("day", "shift")
);

CREATE TABLE turn (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    "day" DATE,
    week_day INT,
    "hour" INT,
    "field" INT,
    name VARCHAR(255),
    phone VARCHAR(255),
    comment VARCHAR(255),
    state_id INT,
    permanent_turn_id BIGINT,
    turn_value DECIMAL(19,2),
    shift_id BIGINT,
    payment_method INT,
    UNIQUE ("day", "hour", "field")
);

CREATE TABLE current_account (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    permanent_turn_id BIGINT,
    turn_id BIGINT,
    description VARCHAR(255),
    amount DECIMAL(19,2),
    shift_id BIGINT,
    date TIMESTAMP
);

CREATE TABLE movements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255),
    amount DECIMAL(19,2),
    shift_id BIGINT,
    date TIMESTAMP
);

CREATE TABLE sells (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    turn_id BIGINT,
    description VARCHAR(255),
    units BIGINT,
    product_price DECIMAL(19,2),
    date DATE,
    "shift" BIGINT,
    type INT,
    payment_method INT
);

CREATE TABLE daily_sell (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    turn_id BIGINT,
    product_id BIGINT,
    product_description VARCHAR(255),
    units INT,
    product_price DECIMAL(19,2)
);

