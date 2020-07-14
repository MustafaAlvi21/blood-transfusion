const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userDataModule = require('../modules/signUpSchema');



/* Checking db existing username. */ 
  function checkExistingUsernameFromDB(req, res, next){
    var enteredUsername = req.body.Username;
    var checkExistingUsernameFromDB = userDataModule.findOne({Username : enteredUsername});
    console.log('checkExistingUsernameFromDB : ' + checkExistingUsernameFromDB)
    
    checkExistingUsernameFromDB.exec((err, data) => {
      if (err) throw err; 
      if (data){
        return   res.render('signup', { title: 'Password Management System', msg:"", loginUser: '', usernameMsg: 'Username exist in our data', emailMsg: '', });
      }
      next();
    });
  };
  
  