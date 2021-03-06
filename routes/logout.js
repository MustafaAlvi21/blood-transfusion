const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }
  
/* Logout */
router.get('/logout', function(req, res){
    localStorage.removeItem('userToken');
    localStorage.removeItem('loginUser');
  
    res.redirect('/');
  })
  
  
module.exports = router; 