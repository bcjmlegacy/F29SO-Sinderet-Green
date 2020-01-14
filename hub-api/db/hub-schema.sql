/*
    hub-schema.sql

    Benjamin Milne
*/

-- DROP DATABASE   IF     EXISTS hub_db;
-- CREATE DATABASE IF NOT EXISTS hub_db;
-- USE hub_db;

/* #######################################

    Auxiliary tables

####################################### */

CREATE TABLE property (
    property_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    property_name       TEXT
);

CREATE TABLE account_type (
    account_type_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    account_type_name   TEXT
);

CREATE TABLE sensor_type (
    sensor_type_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_type_name    TEXT
);

CREATE TABLE room (
    room_id             INTEGER PRIMARY KEY AUTOINCREMENT,
    room_name           TEXT
);

CREATE TABLE device_type (
    device_type_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    device_type_name    TEXT
);

/* #######################################

    Object tables.

####################################### */

CREATE TABLE user (
    user_id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_account_type   INTEGER,
    user_username       TEXT,
    user_password       TEXT,
    user_created        TEXT CURRENT_TIMESTAMP,
    user_last_active    TEXT,    
    FOREIGN KEY (user_account_type) REFERENCES account_type(account_type_id)
);

CREATE TABLE sensor (
    sensor_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_room     INTEGER,
    sensor_type     INTEGER,
    sensor_name     TEXT,
    sensor_added    TEXT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_room) REFERENCES room(room_id),
    FOREIGN KEY (sensor_type) REFERENCES sensor_type(sensor_type_id)
);

CREATE TABLE device	(
	device_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    device_type     INTEGER,
    device_room     INTEGER,
    device_name     TEXT,
    device_added    TEXT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_type)   REFERENCES device_type(device_type_id),
    FOREIGN KEY (device_room)   REFERENCES room(room_id)
);

/* #######################################

    Data tables.

####################################### */

CREATE TABLE sensor_reading	(
	sensor_reading_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_reading_sensor_id    INTEGER,
    sensor_reading_value        INTEGER,
    sensor_reading_timestamp    TEXT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_reading_sensor_id) REFERENCES sensor(sensor_id)
);

INSERT INTO property (property_name)            VALUES ("Demo Home");
INSERT INTO account_type (account_type_name)    VALUES ("Admin");
INSERT INTO sensor_type (sensor_type_name)      VALUES ("Temperature");
INSERT INTO sensor_type (sensor_type_name)      VALUES ("Humidity");