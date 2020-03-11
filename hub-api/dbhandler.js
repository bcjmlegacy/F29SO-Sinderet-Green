var fs         = require("fs"),
    bs3        = require("better-sqlite3"),
    schemaFile = `${__dirname}/db/hub-schema.sql`,
    demoFile   = `${__dirname}/db/demo-data.sql`,
    cityFile   = `${__dirname}/db/cities.sql`,
    dbFile     = `${__dirname}/db/data.db`,
    dbJFile    = `${__dirname}/db/data.db-journal`,
    schema     = fs.readFileSync(schemaFile, "utf8"),
    demo       = fs.readFileSync(demoFile, "utf8"),
    cities     = fs.readFileSync(cityFile, 'utf-8').split('\n');

const rebuild   = false,
      demoMode  = false;



if(rebuild) {

  console.log(`[${getWholeDate()}] > Rebuilding database...`);

  if(fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile)
  }

  if(fs.existsSync(dbJFile)) {
    fs.unlinkSync(dbJFile)
  }

  const db = new bs3(dbFile);
  console.log(`[${getWholeDate()}] > Building schema...`);
  db.exec(schema);
  
  console.log(`[${getWholeDate()}] > Adding city data...`);

  var cityCount = 0;
  for(x in cities)  {
    cityCount++;
    db.exec(cities[x]);
    process.stdout.write(`[${getWholeDate()}] > Importing cities: ${cityCount}/15494\r`);
  }
  console.log("");

  if(demoMode)  {
    console.log(`[${getWholeDate()}] > Adding demo data...`);
    db.exec(demo);
  }

} else  {
  const db = new bs3(dbFile);
}

