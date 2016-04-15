var db = require('./db/model');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.use(express.static(__dirname + '/../clients'));
app.use(express.static(__dirname + '/../uploads'));
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
  req.body.image = req.file.path + '/' + req.file.mimetype;
  console.log(req.file.mimetype);
  db.profile.post(req.body, function(data){
    res.status(201).send(data);
  });
});

app.put('/profile/:email', function(req, res) {
  db.profile.updateEvent(req.params.email, req.body, function(data) {
    res.status(201).send(data); 
  });
});

app.post('/post', function(req, res){
  db.post.post(req.body, function(success){
    console.log('post reached');
    res.status(201).send(success);
  });
});

app.get('/uploads/:id/image/:mimetype', function (req, res) {
  var id = req.params.id
  console.log('*************id: ' + JSON.stringify(req.params));
})

app.listen(5000, function(){
  console.log('listening on port 5000');
});

