var bcrypt = require('bcrypt-nodejs')
var obj = require('./mongo');


exports.profile = {
  get: function(email, cb) {
    obj.profile.findOne({email:email}, {password: 0}, function(err, data){
      if(err){
        cb(err);
      }
      cb(data);
    });
  },
  getAll: function(cb) {
    obj.profile.find({}, {
      name: 1,
      email: 1,
      location: 1,
      image: 1
    }, function(err, data){
      if(err){
        cb(err);
      }
      cb(data);
    });
  },
  post: function(inputObj, cb) {
    // check if name and email already exist in db

    var user = new obj.profile(inputObj);
    //instance of the profile we can save to db
    user.save( function(err, data){
      if(err){
        cb('this username and/or email is already in use', 202);
      }
      else {
        cb(data, 201);
      }
      
    });
  },
  updateAll: function(email, values, cb) {
    var query = {email: email};
    obj.profile.findOneAndUpdate(query, values,{password:0}, function(err, data) {
      if (err) {
        console.log('update error');
        cb(400, err);
      } else {
        console.log('update succeeded');
        cb(201, data);
      }
    });
  },
  updateEvent: function(email, inputObj, cb) {
    var query = {email: email};
    obj.profile.findOneAndUpdate(query, {events: inputObj.eventArray}, function(err, data) {
      if (err) {
        console.log('there is an error with updating', err);
      } else {
        cb(data);
      }
    });
  },
  Auth: function(input, cb) {
    var query = {name: input.name};
    console.log('in auth function' + input);
    obj.profile.findOne(query, function(err, data) {
      if (err) {
        console.log('there is an error with updating', err);
      } else {
        console.log('about to bcrypt this data fo sho');
        console.log(data);
        if (data !== null){
          cb(bcrypt.compareSync(input.password, data.password), data.email, data.image);                  
        } else {
          cb(false);
        }
      }
    });
  }
};

exports.post = {
  get: function(cb) {
    //grab records from the database using the find method
    // providing access to this method through post property on the obj
    obj.post.find(function(err, data){
      if(err){
        console.log(err);
      }
      cb(data);
    });
  },
  post: function(inputObj, cb) {
    var post = new obj.post(inputObj);
    post.save(function(err, data){
      if(err){
        console.log(err);
      }
      if(data){
        cb('Post successful');
      }
    });
  }
};