function getWholeDate() {
	var d = new Date();
	var dateString = `${d.getFullYear()}-${d.getMonth() +
		1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
	return dateString.padEnd(19, " ");
}

class databasehandler {
	constructor() {
		console.log(`[${getWholeDate()}] > DB connector created`);
	}

	/* #######################################
    
    Login functions.
    
    ####################################### */

	getUserByUsernameAndPassword(username, password) {
		var q = db.prepare(
			`SELECT user_id FROM user WHERE user_username = ? AND user_password = ?`
		);

		return q.get(username, password);
	}

	insertNewAuthToken(user_id, token, expires) {
		var q = db.prepare(
			`INSERT INTO auth (auth_token, auth_user_id, auth_created, auth_expires) VALUES (?, ?, ?, ?)`
		);
		var created = new Date().valueOf();
		return q.run(token, user_id, created, expires);
	}

	checkToken(user_id, token) {
		var q = db.prepare(
			`SELECT * FROM auth WHERE auth_user_id = ? AND auth_token = ?`
		);
		return q.get(user_id, token);
	}

	/* #######################################
          
  Get by ID.
  
  ####################################### */

	getById(table, id) {
		var q = db.prepare(`SELECT * FROM ${table} WHERE ${table}_id = ?`);
		return q.all(id);
	}

	getAccountTypeById(id) {
		return this.getById("account_type", id);
	}
	getSensorTypeById(id) {
		return this.getById("sensor_type", id);
	}
	getRoomById(id) {
		return this.getById("room", id);
	}
	getDeviceTypeById(id) {
		return this.getById("device_type", id);
	}
	getCommandById(id) {
		return this.getById("device_command", id);
	}

	getSensorById(id) {
		return this.getById("sensor", id);
	}
	getDeviceById(id) {
		return this.getById("device", id);
	}

	getRepeatTimerById(id) {
		return this.getById("timer_repeat", id);
	}

	getUserById(id) {
		return this.getById("user", id);
  }
  
  getTriggerById(id)  {
    return this.getById("device_trigger", id);
  }

	getRepeatTimerByDeviceId(id) {
		var q = db.prepare(
			`SELECT * FROM timer_repeat WHERE timer_repeat_device_id = ?`
		);

		return q.all(id);
	}

	getOneshotTimersByDeviceId(id) {
		var q = db.prepare(
			`SELECT * FROM timer_oneshot WHERE timer_oneshot_device_id = ?`
		);

		return q.all(id);
	}

	getUserPermissionByDeviceId(id) {
		var q = db.prepare(
			`SELECT * FROM user_permission WHERE user_permission_device_id = ?`
		);

		return q.all(id);
	}

	getUserPermissionBySensorId(id) {
		var q = db.prepare(
			`SELECT * FROM user_permission WHERE user_permission_sensor_id = ?`
		);

		return q.all(id);
	}

	checkAuth(user_id, device_id, sensor_id) {
		console.log("> Checking auth...");
		if (!sensor_id) sensor_id = "NA";
		if (!device_id) device_id = "NA";

		var user = this.getUserById(user_id);
		if (user[0]["user_admin"] == 1) {
			console.log("> Admin override");
			return true;
		} else {
			// Check permissions table
			var q = db.prepare(
				`SELECT * FROM user_permission WHERE user_permission_user_id = ? AND (user_permission_device_id = ? OR user_permission_sensor_id = ?)`
			);

			var row = q.all(user_id, device_id, sensor_id);
			if (row.length > 0) return true;
			return false;
		}
	}

	/* #######################################
          
  Get by room.
  
  ####################################### */

	getByRoom(table, roomId, callback) {
		var q = db.prepare(`SELECT * FROM ${table} WHERE ${table}_room = ?`);

		return q.all(roomId);
	}

	getSensorByRoom(roomId) {
		return this.getByRoom("sensor", roomId);
	}
	getDeviceByRoom(roomId) {
		return this.getByRoom("device", roomId);
	}

	/* #######################################
          
  Get by device type.
  
  ####################################### */

	getDeviceByType(device_type_id) {
		var q = db.prepare(`SELECT * FROM device WHERE device_type = ?`);

		return q.all(device_type_id);
	}

	/* #######################################
          
  Get all of something with limits.
  
  ####################################### */

	getMany(table, limit, offset) {
		if (limit && offset) {
			var q = db.prepare(`SELECT * FROM ${table} LIMIT ? OFFSET ?`);
			return q.all(limit, offset);
		} else if (limit) {
			var q = db.prepare(`SELECT * FROM ${table} LIMIT ?`);
			return q.all(limit);
		} else {
			var q = db.prepare(`SELECT * FROM ${table}`);
			return q.all();
		}
	}

	getAccountTypes(limit, offset) {
		return this.getMany("account_type", limit, offset);
	}
	getSensorTypes(limit, offset) {
		return this.getMany("sensor_type", limit, offset);
	}
	getRooms(limit, offset) {
		return this.getMany("room", limit, offset);
	}
	getDeviceTypes(limit, offset) {
		return this.getMany("device_type", limit, offset);
	}
	getSensors(limit, offset) {
		return this.getMany("sensor", limit, offset);
	}
	getDevices(limit, offset) {
		return this.getMany("device", limit, offset);
	}
	getUsers(limit, offset) {
		return this.getMany("user", limit, offset);
  }
  getTriggers(limit, offset) {
		return this.getMany("device_trigger", limit, offset);
	}

	getSensorReadings(limit, offset, id) {
		if (limit && offset && id) {
			var q = db.prepare(
				`SELECT * FROM sensor_reading WHERE sensor_reading_id = ? LIMIT ? OFFSET ?`
			);
			return q.all(id, limit, offset);
		} else if (limit && id) {
			var q = db.prepare(
				`SELECT * FROM sensor_reading WHERE sensor_reading_id = ? LIMIT ?`
			);
			return q.all(id, limit);
		} else if (limit && offset) {
			var q = db.prepare(`SELECT * FROM sensor_reading LIMIT ? OFFSET ?`);
			return q.all(limit, offset);
		} else if (limit) {
			var q = db.prepare(`SELECT * FROM sensor_reading LIMIT ?`);
			return q.all(limit);
		} else {
			var q = db.prepare(`SELECT * FROM sensor_reading`);
			return q.all();
		}
	}

	getDeviceReadings(limit, offset, id) {
		if (limit && offset && id) {
			var q = db.prepare(
				`SELECT * FROM device_reading WHERE device_reading_id = ? LIMIT ? OFFSET ?`
			);
			return q.all(id, limit, offset);
		} else if (limit && id) {
			var q = db.prepare(
				`SELECT * FROM device_reading WHERE device_reading_id = ? LIMIT ?`
			);
			return q.all(id, limit);
		} else if (limit && offset) {
			var q = db.prepare(`SELECT * FROM device_reading LIMIT ? OFFSET ?`);
			return q.all(limit, offset);
		} else if (limit) {
			var q = db.prepare(`SELECT * FROM device_reading LIMIT ?`);
			return q.all(limit);
		} else {
			var q = db.prepare(`SELECT * FROM device_reading`);
			return q.all();
		}
	}

	getLastDeviceReadingByType(id, type) {
		var q = db.prepare(
			"SELECT * FROM device_reading WHERE device_reading_device_id = ? AND device_reading_type = ? LIMIT 1"
		);
		return q.get(id, type);
	}

	getDeviceStatusTime(id) {
		var q = db.prepare(
			`SELECT * FROM device_reading WHERE device_reading_device_id = ? AND device_reading_type = 'status' AND ( device_reading_value = 'on' OR device_reading_value = 'off' ) LIMIT 1 `
		);
		var row = q.get(id);

		if (row !== undefined) {
			return [row["device_reading_value"], row["device_reading_timestamp"]];
		} else {
			return row;
		}
	}

	checkWarningExists(device_id, message) {
		var q = db.prepare(
			`SELECT * FROM warning WHERE warning_device_id = ? AND warning_message = ? LIMIT 1`
		);
		return q.get(device_id, message);
	}

	getRepeatTimers() {
		var q = db.prepare(`SELECT * FROM timer_repeat
             INNER JOIN device         ON timer_repeat.timer_repeat_device_id = device.device_id
             INNER JOIN device_type    ON device.device_type                  = device_type.device_type_id
             INNER JOIN device_command ON timer_repeat.timer_repeat_command   = device_command.device_command_id
             INNER JOIN room           ON device.device_room                  = room.room_id`);

		return q.all();
	}

	updateRepeatTimerLastRun(last_run, id) {
		var q = `UPDATE timer_repeat SET timer_repeat_last_run = ? WHERE timer_repeat_id = ?`;

		return q.run(last_run, id);
	}

	getOneshotTimers() {
		var q = db.prepare(`SELECT * FROM timer_oneshot
             INNER JOIN device         ON timer_oneshot.timer_oneshot_device_id = device.device_id
             INNER JOIN device_type    ON device.device_type                    = device_type.device_type_id
             INNER JOIN device_command ON timer_oneshot.timer_oneshot_command   = device_command.device_command_id
             INNER JOIN room           ON device.device_room                    = room.room_id`);

		return q.all();
	}

	getDeviceTriggers() {
		var q = db.prepare(`SELECT * FROM device_trigger
             INNER JOIN device         ON device_trigger.device_trigger_device_id = device.device_id
             INNER JOIN sensor         ON device_trigger.device_trigger_sensor_id = sensor.sensor_id
             INNER JOIN device_type    ON device.device_type                      = device_type.device_type_id
             INNER JOIN device_command ON device_trigger.device_trigger_command   = device_command.device_command_id
             INNER JOIN room           ON device.device_room                      = room.room_id`);

		return q.all();
	}

	/* #######################################
          
  Get sensor data by filters.
  
  ####################################### */

	getSensorReadingsByTimeframe(id, start, end) {
		if (!end) {
			end = new Date().valueOf();
		}
		var q = db.prepare(`SELECT * FROM sensor_reading WHERE sensor_reading_sensor_id = ?
            AND sensor_reading_timestamp > ?
            AND sensor_reading_timestamp < ? `);

		return q.all(id, start, end);
	}

	getDeviceReadingsByTimeframe(id, start, end) {
		if (!end) {
			end = new Date().valueOf();
		}
		var q = db.prepare(`SELECT * FROM device_reading WHERE device_reading_sensor_id = ?
            AND device_reading_timestamp > ?
            AND device_reading_timestamp < ? `);

		return q.all(id, start, end);
	}

	/* #######################################
          
  Device command functions.
  
  ####################################### */

	getCommandsByDevice(device_type_id) {
		var q = db.prepare(`SELECT * FROM device_command
            INNER JOIN device_type ON device_type.device_type_id = device_command.device_command_device_type
            WHERE device_type.device_type_id = ?`);

		return q.all(device_type_id);
	}

	/* #######################################
          
  Inserting auxiliary data.
  
  ####################################### */

	insertOne(table, val) {
		var q = db.prepare(`INSERT INTO ${table} (${table}_name) VALUES (?)`);
		return q.run(val);
	}

	insertProperty(val) {
		return this.insertOne("property", val);
	}
	insertAccountType(val) {
		return this.insertOne("account_type", val);
	}
	insertSensorType(val) {
		return this.insertOne("sensor_type", val);
	}
	insertRoom(val) {
		return this.insertOne("room", val);
	}
	insertDeviceType(val) {
		return this.insertOne("device_type", val);
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
		user_admin
	) {
		var ts = new Date().valueOf();
		var q = `INSERT INTO user (user_account_type, user_username, user_email, user_forename, user_surname, user_password, user_created, user_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

		return q.run(
			account_type,
			username,
			email,
			forename,
			surname,
			password,
			ts,
			user_admin
		);
	}

	editUser(
    user_id,
		account_type,
		username,
		password,
		email,
		forename,
		surname,
		user_admin
	) {
		var ts = new Date().valueOf();
		var q = `UPDATE user SET user_account_type = ?, user_username = ?, user_email = ?, user_forename = ?, user_surname = ?, user_password = ?, user_created = ?, user_admin = ? WHERE user_id = ?`;

		return q.run(
			account_type,
			username,
			email,
			forename,
			surname,
			password,
			ts,
      user_admin,
      user_id
		);
	}

	generateId() {
		console.log("> Generating new device / sensor id...");
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

		var dev = this.getDeviceById(id);
		if (dev.length > 0) {
			return this.generateId();
		}

		var sen = this.getSensorById(id);
		if (sen.length > 0) {
			return this.generateId();
		}

		console.log("> Created: " + id);
		return id;
	}

	insertSensor(room, type, name) {
		var ts = new Date().valueOf();
		var q = db.prepare(
			`INSERT INTO sensor (sensor_id, sensor_room, sensor_type, sensor_name, sensor_added) VALUES (?, ?, ?, ?, ?)`
		);
		var newId = this.generateId();

		return q.run(newId, room, type, name, ts);
	}

	editSensor(id, room, type, name) {
		var q = db.prepare(
			`UPDATE sensor SET sensor_room = ?, sensor_type = ?, sensor_name = ? WHERE sensor_id = ?`
		);

		return q.run(room, type, name, id);
	}

	insertDevice(room, type, wattage, name) {
		var ts = new Date().valueOf();
		var q = db.prepare(
			`INSERT INTO device (device_id, device_room, device_type, device_wattage, device_name, device_added) VALUES (?, ?, ?, ?, ?, ?)`
		);

		var newId = this.generateId();

		return q.run(newId, room, type, wattage, name, ts);
	}

	editDevice(id, room, type, wattage, name) {
		var q = db.prepare(
			`UPDATE device SET device_room = ?, device_type = ?, device_wattage = ?, device_name = ? WHERE device_id = ?`
		);

		return q.run(room, type, wattage, name, id);
	}

	insertDeviceTrigger(device_id, sensor_id, gt_lt_eq, value, command_id) {
		var q = db.prepare(
			"INSERT INTO device_trigger (device_trigger_device_id, device_trigger_sensor_id, device_trigger_gt_lt_eq, device_trigger_sensor_value, device_trigger_command) VALUES (?, ?, ?, ?, ?)"
		);

		return q.run(device_id, sensor_id, gt_lt_eq, value, command_id);
	}

	/* #######################################
                                    
  Inserting readings.

  ####################################### */

	insertSensorReading(id, val) {
		var ts = new Date().valueOf();
		var q = db.prepare(
			`INSERT INTO sensor_reading (sensor_reading_sensor_id, sensor_reading_value, sensor_reading_timestamp) VALUES (?, ?, ?)`
		);

		return q.run(id, val, ts);
	}

	insertDeviceReading(id, type, val) {
		var ts = new Date().valueOf();
		var q = db.prepare(
			`INSERT INTO device_reading (device_reading_device_id, device_reading_type, device_reading_value, device_reading_timestamp) VALUES (?, ?, ?, ?)`
		);

		return q.run(id, type, val, ts);
	}

	insertRepeatTimer(type, month, day, hour, minute, device_id, command) {
		var q = db.prepare(`INSERT INTO timer_repeat (
              timer_repeat_type,
              timer_repeat_month,
              timer_repeat_day,
              timer_repeat_hour,
              timer_repeat_minute,
              timer_repeat_device_id,
              timer_repeat_command,
              timer_repeat_last_run) 
             VALUES (?, ?, ?, ?, ?, ?, ?, 0)`);

		return q.run(type, month, day, hour, minute, device_id, command);
	}

	insertOneshotTimer(trigger, device_id, command) {
		var ts = new Date().valueOf();
		var q = db.prepare(`INSERT INTO timer_oneshot (
              timer_oneshot_trigger,
              timer_oneshot_device_id,
              timer_oneshot_command)
             VALUES (?, ?, ?)`);

		return q.run(trigger, device_id, command);
	}

	insertWarning(device_id, sensor_id, message, severity) {
		var ts = new Date().valueOf();
		var q = db.prepare(`INSERT INTO warning (
              warning_timestamp,
              warning_last_updated_ts,
              warning_device_id,
              warning_sensor_id,
              warning_message,
              warning_severity)
             VALUES (?, ?, ?, ?, ?, ?)`);

		if (!sensor_id) sensor_id = null;
		if (!device_id) device_id = null;

		return q.run(ts, ts, device_id, sensor_id, message, severity);
	}

	updateWarning(warning_id, read) {
		var ts = new Date().valueOf();
		var q;
		if (read == 0) {
			q = db.prepare(
				"UPDATE warning SET warning_read = 0, warning_last_updated_ts = ? WHERE warning_id = ?"
			);
		} else if (read == 1) {
			q = db.prepare(
				"UPDATE warning SET warning_read = 1, warning_last_updated_ts = ? WHERE warning_id = ?"
			);
		} else {
			q = db.prepare(
				"UPDATE warning SET warning_last_updated_ts = ? WHERE warning_id = ?"
			);
		}

		return q.run(ts, warning_id);
	}

	insertUserPermission(user_id, device_id, sensor_id) {
		var q = db.prepare(`INSERT INTO user_permission (
      user_permission_user_id,
      user_permission_device_id,
      user_permission_sensor_id)
     VALUES (?, ?, ?)`);

		if (!sensor_id) sensor_id = null;
		if (!device_id) device_id = null;

		return q.run(user_id, device_id, sensor_id);
	}

	/* #######################################
                                    
  Deleting things.

  ####################################### */

	deleteById(table, id) {
		var q = db.prepare(`DELETE FROM ${table} WHERE ${table}_id = ?`);
		return q.run(id);
	}

	deleteProperty(id) {
		return this.deleteById("property", id);
	}
	deleteAccountType(id) {
		return this.deleteById("account_type", id);
	}
	deleteSensorType(id) {
		return this.deleteById("sensor_type", id);
	}
	deleteRoom(id) {
		return this.deleteById("room", id);
	}
	deleteDeviceType(id) {
		return this.deleteById("device_type", id);
	}
	deleteDeviceCommand(id) {
		return this.deleteById("device_command", id);
	}
	deleteUser(id) {
		return this.deleteById("user", id);
	}
	deleteAuth(id) {
		return this.deleteById("auth", id);
	}
	deleteSensor(id) {
		return this.deleteById("sensor", id);
	}
	deleteDevice(id) {
		return this.deleteById("device", id);
	}
	deleteRepeatTimer(id) {
		return this.deleteById("timer_repeat", id);
	}
	deleteOneshotTimer(id) {
		return this.deleteById("timer_oneshot", id);
	}
	deleteSensorReading(id) {
		return this.deleteById("sensor_reading", id);
	}
	deleteDeviceReading(id) {
		return this.deleteById("device_reading", id);
	}
	deleteDeviceTrigger(id) {
		return this.deleteById("device_trigger", id);
	}
	deleteWarning(id) {
		return this.deleteById("warning", id);
	}

	deleteAuthByToken(token) {
    var q = db.prepare(`DELETE FROM auth WHERE auth_token = ?`);
		return q.run(token);
	}

	deleteDeviceReadingByDeviceId(id) {
		var q = db.prepare(
			`DELETE FROM device_reading WHERE device_reading_device_id = ?`
		);

		return q.run(id);
	}

	deleteSensorReadingBySensorId(id) {
		var q = db.prepare(
			`DELETE FROM sensor_reading WHERE sensor_reading_sensor_id = ?`
		);

		return q.run(id);
	}

	deleteRepeatTimerByDeviceId(id) {
		var q = db.prepare(
			`DELETE FROM timer_repeat WHERE timer_repeat_device_id = ?`
		);

		return q.run(id);
	}

	deleteOneshotTimerByDeviceId(id) {
		var q = db.prepare(
			`DELETE FROM timer_oneshot WHERE timer_oneshot_device_id = ?`
		);

		return q.run(id);
	}

  deleteTriggerById(id) {
		var q = db.prepare(
			`DELETE FROM device_trigger WHERE device_trigger_id = ?`
		);

		return q.run(id);
  }

	deleteTriggerByDeviceId(id) {
		var q = db.prepare(
			`DELETE FROM device_trigger WHERE device_trigger_device_id = ?`
		);

		return q.run(id);
	}

	deleteTriggerBySensorId(id) {
		var q = db.prepare(
			`DELETE FROM device_trigger WHERE device_trigger_sensor_id = ?`
		);

		return q.run(id);
	}
}

module.exports = databasehandler;
