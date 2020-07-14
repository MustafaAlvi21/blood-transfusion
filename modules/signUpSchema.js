const mongoose = require('mongoose');

var userSchema  = new mongoose.Schema(
    {
        Username : { type: String , required: true } ,
        Email : { type: String , required: true } ,
        password : { type: String , required: true } ,
        Date_of_Birth : { type: String , required: true  } ,
        Gender : { type: String , required: true } ,
        Profile_Info : { type: String , required: true } ,
        phone : { type: String , required: true } ,
        city : { type: String , required: true } ,
    }
  );


  var userDataModel = mongoose.model('users', userSchema);
  module.exports =  userDataModel;