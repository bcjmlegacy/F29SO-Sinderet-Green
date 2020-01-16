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
    user_created        DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_last_active    TEXT,    
    FOREIGN KEY (user_account_type) REFERENCES account_type(account_type_id)
);

CREATE TABLE sensor (
    sensor_id       TEXT PRIMARY KEY,
    sensor_room     INTEGER,
    sensor_type     INTEGER,
    sensor_name     TEXT,
    sensor_added    DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_room) REFERENCES room(room_id),
    FOREIGN KEY (sensor_type) REFERENCES sensor_type(sensor_type_id)
);

CREATE TABLE device	(
	device_id       TEXT PRIMARY KEY,
    device_room     INTEGER,
    device_type     INTEGER,
    device_name     TEXT,
    device_added    DATETIME DEFAULT CURRENT_TIMESTAMP,
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
    sensor_reading_timestamp    DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_reading_sensor_id) REFERENCES sensor(sensor_id)
);

CREATE TABLE device_reading	(
	device_reading_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    device_reading_sensor_id    INTEGER,
    device_reading_type         TEXT,
    device_reading_value        INTEGER,
    device_reading_timestamp    DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_reading_sensor_id) REFERENCES device(device_id)
);

/* #######################################

Demo data.

####################################### */

INSERT INTO property        (property_name)     VALUES ("Demo Home");

INSERT INTO account_type    (account_type_name) VALUES ("Admin");

INSERT INTO sensor_type     (sensor_type_name)  VALUES ("Temperature");
INSERT INTO sensor_type     (sensor_type_name)  VALUES ("Humidity");

INSERT INTO room            (room_name)         VALUES ("Livingroom");
INSERT INTO room            (room_name)         VALUES ("Kitchen");
INSERT INTO room            (room_name)         VALUES ("Bedroom");
INSERT INTO room            (room_name)         VALUES ("Outside");

INSERT INTO device_type     (device_type_name)  VALUES ("Heater");
INSERT INTO device_type     (device_type_name)  VALUES ("Fridge");
INSERT INTO device_type     (device_type_name)  VALUES ("Solar Controller");
INSERT INTO device_type     (device_type_name)  VALUES ("Light");
INSERT INTO device_type     (device_type_name)  VALUES ("Door lock");

INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name) VALUES ("ABC123", 1, 1, "Livingroom temp sensor 1");
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name) VALUES ("ABC456", 1, 1, "Livingroom temp sensor 2");
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name) VALUES ("ABC789", 2, 1, "Kitchen temp sensor");
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name) VALUES ("DEF123", 3, 1, "Bedroom temp sensor");
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name) VALUES ("DEF456", 1, 2, "Livingroom humidity sensor");
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name) VALUES ("DEF789", 2, 2, "Kitchen humidity sensor");
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name) VALUES ("HIG123", 3, 2, "Bedroom humidity sensor");

INSERT INTO device (device_id, device_room, device_type, device_name) VALUES ("123ABC123", 1, 1, "Livingroom heater");
INSERT INTO device (device_id, device_room, device_type, device_name) VALUES ("456ABC123", 1, 4, "Livingroom light");
INSERT INTO device (device_id, device_room, device_type, device_name) VALUES ("789ABC123", 2, 2, "Kitchen fridge");
INSERT INTO device (device_id, device_room, device_type, device_name) VALUES ("123456ABC", 4, 3, "Solar controller");