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

User.hasMany(Message); // Creates 1-to-Many association to Messages, adds foreign key user_id to Messages

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
db.sync().then(function() {
  console.log('Tables added to chat');
});

exports.insertValue = function(valueObject, sequelizeObject) {
  var newValue = sequelizeObject.build(valueObject);
  newValue.save().then(function() {
    console.log('Successfully added value:', valueObject);
  });
};

exports.getUserId = function(username, callback) {
  User.findAll({ attributes: ['id'], where: { username: username } } ).then(function(ids) {
    callback(ids[0].id);
  }); 
};