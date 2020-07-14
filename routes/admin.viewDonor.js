const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dononrRequestDataModel = require ('../modules/DB_req_donation')

   // settingUp local-storage
   if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }


/*          V i e w   D o n o r    R e q    P a g e           */

router.get('/donors', function(req, res, next){
    dononrRequestDataModel.find({Status : "Pending"}).exec(function(err, result){
        // console.log(result[0].Status)
        if (err) throw err;
        res.render('adminView', {  title: 'Admin', data: result, loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser'), })
    });
});

/*         E d i t   D o n o r     R e q u e s t        */
app.get('/donorEdit/:Donation_Req_Id', function(req, res, next){
    const userID= req.params.Donation_Req_Id;
    localStorage.setItem('donorEdit_Donation_Req_Id', userID);
    let sql_1 = "SELECT * FROM Donationrequest  WHERE Donation_Req_Id = ? ";
    let Query = mySqlConnection.query(sql_1, userID, function(error, results){
        if (error) throw error;
        res.render('admindonorEdit', { title: 'Admin Donor Edit', msg: '', data: results,loginUserGender: localStorage.getItem('loginUserGender'), loginUser: localStorage.getItem('loginUser') , });
    })
});

// app.post('/admin/donorEdit', function(req, res, next){
//     const ID = localStorage.getItem('donorEdit_Donation_Req_Id');
//     const Status = req.body.Status;
    
//     let sql_1 = "UPDATE Donationrequest SET Status = ? WHERE Donation_Req_Id = ?; INSERT INTO Donor(Username, Donation_Req_Id) SELECT Username, Donation_Req_Id FROM Donationrequest WHERE Donation_Req_Id = ? " ;
//     let Query = mySqlConnection.query(sql_1, [Status, ID, ID] , function (error, result){
//         if (error) throw error;
//         localStorage.removeItem('donorEdit_Donation_Req_Id');
//         res.redirect('/admin')
//     })
// });

// app.get('/admin/donorRemove/:Donation_Req_Id', function(req, res, next){
//     const ID = req.params.Donation_Req_Id;
//     let sql_1 = " DELETE FROM Donationrequest WHERE Donation_Req_Id = ? " ; 
//     let Query = mySqlConnection.query(sql_1, ID, function(error, result){
//         if (error) throw error;
//         localStorage.removeItem('donorEdit_Donation_Req_Id');
//         res.redirect('/admin');
//     })
// });







module.exports = router;