const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

   // settingUp local-storage
   if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }


  router.get('/', (req, res) => {
      res.render('bloodStock', {
        title : '',
        loginUser : '',
        data : '',
      })
  });



  module.exports = router