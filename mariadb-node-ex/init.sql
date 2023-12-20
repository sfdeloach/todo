-- MariaDB commands to setup database for the todo app
SELECT
    'dropping database' as '';

DROP DATABASE IF EXISTS todo_db;

CREATE DATABASE todo_db;

USE todo_db;

SELECT
    'dropping tables' as '';

SELECT
    'creating tables' as '';

CREATE TABLE roles (
    _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    authLevel INT,
    name VARCHAR(16),
    description VARCHAR(64),
    PRIMARY KEY (_id)
);

CREATE TABLE users (
    _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    role_id INT UNSIGNED,
    isActive BOOLEAN,
    isHidden BOOLEAN,
    name_first VARCHAR(32),
    name_last VARCHAR(32),
    username VARCHAR(64),
    hash VARCHAR(128),
    PRIMARY KEY (_id),
    FOREIGN KEY (role_id) REFERENCES roles(_id)
);

CREATE TABLE todos (
    _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED,
    position INT,
    isActive BOOLEAN,
    isHidden BOOLEAN,
    `text` VARCHAR(256),
    PRIMARY KEY (_id),
    FOREIGN KEY (user_id) REFERENCES users(_id)
);

SELECT
    'inserting dummy data' as '';

INSERT INTO
    roles (authLevel, name, description)
VALUES
    (30, 'admin', 'full edit access to all todos'),
    (20, 'readAll', 'read only access to all todos'),
    (10, 'user', 'only read/write to their todos');

SELECT
    *
FROM
    roles;

INSERT INTO
    users (
        role_id,
        isActive,
        isHidden,
        name_first,
        name_last,
        username,
        hash
    )
VALUES
    (
        1,
        true,
        false,
        'Anthony',
        'Admin',
        'tony.admin@xyz.com',
        '$2b$10$9jJRjCb8l62p11aCSvNZL.10DhyGQ8lkLzMfGty0QkWN8gxtyWksK'
    ),
    (
        2,
        true,
        false,
        'Rebecca',
        'Readall',
        'becky@reads.edu',
        '$2b$10$va86wr3nYhVT1.n1zymFQ.oH5iK1tBHfv3zbXcYz6v9zgMzwYNpnS'
    ),
    (
        3,
        true,
        false,
        'Ulysses',
        'User',
        'uly@abc.edu',
        '$2b$10$PFrlQoQ2Kniy4stAcRzTue0Fe4DROmbJfDK28SfcAIAdcZyXutU8y'
    );

SELECT
    *
FROM
    users;

INSERT INTO
    todos(user_id, position, isActive, isHidden, text)
VALUES
    (1, 2, true, false, 'Set agenda for meeting'),
    (1, 1, true, false, 'Debug all code'),
    (1, 0, true, false, 'Submit for approvals'),
    (2, 2, true, false, 'Call about tests'),
    (2, 1, true, false, 'Gain historical perspective'),
    (2, 0, true, false, 'Go fight fire with fire');

SELECT
    *
FROM
    todos;