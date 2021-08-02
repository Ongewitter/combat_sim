var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Helloworld page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  const db = req.db;
  const collection = db.get('usercollection');
  collection.find({},{},function(e, docs){
      res.render('userlist', {
          "userlist" : docs,
          "title": "Hello World"
      });
  });
});

/* GET New User page. */
router.get('/newuser', function(_req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
  // Get the DB collection
  const collection = req.db.get('usercollection');
  // The form values.
  const { userName, userEmail } = req.body;
  const data = {
    "username" : userName,
    "email" : userEmail
  }

  // Submit to the DB
  collection.insert(data, function (err, _doc) {
      if (err) {
          res.send("There was a problem adding the information to the database.");
      } else {
          res.redirect("userlist");
      }
  });
});

module.exports = router;
