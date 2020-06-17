const express = require('express');
const router = express();
const SubscriptionQ = require('../queries/subscription');

router.route('/update')
.post(function(req,res){
    SubscriptionQ.updateSubscripton(req.user.pestRouteCustomerID,req.body.serviceTypeIDs,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });

});

router.route('/update-with-jwt')
.post(function(req,res){
    var serviceTypeIDs = [];
    for(var i=0;i<req.user.subscribedItems.length;++i){
        serviceTypeIDs.push(req.user.subscribedItems[i].serviceType);
    }
    // console.log(serviceTypeIDs);
    SubscriptionQ.updateSubscripton(req.user.pestRouteCustomerID,serviceTypeIDs,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });
});

router.route('/update-jwt')
.post(function(req,res){
    SubscriptionQ.updateSubscriptionJWT(req.user,req.body.serviceTypeIDs,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({JWT:result});
        }
    });
});

//need to change
router.route('/get/me')
.post(function(req,res){
    SubscriptionQ.getUserSubscritions(req.user.pestRouteCustomerID,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });
});

module.exports = router;