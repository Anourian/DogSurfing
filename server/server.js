var db = require('./db/model');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: __dirname + '/../clients/assets/img/profile/' });
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var jwt = require('jwt-simple');
var secret = 'thisisdoge';
// app.use(session({secret: 'abc'}));

app.use(express.static(__dirname + '/../clients'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/profile/:email', function(req, res){
  db.profile.get(req.params.email, function(dataFromDb){
    res.status(200).send(dataFromDb);
  });
});

app.get('/profiles', function(req, res){
  db.profile.getAll(function(dataFromDb){
    res.status(200).send(dataFromDb);
  });
});

app.get('/post', function(req, res){
  db.post.get(function(dataFromDb){
    res.status(200).send(dataFromDb);
  });
});

app.post('/profile', upload.single('file'), function(req, res){
  req.body.image = req.file.filename;
  db.profile.post(req.body, function(data2, status){
    if (status === 201) {
      var token = jwt.encode(data2.name, secret);
    }
    res.status(status).send({data: data2, token: token});
  });
});

app.put('/profile/:email', function(req, res) {
  if (!req.body.eventArray){
    db.profile.updateAll(req.params.email, req.body, function(st, data){
      if (st === 400){
        res.status(201).send(data);
      } else {
        res.status(201).end();
      }
    });
  } else {
    db.profile.updateEvent(req.params.email, req.body, function(data) {
      res.status(201).send(data); 
    });    
  }
});

app.post('/post', function(req, res){
  db.post.post(req.body, function(success){
    console.log('post reached');
    res.status(201).send(success);
  });
});
app.post('/login', function(req, res){
  console.log('req.body = ' + JSON.stringify(req.body));
  db.profile.Auth(req.body, function(dataFromDb){
    if (dataFromDb === true){
      var token = jwt.encode(req.body.name, secret);
      res.status(200).send({token: token});
    } else {
      res.status(201).send('error');
    }
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log('listening on port 5000');
});

