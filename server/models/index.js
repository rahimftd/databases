var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getMessages(function(messages) {
        var responseMessageArray = [];
        messages.forEach(function(message) {
          var messageObject = {};
          messageObject.message = message.dataValues.message;
          messageObject.roomname = message.dataValues.roomname;
          messageObject.username = message.dataValues.User.dataValues.username;
          responseMessageArray.push(messageObject);
        });
        callback(responseMessageArray);
      });
    }, // a function which produces all the messages
    post: function (data) {
      var username = data.username;
      var message = data.message;
      var roomname = data.roomname;
      db.getUserId(username, function(id) {
        var userid = id;
        var messageObj = {message: message, roomname: roomname, UserId: userid};
        db.insertValue(messageObj, db.Message);
      });
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data) {
      db.insertValue(data, db.User);
    } // a function which can be used to insert a user into the database
  }
};