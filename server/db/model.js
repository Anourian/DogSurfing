
var obj = require('./mongo');
// console.log(obj);
/*
{ profile : function - constructor with find, save, db methods -- inherited form mongoose
  post: function - constructor
}
=======
// grab the mongo thing
<<<<<<< 6c66e8dc80797a7f4c638e86a9ce4fc16c071d26
var Model = require('./mongo');
>>>>>>> Create skeleton for get & post controller
=======
=======
// grab the mongo thing  -  obj is just a container for
>>>>>>> add callback to get and post
var obj = require('./mongo');
// console.log(obj);
/*
{ profile : function - constructor with find, save, db methods -- inherited form mongoose
  post: function - constructor
}
>>>>>>> Create skeleton for profile model controller

*/

exports.profile = {
  get: function(cb) {

    // Grab records from db using the find method inherited from mongoose
    // on the obj.
    // obj -- the "super" class with profile and post properties
    // profile -- property on obj a mongoose model
    // find -- property from mongoose model that looks for records
    obj.profile.find( function(err, data){
      if(err){
        console.log(err);
      }
      cb(data);
    });
  },
  post: function(inputObj, cb) {
    // create an instance of a profile so the data pertains to the profile
    // property on obj
    var user = new obj.profile(inputObj);
    //instance of the profile we can save to db
    user.save( function(err, data){
      if(err){
        console.log(err);
      }
      if(data){
        cb('Post successful');
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
    obj.post.save(function(err, data){
      if(err){
        console.log(err);
      }
      if(data){
        cb('Post successful');
      }

    });
  }
};



var profile = {
  name: 'bob',
  email: 'bob225@gmail.com',
  image: 'some string'
};

