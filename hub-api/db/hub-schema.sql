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

CREATE TABLE device_command    (
    device_command_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    device_command_device_type  INTEGER,
    device_command_name         TEXT,
    device_command_mqtt         TEXT,
    device_command_value        TEXT,
    FOREIGN KEY (device_command_device_type) REFERENCES device_type(device_id)
);

/* #######################################

Object tables.

####################################### */

CREATE TABLE user (
    user_id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_account_type   INTEGER,
    user_username       TEXT,
    user_password       TEXT,
    user_email          TEXT,
    user_forename       TEXT,
    user_surname        TEXT,
    user_created        INTEGER,
    user_last_active    TEXT,    
    FOREIGN KEY (user_account_type) REFERENCES account_type(account_type_id)
);

CREATE TABLE auth (
    auth_id             INTEGER PRIMARY KEY AUTOINCREMENT,
    auth_token          TEXT,
    auth_user_id        INTEGER,
    auth_created        INTEGER,
    auth_expires        INTEGER,
    FOREIGN KEY (auth_user_id) REFERENCES user(user_id)
);

CREATE TABLE sensor (
    sensor_id       TEXT PRIMARY KEY,
    sensor_room     INTEGER,
    sensor_type     INTEGER,
    sensor_name     TEXT,
    sensor_added    INTEGER,
    FOREIGN KEY (sensor_room) REFERENCES room(room_id),
    FOREIGN KEY (sensor_type) REFERENCES sensor_type(sensor_type_id)
);

CREATE TABLE device	(
	device_id       TEXT PRIMARY KEY,
    device_room     INTEGER,
    device_type     INTEGER,
    device_wattage  INTEGER,
    device_name     TEXT,
    device_added    INTEGER,
    FOREIGN KEY (device_type)   REFERENCES device_type(device_type_id),
    FOREIGN KEY (device_room)   REFERENCES room(room_id)
);

/* #######################################

Data tables.

####################################### */

CREATE TABLE timer_repeat (
    timer_repeat_id             INTEGER PRIMARY KEY AUTOINCREMENT,
    timer_repeat_type           TEXT,
    timer_repeat_month          INTEGER,
    timer_repeat_day            INTEGER,
    timer_repeat_hour           INTEGER,
    timer_repeat_minute         INTEGER,
    timer_repeat_device_id      INTEGER,
    timer_repeat_command        INTEGER,
    FOREIGN KEY (timer_repeat_device_id) REFERENCES device(device_id),
    FOREIGN KEY (timer_repeat_command)   REFERENCES device_command(device_command_id)
);

CREATE TABLE timer_oneshot  (
    timer_oneshot_id            INTEGER,
    timer_oneshot_trigger       INTEGER,
    timer_oneshot_device_id     INTEGER,
    timer_oneshot_sensor_id     INTEGER,
    timer_oneshot_command       INTEGER,
    FOREIGN KEY (timer_oneshot_device_id) REFERENCES device(device_id),
    FOREIGN KEY (timer_oneshot_command)   REFERENCES device_command(device_command_id)
);

CREATE TABLE sensor_reading	(
	sensor_reading_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_reading_sensor_id    INTEGER,
    sensor_reading_value        INTEGER,
    sensor_reading_timestamp    INTEGER,
    FOREIGN KEY (sensor_reading_sensor_id) REFERENCES sensor(sensor_id)
);

CREATE TABLE device_reading	(
	device_reading_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    device_reading_sensor_id    INTEGER,
    device_reading_type         TEXT,
    device_reading_value        INTEGER,
    device_reading_timestamp    INTEGER,
    FOREIGN KEY (device_reading_sensor_id) REFERENCES device(device_id)
);

CREATE TABLE device_triggers (
    device_trigger_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    device_trigger_device_id    INTEGER,
    device_trigger_sensor_id    INTEGER,
    device_trigger_gt_lt        TEXT,
    device_trigger_sensor_value INTEGER,
    device_trigger_command      INT,
    FOREIGN KEY (device_trigger_device_id) REFERENCES device(device_id),
    FOREIGN KEY (device_trigger_sensor_id) REFERENCES sensor(sensor_id),
    FOREIGN KEY (device_trigger_command)   REFERENCES device_command(device_command_id)
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

INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value) VALUES (1, "Turn on",  "set_power", "on");
INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value) VALUES (1, "Turn off", "set_power", "off");
INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value) VALUES (4, "Turn on",  "set_power", "on");
INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value) VALUES (4, "Turn off", "set_power", "off");

INSERT INTO user (user_account_type, user_username, user_password, user_created, user_last_active) VALUES (1, "Test_user", "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86", 1579521113, 1579521113);

INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ("ABC123", 1, 1, "Livingroom temp sensor 1",     1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ("ABC456", 1, 1, "Livingroom temp sensor 2",     1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ("ABC789", 2, 1, "Kitchen temp sensor",          1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ("DEF123", 3, 1, "Bedroom temp sensor",          1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ("DEF456", 1, 2, "Livingroom humidity sensor",   1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ("DEF789", 2, 2, "Kitchen humidity sensor",      1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ("HIG123", 3, 2, "Bedroom humidity sensor",      1579521113);

INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ("123ABC123", 1, 1, 300, "Livingroom heater",    1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ("456ABC123", 1, 4, 40,  "Livingroom light",     1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ("789ABC123", 2, 2, 400, "Kitchen fridge",       1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ("123456ABC", 4, 3, 5,   "Solar controller",     1579521113);