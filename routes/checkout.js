const express = require('express');
const router = express();
const CheckoutQ = require('../queries/checkout');

router.route('/get/token/brain-tree')
.post(function(req,res){
    CheckoutQ.generateBrainTreeToken(function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });
});


// router.route('/get/create/payment-profile')
// .post(function(req,res){
//     CheckoutQ.createPaymentProfilePestRoutes(req.user.pestRouteCustomerID,req.body.nonce,function(err,result){
//         if(err){
//             console.log("\n\n\n"+err);
//             res.status(404).json({err:err,redirectURL:null});
//         }else{
//             res.send({result:result});
//         }
//     });
// });


router.route('/create/payment')
.post(function(req,res){
    CheckoutQ.createPayment(req.body.subscriptionIDs,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });
});

router.route('/world-pay/create/payment-profile')
.post(function(req,res){
    CheckoutQ.createPaymentProfileWorldPay("Christopher","McCoy","338 E Haravard Ave",
    "Gilbert","AZ","85234","US",req.user.pestRouteCustomerID,req.body.token,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });
});


module.exports = router;