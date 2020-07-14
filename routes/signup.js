const express = require ('express');
const router = express.Router();
// const signUpSchema = require ('../modules/signUpSchema')
var userDataModule = require('../modules/signUpSchema');
// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }


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

  
  router.get('/', (req, res) => {
    res.render('signUp', {
        title : '',
        msg : '',
        loginUser : '',
        usernameMsg : '',
        emailMsg : ''
    })
})


router.post('/', checkExistingUsernameFromDB , (req, res, next) => {
    var userToken = localStorage.getItem('userToken');
    if(userToken){
      res.redirect('/');
    } else {
        console.log('req.body.Username : ' + req.body.Username)
        const Username = req.body.Username;
        const Email =  req.body.Email;
        const password = req.body.password;
        const Date_of_Birth =  req.body.Date_of_Birth;
        const Gender =  req.body.Gender;
        const Profile_Info =  req.body.Profile_Info;
        const phone =  req.body.phone;
        const city =  req.body.city;

        var d = Date(Date.now()); 
        const currentDate = d.toString();

        const signUpDetails = new userDataModule({
            Username : Username,
            Email : Email,
            password : password,
            Date_of_Birth : Date_of_Birth,
            Gender : Gender,
            Profile_Info : Profile_Info,
            phone : phone,
            city : city,
          });
          signUpDetails.save((err, data) => {
            if(err) throw err;
            res.render('login', { title: '', msg:"Successfully registered.", loginUser : '', usernameMsg : '', emailMsg : ''});
          });
        }
})


module.exports = router; 