var fs = require("fs"),
  sqlite3 = require("sqlite3").verbose(),
  schemaFile = `${__dirname}/db/hub-schema.sql`,
  demoFile = `${__dirname}/db/demo-data.sql`,
  schema = fs.readFileSync(schemaFile, "utf8");
demo = fs.readFileSync(demoFile, "utf8");

var db = new sqlite3.Database(`${__dirname}/db/data.db`);

// Make a temporary database in memory, NOT PERSISTENTLY TO DISK
// var db = new sqlite3.Database(":memory:");

function getWholeDate() {
  var d = new Date();
  var dateString = `${d.getFullYear()}-${d.getMonth() +
    1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return dateString.padEnd(19, " ");
}

db.serialize(function() {
  db.exec(schema, function(err) {
    if (err) {
      console.log(`[${getWholeDate()}] ! Error creating database!`);
      console.log(`[${getWholeDate()}] ! ${err}`);
      console.log(`[${getWholeDate()}] ! Likely already created!`);
    } else {
      console.log(`[${getWholeDate()}] > Created database`);
      db.exec(demo, function(err) {
        if (err) {
          console.log(`[${getWholeDate()}] ! Error created demo data!`);
          console.log(`[${getWholeDate()}] ! ${err}`);
        } else {
          console.log(`[${getWholeDate()}] > Added demo data`);
        }
      });
    }
  });
});

db.on("error", function(error) {
  console.log(`[${getWholeDate()}] ! ${error}`);
});

class databasehandler {
  constructor() {
    console.log(`[${getWholeDate()}] > DB connector created`);
  }

  /* #######################################
    
    Login functions.
    
    ####################################### */

  getUserByUsernameAndPassword(username, password, callback) {
    var q = `SELECT * FROM user WHERE user_username = ? AND user_password = ?`;

    db.all(q, [username, password], function(err, rows) {
      if (err) {
        callback(err);
      } else if (rows[0]) {
        callback(null, rows[0]["user_id"]); // Details are correct
      } else {
        callback("Not found");
      }
    });
  }

  insertNewAuthToken(user_id, token, expires, callback) {
    var q = `INSERT INTO auth (auth_token, auth_user_id, auth_created, auth_expires) VALUES (?, ?, ?, ?)`;

    var created = new Date().valueOf();

    db.run(q, [token, user_id, created, expires], function(err) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error inserting data record into ${table}:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `[${getWholeDate()}] > Inserted new auth token: ${JSON.stringify(
            this.lastID
          )}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  checkToken(user_id, token, callback) {
    var q = `SELECT * FROM auth WHERE auth_user_id = ? AND auth_token = ?`;

    db.all(q, [user_id, token], function(err, rows) {
      if (err) {
        callback(err);
      } else if (rows[0]) {
        callback(null, "auth_expires");
      } else {
        callback("Not found");
      }
    });
  }

  /* #######################################
          
  Get by ID.
  
  ####################################### */

  getById(table, id, callback) {
    var q = `SELECT * FROM ${table} WHERE ${table}_id = ?`;

    db.all(q, [id], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getAccountTypeById(id, callback) {
    this.getById("account_type", id, callback);
  }
  getSensorTypeById(id, callback) {
    this.getById("sensor_type", id, callback);
  }
  getRoomById(id, callback) {
    this.getById("room", id, callback);
  }
  getDeviceTypeById(id, callback) {
    this.getById("device_type", id, callback);
  }
  getCommandById(id, callback) {
    this.getById("device_command", id, callback);
  }

  getSensorById(id, callback) {
    this.getById("sensor", id, callback);
  }
  getDeviceById(id, callback) {
    this.getById("device", id, callback);
  }

  getRepeatTimerById(id, callback) {
    this.getById("timer_repeat", id, callback);
  }

  getRepeatTimerByDeviceId(id, callback) {
    var q = `SELECT * FROM timer_repeat WHERE timer_repeat_device_id = ?`;

    db.all(q, [id], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getOneshotTimersByDeviceId(id, callback) {
    var q = `SELECT * FROM timer_oneshot WHERE timer_oneshot_device_id = ?`;

    db.all(q, [id], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  /* #######################################
          
  Get by room.
  
  ####################################### */

  getByRoom(table, roomId, callback) {
    var q = `SELECT * FROM ${table} WHERE ${table}_room = ?`;

    db.all(q, [roomId], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getSensorByRoom(roomId, callback) {
    this.getByRoom("sensor", roomId, callback);
  }
  getDeviceByRoom(roomId, callback) {
    this.getByRoom("device", roomId, callback);
  }

    /* #######################################
          
  Get by device type.
  
  ####################################### */

  getDeviceByType(device_type_id, callback) {
    var q = `SELECT * FROM device WHERE device_type = ?`;

    db.all(q, [device_type_id], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  /* #######################################
          
  Get all of something with limits.
  
  ####################################### */

  getMany(table, callback, limit, offset) {
    if (limit && offset) {
      var q = `SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset}`;
    } else if (limit) {
      var q = `SELECT * FROM ${table} LIMIT ${limit}`;
    } else {
      var q = `SELECT * FROM ${table}`;
    }

    db.all(q, function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getAccountTypes(callback, limit, offset) {
    this.getMany("account_type", callback, limit, offset);
  }
  getSensorTypes(callback, limit, offset) {
    this.getMany("sensor_type", callback, limit, offset);
  }
  getRooms(callback, limit, offset) {
    this.getMany("room", callback, limit, offset);
  }
  getDeviceTypes(callback, limit, offset) {
    this.getMany("device_type", callback, limit, offset);
  }

  getSensors(callback, limit, offset) {
    this.getMany("sensor", callback, limit, offset);
  }
  getDevices(callback, limit, offset) {
    this.getMany("device", callback, limit, offset);
  }
  getUsers(callback, limit, offset) {
    this.getMany("user", callback, limit, offset);
  }

  getSensorReadings(callback, limit, offset, id) {
    if (limit && offset && id) {
      var q = `SELECT * FROM sensor_reading WHERE sensor_reading_id = '${id}' LIMIT ${limit} OFFSET ${offset}`;
    } else if (limit && id) {
      var q = `SELECT * FROM sensor_reading WHERE sensor_reading_id = '${id}' LIMIT ${limit}`;
    } else if (limit && offset) {
      var q = `SELECT * FROM sensor_reading LIMIT ${limit} OFFSET ${offset}`;
    } else if (limit) {
      var q = `SELECT * FROM sensor_reading LIMIT ${limit}`;
    } else {
      var q = `SELECT * FROM sensor_reading`;
    }

    db.all(q, function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getDeviceReadings(callback, limit, offset, id) {
    if (limit && offset && id) {
      var q = `SELECT * FROM device_reading WHERE device_reading_id = ${id} LIMIT ${limit} OFFSET ${offset}`;
    } else if (limit && id) {
      var q = `SELECT * FROM device_reading WHERE device_reading_id = ${id} LIMIT ${limit}`;
    } else if (limit && offset) {
      var q = `SELECT * FROM device_reading LIMIT ${limit} OFFSET ${offset}`;
    } else if (limit) {
      var q = `SELECT * FROM device_reading LIMIT ${limit}`;
    } else {
      var q = `SELECT * FROM device_reading`;
    }

    db.all(q, function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getLastDeviceReadingByType(id, type, callback)  {
    var q = "SELECT * FROM device_reading WHERE device_reading_id = ? AND device_reading_type = ? LIMIT 1";

    db.all(q, [id, type],function(err, rows) {
      if (err) {
        callback(err);
      } else if(rows[0])  {
        callback(null, rows);
      } else  {
        callback("No data");
      }
    })
  }

  getDeviceStatusTime(id, callback) {
    var q = `SELECT * FROM device_reading WHERE device_reading_device_id = ? AND device_reading_type = "status" AND ( device_reading_value = "on" OR device_reading_value = "off" ) LIMIT 1 `;

    db.all(q, [id], function(err, rows) {
      if (err) {
        callback(err);
      } else if(rows[0]) {
        callback(null, rows[0]["device_reading_value"], rows[0]["device_reading_timestamp"]);
      } else  {
        callback("No data");
      }
    });
  }

  checkWarningExists(device_id, message, callback) {
    var q = `SELECT * FROM warning WHERE warning_device_id = ? AND warning_message = ? LIMIT 1`;

    db.all(q, [device_id, message], function(err, rows) {
      if (err) {
        callback(err);
      } else if(rows[0]) {
        callback(null, rows[0]);
      } else  {
        callback("No data");
      }
    });
  }

  getRepeatTimers(callback) {
    var q = `SELECT * FROM timer_repeat
             INNER JOIN device         ON timer_repeat.timer_repeat_device_id = device.device_id
             INNER JOIN device_type    ON device.device_type                  = device_type.device_type_id
             INNER JOIN device_command ON timer_repeat.timer_repeat_command   = device_command.device_command_id
             INNER JOIN room           ON device.device_room                  = room.room_id`;

    db.all(q, function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  updateRepeatTimerLastRun(last_run, id) {
    var q = `UPDATE timer_repeat SET timer_repeat_last_run = ? WHERE timer_repeat_id = ?`;

    db.all(q, [last_run, id], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        // console.log("Repeat timer updated");
      }
    });
  }

  getOneshotTimers(callback) {
    var q = `SELECT * FROM timer_oneshot
             INNER JOIN device         ON timer_oneshot.timer_oneshot_device_id = device.device_id
             INNER JOIN device_type    ON device.device_type                    = device_type.device_type_id
             INNER JOIN device_command ON timer_oneshot.timer_oneshot_command   = device_command.device_command_id
             INNER JOIN room           ON device.device_room                    = room.room_id`;

    // var q = `SELECT * FROM timer_oneshot
    //          INNER JOIN device         ON timer_oneshot.timer_oneshot_device_id = device.device_id
    //          INNER JOIN device_type    ON device.device_type                    = device_type.device_type_id`;

    db.all(q, function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getDeviceTriggers(callback) {
    var q = `SELECT * FROM device_trigger
             INNER JOIN device         ON device_trigger.device_trigger_device_id = device.device_id
             INNER JOIN sensor         ON device_trigger.device_trigger_sensor_id = sensor.sensor_id
             INNER JOIN device_type    ON device.device_type                      = device_type.device_type_id
             INNER JOIN device_command ON device_trigger.device_trigger_command   = device_command.device_command_id
             INNER JOIN room           ON device.device_room                      = room.room_id`;

    // var q = `SELECT * FROM timer_oneshot
    //          INNER JOIN device         ON timer_oneshot.timer_oneshot_device_id = device.device_id
    //          INNER JOIN device_type    ON device.device_type                    = device_type.device_type_id`;

    db.all(q, function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  /* #######################################
          
  Get sensor data by filters.
  
  ####################################### */

  getSensorReadingsByTimeframe(id, start, end, callback) {
    if (!end) {
      end = new Date().valueOf();
    }
    var q = `SELECT * FROM sensor_reading WHERE sensor_reading_sensor_id = ?
            AND sensor_reading_timestamp > ?
            AND sensor_reading_timestamp < ? `;

    db.all(q, [id, start, end], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  getDeviceReadingsByTimeframe(id, start, end, callback) {
    if (!end) {
      end = new Date().valueOf();
    }
    var q = `SELECT * FROM device_reading WHERE device_reading_sensor_id = ?
            AND device_reading_timestamp > ?
            AND device_reading_timestamp < ? `;

    db.all(q, [id, start, end], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  /* #######################################
          
  Device command functions.
  
  ####################################### */

  getCommandsByDevice(device_type_id, callback) {
    var q = `SELECT * FROM device_command
            INNER JOIN device_type ON device_type.device_type_id = device_command.device_command_device_type
            WHERE device_type.device_type_id = ?`;

    db.all(q, [device_type_id], function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  /* #######################################
          
  Inserting auxiliary data.
  
  ####################################### */

  insertOne(table, val, callback) {
    var q = `INSERT INTO ${table} (${table}_name) VALUES (?)`;

    db.run(q, [val], function(err) {
      if (err) {
        console.log(`! Error inserting data record into ${table}:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `> Inserted data record into ${table}: ${JSON.stringify(this.lastID)}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  insertProperty(val, callback) {
    this.insertOne("property", val, callback);
  }
  insertAccountType(val, callback) {
    this.insertOne("account_type", val, callback);
  }
  insertSensorType(val, callback) {
    this.insertOne("sensor_type", val, callback);
  }
  insertRoom(val, callback) {
    this.insertOne("room", val, callback);
  }
  insertDeviceType(val, callback) {
    this.insertOne("device_type", val, callback);
  }

  /* #######################################
            
  Inserting larger records.
  
  ####################################### */

  insertUser(
    account_type,
    username,
    password,
    email,
    forename,
    surname,
    callback
  ) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO user (user_account_type, user_username, user_email, user_forename, user_surname, user_password, user_created) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.run(
      q,
      [account_type, username, email, forename, surname, password, ts],
      function(err) {
        if (err) {
          console.log(
            `[${getWholeDate()}] ! Error inserting data record into user:`
          );
          console.log(`[${getWholeDate()}] ! ${err}`);
          callback(err, null);
        } else {
          console.log(
            `[${getWholeDate()}] > Inserted data record into user: ${JSON.stringify(
              this.lastID
            )}`
          );
          callback(null, JSON.stringify(this.lastID));
        }
      }
    );
  }

  generateId() {
    var id = "",
      idPiece = "",
      length = 3,
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      charactersLength = characters.length;

    for (var x = 0; x < length; x++) {
      idPiece = "";
      for (var i = 0; i < length; i++) {
        idPiece += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      if (x != 3) {
        id = id += idPiece;
      }
    }

    this.getDeviceById(id, function(err, rows) {
      if (err) {
        callback(err);
      } else if (rows[0]) {
        // There was a device with that id
        id = generateId();
      }
    });

    this.getSensorById(id, function(err, rows) {
      if (err) {
        callback(err);
      } else if (rows[0]) {
        // There was a sensor with that id
        id = generateId();
      }
    });

    return id;
  }

  insertSensor(room, type, name, callback) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES (?, ?, ?, ?, ?)`;

    var newId = this.generateId();

    db.run(q, [newId, room, type, name, ts], function(err) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error inserting data record into sensor:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `[${getWholeDate()}] > Inserted data record into sensor: ${JSON.stringify(
            this.lastID
          )}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  editSensor(id, room, type, name, callback) {
    var q = `UPDATE sensor SET sensor_room = ?, sensor_type = ?, sensor_name = ? WHERE sensor_id = ?`;

    var newId = this.generateId();

    db.run(q, [room, type, name, id], function(err) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error updating data record for sensor:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `[${getWholeDate()}] > Updated data record for sensor: ${JSON.stringify(
            this.lastID
          )}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  insertDevice(room, type, wattage, name, callback) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES (?, ?, ?, ?, ?, ?)`;

    var newId = this.generateId();

    db.run(q, [newId, room, type, wattage, name, ts], function(err) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error inserting data record into device:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `[${getWholeDate()}] > Inserted data record into device: ${JSON.stringify(
            this.lastID
          )}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  editDevice(id, room, type, wattage, name, callback) {
    var q = `UPDATE device SET device_room = ?, device_type = ?, device_wattage = ?, device_name = ? WHERE device_id = ?`;

    db.run(q, [room, type, wattage, name, id], function(err) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error updating data record for device:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `[${getWholeDate()}] > Updated data record for device: ${JSON.stringify(
            this.lastID
          )}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  /* #######################################
                                    
  Inserting readings.

  ####################################### */

  insertSensorReading(id, val) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO sensor_reading (sensor_reading_sensor_id, sensor_reading_value, sensor_reading_timestamp) VALUES (?, ?, ?)`;

    db.run(q, [id, val, ts], function(err) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error inserting data record for sensor ${id}:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
      }
      console.log(
        `[${getWholeDate()}] > Inserted data record for sensor ${id}: ${JSON.stringify(
          this.lastID
        )}`
      );
    });
  }

  insertDeviceReading(id, type, val) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO device_reading (device_reading_device_id, device_reading_type, device_reading_value, device_reading_timestamp) VALUES (?, ?, ?, ?)`;

    db.run(q, [id, type, val, ts], function(err) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error inserting data record for device ${id}:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
      }
      console.log(
        `[${getWholeDate()}] > Inserted data record for device ${id}: ${JSON.stringify(
          this.lastID
        )}`
      );
    });
  }

  insertRepeatTimer(
    type,
    month,
    day,
    hour,
    minute,
    device_id,
    command,
    callback
  ) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO timer_repeat (
              timer_repeat_type,
              timer_repeat_month,
              timer_repeat_day,
              timer_repeat_hour,
              timer_repeat_minute,
              timer_repeat_device_id,
              timer_repeat_command,
              timer_repeat_last_run) 
             VALUES (?, ?, ?, ?, ?, ?, ?, 0)`;

    db.run(q, [type, month, day, hour, minute, device_id, command], function(
      err
    ) {
      if (err) {
        console.log(`[${getWholeDate()}] ! Error inserting repeat timer:`);
        console.log(`[${getWholeDate()}] ! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `[${getWholeDate()}] > Inserted repeat timer: ${JSON.stringify(
            this.lastID
          )}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  insertOneshotTimer(trigger, device_id, command, callback) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO timer_oneshot (
              timer_oneshot_trigger,
              timer_oneshot_device_id,
              timer_oneshot_command)
             VALUES (?, ?, ?)`;

    db.run(q, [trigger, device_id, command], function(err) {
      if (err) {
        console.log(`[${getWholeDate()}] ! Error inserting oneshot timer:`);
        console.log(`[${getWholeDate()}] ! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `[${getWholeDate()}] > Inserted oneshot timer: ${JSON.stringify(
            this.lastID
          )}`
        );
        callback(null, JSON.stringify(this.lastID));
      }
    });
  }

  insertWarning(
    device_id,
    sensor_id,
    message,
    severity,
  ) {
    var ts = new Date().valueOf();
    var q = `INSERT INTO warning (
              warning_timestamp,
              warning_last_updated_ts,
              warning_device_id,
              warning_sensor_id,
              warning_message,
              warning_severity)
             VALUES (?, ?, ?, ?, ?, ?)`;

    if(!(sensor_id)) sensor_id = null;
    if(!(device_id)) device_id = null;

    db.run(q, [ts, ts, device_id, sensor_id, message, severity], function(
      err
    ) {
      if (err) {
        console.log(
          `[${getWholeDate()}] ! Error inserting warning:`
        );
        console.log(`[${getWholeDate()}] ! ${err}`);
      } else {
        console.log(
          `[${getWholeDate()}] > Inserted warning: ${JSON.stringify(
            this.lastID
          )}`
        );
      }
    });
  }

  updateWarning(warning_id, read) {
    var ts = new Date().valueOf();
    var q;
    if(read == 0)  {
      q = "UPDATE warning SET warning_read = 0, warning_last_updated_ts = ? WHERE warning_id = ?";
    } else if(read == 1)  {
      q = "UPDATE warning SET warning_read = 1, warning_last_updated_ts = ? WHERE warning_id = ?";
    } else  {
      q = "UPDATE warning SET warning_last_updated_ts = ? WHERE warning_id = ?";
    }

    db.all(q, [ts, warning_id], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        // console.log("Warning updated");
      }
    });
  }

  /* #######################################
                                    
  Deleting things.

  ####################################### */

  deleteById(table, id, callback) {
    var q = `DELETE FROM ${table} WHERE ${table}_id = ?`;

    db.run(q, [id], function(err) {
      if (err) {
        console.log(`! Error deleting data record from ${table}:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(`> Deleted data record with id ${id} from ${table}}`);
        callback(null, 1);
      }
    });
  }

  deleteProperty(id, callback) {
    this.deleteById("property", id, callback);
  }
  deleteAccountType(id, callback) {
    this.deleteById("account_type", id, callback);
  }
  deleteSensorType(id, callback) {
    this.deleteById("sensor_type", id, callback);
  }
  deleteRoom(id, callback) {
    this.deleteById("room", id, callback);
  }
  deleteDeviceType(id, callback) {
    this.deleteById("device_type", id, callback);
  }
  deleteDeviceCommand(id, callback) {
    this.deleteById("device_command", id, callback);
  }
  deleteUser(id, callback) {
    this.deleteById("user", id, callback);
  }
  deleteAuth(id, callback) {
    this.deleteById("auth", id, callback);
  }
  deleteSensor(id, callback) {
    this.deleteById("sensor", id, callback);
  }
  deleteDevice(id, callback) {
    this.deleteById("device", id, callback);
  }
  deleteRepeatTimer(id, callback) {
    this.deleteById("timer_repeat", id, callback);
  }
  deleteOneshotTimer(id, callback) {
    this.deleteById("timer_oneshot", id, callback);
  }
  deleteSensorReading(id, callback) {
    this.deleteById("sensor_reading", id, callback);
  }
  deleteDeviceReading(id, callback) {
    this.deleteById("device_reading", id, callback);
  }
  deleteDeviceTrigger(id, callback) {
    this.deleteById("device_trigger", id, callback);
  }
  deleteWarning(id, callback) {
    this.deleteById("warning", id, callback);
  }

  deleteDeviceReadingByDeviceId(id, callback) {
    var q = `DELETE FROM device_reading WHERE device_reading_device_id = ?`;

    db.run(q, [id], function(err) {
      if (err) {
        console.log(`! Error deleting data records from device_reading:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `> Deleted data records with device id ${id} from device_reading}`
        );
        callback(null, 1);
      }
    });
  }

  deleteSensorReadingBySensorId(id, callback) {
    var q = `DELETE FROM sensor_reading WHERE sensor_reading_sensor_id = ?`;

    db.run(q, [id], function(err) {
      if (err) {
        console.log(`! Error deleting data records from sensor_reading:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `> Deleted data records with sensor id ${id} from sensor_reading}`
        );
        callback(null, 1);
      }
    });
  }

  deleteRepeatTimerByDeviceId(id, callback) {
    var q = `DELETE FROM timer_repeat WHERE timer_repeat_device_id = ?`;

    db.run(q, [id], function(err) {
      if (err) {
        console.log(`! Error deleting data records from timer_repeat:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `> Deleted data records with device id ${id} from timer_repeat}`
        );
        callback(null, 1);
      }
    });
  }

  deleteOneshotTimerByDeviceId(id, callback) {
    var q = `DELETE FROM timer_oneshot WHERE timer_oneshot_device_id = ?`;

    db.run(q, [id], function(err) {
      if (err) {
        console.log(`! Error deleting data records from timer_oneshot:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `> Deleted data records with device id ${id} from timer_oneshot}`
        );
        callback(null, 1);
      }
    });
  }

  deleteTriggerByDeviceId(id, callback) {
    var q = `DELETE FROM device_trigger WHERE device_trigger_device_id = ?`;

    db.run(q, [id], function(err) {
      if (err) {
        console.log(`! Error deleting data records from device_trigger:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `> Deleted data records with device id ${id} from device_trigger}`
        );
        callback(null, 1);
      }
    });
  }

  deleteTriggerBySensorId(id, callback) {
    var q = `DELETE FROM device_trigger WHERE device_trigger_sensor_id = ?`;

    db.run(q, [id], function(err) {
      if (err) {
        console.log(`! Error deleting data records from device_trigger:`);
        console.log(`! ${err}`);
        callback(err, null);
      } else {
        console.log(
          `> Deleted data records with sensor id ${id} from device_trigger}`
        );
        callback(null, 1);
      }
    });
  }
}

module.exports = databasehandler;
