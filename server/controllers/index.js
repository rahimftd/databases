var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(messageArray) {
        res.send(messageArray);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = req.body;
      console.log(data);
      models.messages.post(data);
      res.send();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var data = req.body;
      console.log('------------------', data);
      models.users.post(data);
      res.send();
    }
  }
};
