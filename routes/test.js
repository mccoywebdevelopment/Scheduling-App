const express = require('express');
const router = express();
const configVars = require('../config/variables');
const customerQ = require('../queries/customer');
const prCustomerQ = require('../queries/pestRoutes/customer');
const { authenticateToken } = require('../config/auth');
const nodemailer = require('nodemailer');

router.post('/mail',function(req,res){
  var body = req.body;

  var name = body.firstName + " " + body.lastName;
  var phone = body.phone;
  var email = body.email;
  var address = body.address;
  var state = body.state;
  var city = body.city;
  var zip = body.zip;

  var str =   "<p>Address: " + address + "</p>";
  str = str + "<p>City: " + city + "</p>";
  str = str + "<p>State: " + state + "</p>";
  str = str + "<p>Zip: " + zip + "</p>";
  str = str + "<p>Name: " + name + "</p>";
  str = str + "<p>Phone: " + phone + "</p>";
  str = str + "<p>Email:" + email + "</p>";
  str = str + "<p>Note: This is an automated email please do not respond. If any issues please contact cmmccoy1996@gmail.com.</p>";

  // var sendTo = "office@mikesswatteam.com";
  // var sendTo = "cmmccoy1996@gmail.com";
  var sendTo = "tnichols@moxiepestcontrol.com";

  sendNodeMail(str,sendTo,"New Customer has been added.",function(err,result){
    if(err){
      console.log("\n\n\n"+err);
      res.status(404).json({err:err,redirectURL:null});
    }else{
        res.send({result:result});
    }
  });
});

function sendNodeMail(html,email,subject,callback){
  nodemailer.createTestAccount((err, account) => {
      if (err) {
       // console.error("Failed to create a testing account. " + err.message);
        callback(err);
      }

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: configVars.gmail.email,
          pass: configVars.gmail.password
        }
      });

      let message = {
        from: "Sun Notes <" + configVars.gmail.email + ">",
        to: email,
        subject: subject,
        html: html
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          callback(err);
        } else {
          callback(null, "Email was sent please check your inbox.");
        }
      });
    });
}

require('../queries/payments/worldPay');

module.exports = router;
