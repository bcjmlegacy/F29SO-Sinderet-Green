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
  
  constructor(newName)    {
    console.log("> DB Connector created");
  }
  
  isSensor(id, callback)
  {
    var q = (`SELECT * FROM sensor WHERE sensor_id = ?`);
    
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
  
  isDevice(id, callback)
  {
    var q = (`SELECT * FROM device WHERE device_id = ?`);
    
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
  
  insertSensorReading(id, val)    {
    
    var q = (`INSERT INTO sensor_reading (sensor_reading_sensor_id, sensor_reading_value) VALUES (?, ?)`);
    
    db.run(q, [id, val], function(err) {
      if (err) {
        console.log(`! Error inserting data record for sensor ${id}:`);
        console.log(`! ${err}`);
      }
      console.log(`> Inserted data record for sensor ${id}: ${JSON.stringify(this.lastID)}`);
    });
  }

  insertDeviceReading(id, type, val)    {
    
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