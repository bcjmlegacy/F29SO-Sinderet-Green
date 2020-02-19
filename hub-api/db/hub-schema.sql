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
    device_command_mqtt_res     TEXT,
    device_command_value_res    TEXT,
    FOREIGN KEY (device_command_device_type) REFERENCES device_type(device_type_id)
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
    timer_repeat_device_id      TEXT,
    timer_repeat_command        INTEGER,
    timer_repeat_last_run       INTEGER,
    FOREIGN KEY (timer_repeat_device_id) REFERENCES device(device_id),
    FOREIGN KEY (timer_repeat_command)   REFERENCES device_command(device_command_id)
);

CREATE TABLE timer_oneshot  (
    timer_oneshot_id            INTEGER PRIMARY KEY AUTOINCREMENT,
    timer_oneshot_trigger       INTEGER,
    timer_oneshot_device_id     TEXT,
    timer_oneshot_command       INTEGER,
    FOREIGN KEY (timer_oneshot_device_id) REFERENCES device(device_id),
    FOREIGN KEY (timer_oneshot_command)   REFERENCES device_command(device_command_id)
);

CREATE TABLE sensor_reading	(
	sensor_reading_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_reading_sensor_id    TEXT,
    sensor_reading_value        INTEGER,
    sensor_reading_timestamp    INTEGER,
    FOREIGN KEY (sensor_reading_sensor_id) REFERENCES sensor(sensor_id)
);

CREATE TABLE device_reading	(
	device_reading_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    device_reading_device_id    TEXT,
    device_reading_type         TEXT,
    device_reading_value        INTEGER,
    device_reading_timestamp    INTEGER,
    FOREIGN KEY (device_reading_device_id) REFERENCES device(device_id)
);

CREATE TABLE device_trigger (
    device_trigger_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    device_trigger_device_id    TEXT,
    device_trigger_sensor_id    TEXT,
    device_trigger_gt_lt        TEXT,
    device_trigger_sensor_value INTEGER,
    device_trigger_command      INT,
    FOREIGN KEY (device_trigger_device_id) REFERENCES device(device_id),
    FOREIGN KEY (device_trigger_sensor_id) REFERENCES sensor(sensor_id),
    FOREIGN KEY (device_trigger_command)   REFERENCES device_command(device_command_id)
);