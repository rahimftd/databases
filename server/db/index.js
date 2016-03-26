
// var mysql = require('mysql');

// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".

// // Connect to mysql server
// dbConnection = mysql.createConnection({
//   user: 'root',
//   password: 'password', // <---- no password?!?
//   database: 'chat'
// });
// dbConnection.connect();

// exports.insertValue = function(tableName, values) {
//   var valueString = values.join(', ');
//   console.log(valueString);
//   dbConnection.query('INSERT INTO ' + tableName + ' VALUES (null, ' + valueString + ')', function (err, results) {
//     if (err) {
//       console.log('Could not insert user into ', tableName, ': ', err);
//     } else {
//       console.log('INSERT INTO ' + tableName + ' VALUES (null,' + valueString + ')');
//       console.log('Success! Inserted into ', tableName, ': ', results);
//     }
//   });
// };

// exports.getMessages = function(callback) {
  // var messageQuery = 'SELECT m.message, m.roomname, u.username FROM messages m INNER JOIN users u on u.id = m.user_id';
//   dbConnection.query(messageQuery, function(err, results) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(results);
//       callback(results);
//     }
//   });
// };

// exports.getUserId = function(username, callback) {
//   dbConnection.query('SELECT id FROM Users WHERE username = ' + username, function(err, results) {
//     if (err) {
//       console.log(err);
//     } else {
//       callback(results[0].id);
//     }
//   });
// };


var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'password');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
exports.User = User = db.define('User', {
  username: Sequelize.STRING
});

exports.Message = Message = db.define('Message', {
  message: Sequelize.TEXT,
  roomname: Sequelize.STRING
});

// Creates 1-to-Many association to Messages, adds foreign key user_id to Messages
// exports.initialize = function() {
User.hasMany(Message);
Message.belongsTo(User);
db.sync().then(function() {
  console.log('Tables added to chat');
});

// };

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */

exports.insertValue = function(valueObject, sequelizeObject) {
  // Checks if users already exists
  if (sequelizeObject === User) {
    User.findAll({ where: { username: valueObject.username } }).then(function(users) {
      if (users.length === 0) {
        var newValue = sequelizeObject.build(valueObject);
        newValue.save().then(function() {
          console.log('Successfully added value:', valueObject);
        }); 
      }
    });
  } else {
    var newValue = sequelizeObject.build(valueObject);
    newValue.save().then(function() {
      console.log('Successfully added value:', valueObject);
    }); 
  }
};

exports.getUserId = function(username, callback) {
  User.findAll({ attributes: ['id'], where: { username: username } } ).then(function(ids) {
    callback(ids[0].id);
  }); 
};

exports.getMessages = function(callback) {
  var attributesMessage = ['message', 'roomname'];
  var attributesUser = ['username'];
  Message.findAll({ include: [{model: User, attributes: attributesUser}], attributes: attributesMessage }).then(function(messages) {
    callback(messages);
  });
};