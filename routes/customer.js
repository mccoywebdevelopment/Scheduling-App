const express = require('express');
const router = express();
const CustomerQ = require('../queries/customer');
const SubscriptionQ = require('../queries/pestRoutes/subscription');
const { authenticateToken } = require('../config/auth');

router.route('/create')
.post(function(req,res){
    CustomerQ.createCustomer(req.body,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({JWT:result});
        }
    });
});

router.route('/loggin')
.post(function(req,res){
    CustomerQ.loggin(req.body,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({JWT:result});
        }
    });
});

router.use(authenticateToken);

router.route('/subscription/update')
.post(function(req,res){
    SubscriptionQ.updateSubscription(req.user.serviceTypes,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send(result);
        }
    });
});

router.route('/create/payment-profile')
.post(function(req,res){
    CustomerQ.createPaymentProfile(req.user.customerID,null,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({JWT:result});
        }
    });
});

router.route('/get/me')
.post(function(req,res){
    CustomerQ.findCustomerByID(req.user.pestRouteCustomerID,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({JWT:result});
        }
    });
});


module.exports = router;