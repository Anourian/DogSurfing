var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var restful = require('node-restful');
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/greenfield';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Mongodb connection open');
});

var profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  location: {
    location: {type:String, required:true},
    lat:Number,
    lng: Number
  },
  image: {
    type: String
  },
  about: {
    type: String,
    required: true
  },
  events: [{
    date: String,
    title: String
  }]
});

var postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    /*unique: true,*/
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  type:{
    type:String
  },
  dogtype: {
    type:String
  }
});

profileSchema.pre('save', function(next) {
  var user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});



exports.profile = mongoose.model('Profile', profileSchema);
exports.post = mongoose.model('Post', postSchema);



// id
// username
// email
// description
// img
// watching or needing



// username
// description