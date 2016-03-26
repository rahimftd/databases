var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getMessages(function(messageArray) {
        callback(messageArray);
      });
    }, // a function which produces all the messages
    post: function (data) {
      var username = JSON.stringify(data.username);
      var message = JSON.stringify(data.message);
      var roomname = JSON.stringify(data.roomname);
      var tableName = 'Messages';
      
      db.getUserId(username, function(id) {
        var userid = id;
        db.insertValue(tableName, [message, roomname, userid]);
      });
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data) {
      var username = JSON.stringify(data.username);
      var tableName = 'Users';
      db.insertValue(tableName, [username]);
    } // a function which can be used to insert a user into the database
  }
};

