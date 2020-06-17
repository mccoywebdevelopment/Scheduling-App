const express = require('express');
const router = express();
const serviceTypesQ = require('../queries/serviceType');
const PestRouteServiceTypeQ = require('../queries/pestRoutes/serviceTypes');

router.route('/get/specific')
.post(function(req,res){
    // Testing
    // var serviceIDs = [4299,1694,4292,3834];
    // Moxie
    //1452: Bimonthly Maintaince
    //1454: Monthly Maintaince
    //4294: Mosquito Maintaince
    //1433: Quatly Maintaince
    //4295: Weed Maintaince
    var serviceIDs = [1433,1452,1454,4294,4295];
    PestRouteServiceTypeQ.getServiceTypeByIds(serviceIDs,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            var recommended = [];
            var warrienties = [];
            for(var i=0;i<req.user.selectedPest.length;++i){
                if(req.user.selectedPest[i] == "ants" ||
                    req.user.selectedPest[i] == "spiders" || 
                    req.user.selectedPest[i] == "crickets" ||
                    req.user.selectedPest[i] == "earwigs" ||
                    req.user.selectedPest[i] == "scorpions"){

                        //recommended.includes(1433);
                        recommended = uniquePush(1433,recommended);
                }
                if(req.user.selectedPest[i] == "mice"){
                    // recommended.includes("mice");
                    recommended = uniquePush("mice",recommended);
                }
                if(req.user.selectedPest[i] == "cockroaches"){
                    // recommended.includes("cockroach");
                    recommended = uniquePush("cockroaches",recommended);
                }
                if(req.user.selectedPest[i] == "mosquitoes"){
                    // recommended.includes(4294);
                    recommended = uniquePush(4294,recommended);
                }
                if(req.user.selectedPest[i] == "termites"){
                    // recommended.includes(null);
                    recommended = uniquePush(null,recommended);
                }
                if(req.user.selectedPest[i] == "weeds"){
                    // recommended.includes(4295);
                    recommended = uniquePush(4295,recommended);
                }
            }
            res.send({result:result,recommended:recommended});
        }
    });
});

function uniquePush(item,array){
    if(!array.includes(item)){
        array.push(item);
    }
    return array;
}

router.route('/get/me')
.post(function(req,res){
    PestRouteServiceTypeQ.getServiceTypeByIds(req.user.subscribedItems,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({result:result});
        }
    });
});

router.route('/total')
.post(function(req,res){
    res.send({result:serviceTypesQ.getTotal(req.user)});
});

module.exports = router;