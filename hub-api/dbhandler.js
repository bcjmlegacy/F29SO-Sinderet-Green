var fs      = require('fs'),
sqlite3       = require('sqlite3').verbose(),
schemaFile    = `${__dirname}/db/hub-schema.sql`,
schema        = fs.readFileSync(schemaFile, 'utf8');

// var db = new sqlite3.Database(`${__dirname}/db/data`);

// Make a temporary database in memory, NOT PERSISTENTLY TO DISK
var db = new sqlite3.Database(':memory:');

db.serialize(function()
{
  db.exec(schema, function(err)  {
    if(err) {
      console.log(`! Error creating database!`);
      console.log(`! ${err}`);
    } else  {
      console.log("> Created database");
    }
  });
});

db.on("error", function(error) {
  console.log(error);
});

class databasehandler    {
  
  constructor()    {
    console.log("> DB connector created");
  }
  
  /* #######################################

  Get by ID.

  ####################################### */

  getById(table, id, callback)
  {
    var q = (`SELECT * FROM ${table} WHERE ${table}_id = ?`);
    
    db.all(q, [id], function(err, rows) {
      if(err) {
        callback(err);
      } else if(rows)  {
        callback(null, rows);
      } else  {
        callback(null, rows);
      }
    });
  }

  getAccountTypeById(id, callback)  { this.getById("account_type", id, callback); }
  getSensorTypeById(id, callback)   { this.getById("sensor_type", id, callback); }
  getRoomById(id, callback)         { this.getById("room", id, callback); }
  getDeviceTypeById(id, callback)   { this.getById("device_type", id, callback); }

  getSensorById(id, callback) { this.getById("sensor", id, callback); }
  getDeviceById(id, callback) { this.getById("device", id, callback); }

  /* #######################################

  Get by room.

  ####################################### */

  getByRoom(table, roomId, callback)
  {
    var q = (`SELECT * FROM ${table} WHERE ${table}_room = ?`);
    
    db.all(q, [roomId], function(err, rows) {
      if(err) {
        callback(err);
      } else if(rows)  {
        callback(null, rows);
      } else  {
        callback(null, rows);
      }
    });
  }

  getSensorByRoom(roomId, callback) { this.getByRoom("sensor", roomId, callback); }
  getDeviceByRoom(roomId, callback) { this.getByRoom("device", roomId, callback); }
  
  /* #######################################

  Get all of something with limits.

  ####################################### */

  getMany(table, callback, limit, offset) {

    if(limit && offset) {
      var q = (`SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset}`);
    } else if(limit) {
      var q = (`SELECT * FROM ${table} LIMIT ${limit}`);
    } else  {
      var q = (`SELECT * FROM ${table}`);
    }
    
    db.all(q, function(err, rows) {
      if(err) {
        callback(err);
      } else if(rows)  {
        callback(null, rows);
      } else  {
        callback(null, rows);
      }
    });
  }

  getAccountTypes(callback, limit, offset)    { this.getMany("account_type", callback, limit, offset); }
  getSensorTypes(callback, limit, offset)     { this.getMany("sensor_type", callback, limit, offset); }
  getRooms(callback, limit, offset)           { this.getMany("room", callback, limit, offset); }
  getDeviceTypes(callback, limit, offset)     { this.getMany("device_type", callback, limit, offset); }

  getSensors(callback, limit, offset)         { this.getMany("sensor", callback, limit, offset); }
  getDevices(callback, limit, offset)         { this.getMany("device", callback, limit, offset); }
  getUsers(callback, limit, offset)           { this.getMany("user", callback, limit, offset); }
  getSensorReadings(callback, limit, offset)  { this.getMany("sensor_reading", callback, limit, offset); }
  getDeviceReadings(callback, limit, offset)  { this.getMany("device_reading", callback, limit, offset); }

  /* #######################################

  Inserting readings.

  ####################################### */

  insertSensorReading(id, val)
  {
    
    var q = (`INSERT INTO sensor_reading (sensor_reading_sensor_id, sensor_reading_value) VALUES (?, ?)`);
    
    db.run(q, [id, val], function(err) {
      if (err) {
        console.log(`! Error inserting data record for sensor ${id}:`);
        console.log(`! ${err}`);
      }
      console.log(`> Inserted data record for sensor ${id}: ${JSON.stringify(this.lastID)}`);
    });
  }
  
  insertDeviceReading(id, type, val)
  {
    
    var q = (`INSERT INTO device_reading (device_reading_sensor_id, device_reading_type, device_reading_value) VALUES (?, ?, ?)`);
    
    db.run(q, [id, type, val], function(err) {
      if (err) {
        console.log(`! Error inserting data record for device ${id}:`);
        console.log(`! ${err}`);
      }
      console.log(`> Inserted data record for device ${id}: ${JSON.stringify(this.lastID)}`);
    });
  }
  
}


module.exports = databasehandler;