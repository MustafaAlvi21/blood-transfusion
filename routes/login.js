// signIn
const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userDataModule = require('../modules/signUpSchema');
const checkExistingUsernameFromDB = require('../middleware/existing-user');
// const local_storage = require('../middleware/local-storage');

// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }



  router.get('/', (req,res) => {
    res.render('login', {
      title: '',
      loginUser: '',
      msg: ''
  })
})


router.post('/', (req, res) => {
    var userToken = localStorage.getItem('userToken');
    if(userToken){
      res.redirect('/');
    } else {
        const Username = req.body.Username;
        const password = req.body.password;

        var checkUser = userDataModule.findOne({ Username: Username });
        checkUser.exec(function (err, data) {
          console.log('data : ' + data)
          if (data == null){
            res.render('login', { title: 'login', msg:'Incorrect Username...', loginUser: localStorage.getItem('loginUser') });
          } else {
          if (err) throw err;
               var getPasswordFromDB = data.password;
               var getUserId = data._id;
               if (password == getPasswordFromDB){
                console.log('password match')
                let token = jwt.sign({ username: Username }, 'loginToken');
                localStorage.setItem('userToken', token);
                localStorage.setItem('loginUser', Username);
                localStorage.setItem('loginUserGender', data.Gender);
                // console.log("userToken: 123    " + localStorage.getItem('userToken') );                 
                console.log("loginUser: " + localStorage.getItem('loginUser') );                 
                // console.log("loginUserGender: " + localStorage.getItem('loginUserGender') );                 
                res.render('home', {title:"Home" , loginUser: localStorage.getItem('loginUser'),  loginUserGender: localStorage.getItem('loginUserGender')  });     
               } else {
                console.log('password match')
                res.render('login', { title: 'login', msg:'Incorrect Password... ', loginUser: localStorage.getItem('loginUser') });
               }
              }
           });
        }
})





module.exports = router; 