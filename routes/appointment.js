const express = require('express');
const router = express();
const AppointmentQ = require('../queries/appointment');
const CustomerQ = require('../queries/pestRoutes/customer');

router.route('/create')
.post(function(req,res){
    AppointmentQ.createAppts(req.user,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });
    // console.log(true);
    // subscribe first!!!
    // CustomerQ.findPestRouteCustomerByID(req.user.pestRouteCustomerID,function(err,customerFound){
    //     if(err){
    //         console.log("\n\n\n"+err);
    //         res.status(404).json({err:err,redirectURL:null});
    //     }else{
    //         // console.log(customerFound);
    //         var subscriptionIDs = customerFound.subscriptionIDs.split(',');
    //         console.log(subscriptionIDs);
    //         var body = {
    //             subscriptionID:subscriptionIDs,
    //         }
    //     }
    // });
    // AppointmentQ.createAppt(req.user.pestRouteCustomerID,req.body,function(err,result){
    //     if(err){
    //         console.log("\n\n\n"+err);
    //         res.status(404).json({err:err,redirectURL:null});
    //     }else{
    //         res.send({result:result});
    //     }
    // });
});

router.route('/create/jwt')
.post(function(req,res){
    AppointmentQ.updateJWT(req.user,req.body,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({jwt:result});
        }
    });
});

module.exports = router;