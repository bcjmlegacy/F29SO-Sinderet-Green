/*
    demo-data.sql
    Benjamin Milne
*/

INSERT INTO property        (property_name)     VALUES ('Demo Home');

INSERT INTO account_type    (account_type_name) VALUES ('Admin');

INSERT INTO sensor_type     (sensor_type_name)  VALUES ('Temperature');
INSERT INTO sensor_type     (sensor_type_name)  VALUES ('Humidity');

INSERT INTO room            (room_name)         VALUES ('Livingroom');
INSERT INTO room            (room_name)         VALUES ('Kitchen');
INSERT INTO room            (room_name)         VALUES ('Bedroom');
INSERT INTO room            (room_name)         VALUES ('Outside');

INSERT INTO device_type     (device_type_name)  VALUES ('Heater');
INSERT INTO device_type     (device_type_name)  VALUES ('Fridge');
INSERT INTO device_type     (device_type_name)  VALUES ('Solar Controller');
INSERT INTO device_type     (device_type_name)  VALUES ('Light');
INSERT INTO device_type     (device_type_name)  VALUES ('Door lock');
INSERT INTO device_type     (device_type_name)  VALUES ('Solar Battery');

INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value, device_command_mqtt_res, device_command_value_res) VALUES (1, 'Turn on',  'set_power', 'on',  'status', 'on');
INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value, device_command_mqtt_res, device_command_value_res) VALUES (1, 'Turn off', 'set_power', 'off', 'status', 'off');
INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value, device_command_mqtt_res, device_command_value_res) VALUES (4, 'Turn on',  'set_power', 'on',  'status', 'on');
INSERT INTO device_command  (device_command_device_type, device_command_name, device_command_mqtt, device_command_value, device_command_mqtt_res, device_command_value_res) VALUES (4, 'Turn off', 'set_power', 'off', 'status', 'off');

INSERT INTO user (user_account_type, user_username, user_password, user_created, user_last_active, user_admin) 
VALUES (1, 
    'Test_user', 
    'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86', 
    1579521113, 
    1579521113,
    1
);

INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ('ABC123', 1, 1, 'Livingroom temp sensor 1',     1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ('ABC456', 1, 1, 'Livingroom temp sensor 2',     1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ('ABC789', 2, 1, 'Kitchen temp sensor',          1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ('DEF123', 3, 1, 'Bedroom temp sensor',          1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ('DEF456', 1, 2, 'Livingroom humidity sensor',   1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ('DEF789', 2, 2, 'Kitchen humidity sensor',      1579521113);
INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES ('HIG123', 3, 2, 'Bedroom humidity sensor',      1579521113);

INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ('123ABC123', 1, 1, 300, 'Livingroom heater',    1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ('456ABC123', 1, 4, 40,  'Livingroom light',     1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ('789ABC123', 2, 2, 400, 'Kitchen fridge',       1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ('123456ABC', 4, 3, 5,   'Solar controller',     1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ('738JWD836', 4, 6, 0,   'Solar battery 1',      1579521113);
INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES ('629IDK856', 4, 6, 0,   'Solar battery 2',      1579521113);

INSERT INTO timer_repeat (
    timer_repeat_type,
    timer_repeat_month,
    timer_repeat_day,
    timer_repeat_hour,
    timer_repeat_minute,
    timer_repeat_device_id,
    timer_repeat_command,
    timer_repeat_last_run
)   
VALUES  ('Day', 1, 1, 7, 1, '123ABC123', 1, 0);

INSERT INTO timer_repeat (
    timer_repeat_type,
    timer_repeat_month,
    timer_repeat_day,
    timer_repeat_hour,
    timer_repeat_minute,
    timer_repeat_device_id,
    timer_repeat_command,
    timer_repeat_last_run
)   
VALUES  ('Hour', 1, 1, 8, 1, '123ABC123', 2, 0);

INSERT INTO timer_repeat (
    timer_repeat_type,
    timer_repeat_month,
    timer_repeat_day,
    timer_repeat_hour,
    timer_repeat_minute,
    timer_repeat_device_id,
    timer_repeat_command,
    timer_repeat_last_run
)   
VALUES  ('Minute', 1, 1, 7, 1, '456ABC123', 3, 0);

INSERT INTO timer_oneshot (
    timer_oneshot_trigger,
    timer_oneshot_device_id,
    timer_oneshot_command
)
VALUES  (1, '456ABC123', 3);

-- Turn the heater on if the livingroom temp is below 20

INSERT INTO device_trigger (
    device_trigger_device_id,
    device_trigger_sensor_id,
    device_trigger_gt_lt_eq,
    device_trigger_sensor_value,
    device_trigger_command
)
VALUES  ('123ABC123', 'ABC123', '<', 20, 1);

INSERT INTO warning (
    warning_timestamp,
    warning_last_updated_ts,
    warning_device_id,
    warning_sensor_id,
    warning_message,
    warning_severity,
    warning_read
)
VALUES (1579521113, 1579521113, '123ABC123', NULL, 'This heater has been on for over 2 hours!', 3, 0);

INSERT INTO device_reading (
    device_reading_device_id,
    device_reading_type,
    device_reading_value,
    device_reading_timestamp
)
VALUES  ('123ABC123', 'status', 'on', 1579521113);

INSERT INTO device_reading (
    device_reading_device_id,
    device_reading_type,
    device_reading_value,
    device_reading_timestamp
)
VALUES  ('789ABC123', 'Temperature', '10', 1579521113);

INSERT INTO user_permission (
    user_permission_user_id,
    user_permission_device_id
)   
VALUES (1, '789ABC123');