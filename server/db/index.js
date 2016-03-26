var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// Connect to mysql server
dbConnection = mysql.createConnection({
  user: 'root',
  password: 'password', // <---- no password?!?
  database: 'chat'
});
dbConnection.connect();

exports.insertValue = function(tableName, values) {
  var valueString = values.join(', ');
  console.log(valueString);
  dbConnection.query('INSERT INTO ' + tableName + ' VALUES (null, ' + valueString + ')', function (err, results) {
    if (err) {
      console.log('Could not insert user into ', tableName, ': ', err);
    } else {
      console.log('INSERT INTO ' + tableName + ' VALUES (null,' + valueString + ')');
      console.log('Success! Inserted into ', tableName, ': ', results);
    }
  });
};

exports.getMessages = function(callback) {
  var messageQuery = 'SELECT m.message, m.roomname, u.username FROM messages m INNER JOIN users u on u.id = m.user_id';
  dbConnection.query(messageQuery, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      callback(results);
    }
  });
};

exports.getUserId = function(username, callback) {
  dbConnection.query('SELECT id FROM Users WHERE username = ' + username, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      callback(results[0].id);
    }
  });
};