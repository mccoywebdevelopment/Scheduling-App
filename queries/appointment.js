const { create } = require('./pestRoutes/appointment');
const { findSubscriptionsByIds } = require('./pestRoutes/subscription');
const { generateAccessToken } = require('../config/auth');
const { updateSubscripton } = require('./subscription');
const { findPestRouteCustomerByID } = require('./pestRoutes/customer');

//get typeID from subscription
function createAppt(customerID,body,callback){
    if(!customerID || !body.subscriptionID || !body.spotID){
        callback("Missing one of the following: customerID, subscriptionID, or spotID");
    }else{
        findSubscriptionsByIds([body.subscriptionID],function(err,subscriptionFound){
            if(err){
                callback(err);
            }else if(!subscriptionFound){
                callback("Subscription not found.")
            }else{
                //callback(null,subscriptionFound);
                subscriptionFound = subscriptionFound[0];
                create(customerID,body.spotID,subscriptionFound.serviceID,body.subscriptionID,function(err,result){
                    if(err){
                        callback(err);
                    }else{
                        callback(null,result);
                    }
                });
            }
        });
    }
}
// function findSubscriptionsByIds(ids,callback){
//     if(ids.length<1){
//       callback("No subscriptionIDs were givin.");
//       return;
//     }
//     var i=0;
//     var subscriptionsArr = [];
//     ids.forEach(element => {
//       findSubscriptionByID(element,function(err,subscription){
//         if(err){
//           callback(err);
//           return;
//         }else if(i==ids.length-1){
//           subscriptionsArr.push(subscription);
//           callback(null,subscriptionsArr);
//           return;
//         }else{
//           subscriptionsArr.push(subscription);
//         }
//         i++;
//       });
//     });
//   }
function createAppts(user,callback){
    //create subscription
    //create appt 1:1
    var serviceTypeIDs = [];
    var spotIDs = [];

    for(var i=0;i<user.subscribedItems.length;++i){
        serviceTypeIDs.push(user.subscribedItems[i].serviceType);
        spotIDs.push(user.subscribedItems[i].spotID);
    }
    console.log(serviceTypeIDs);
    updateSubscripton(user.pestRouteCustomerID,serviceTypeIDs,function(err,updatedSubscription){
        if(err){
            callback(err);
        }else{
            if(spotIDs.length<1){
                callback("No spotIDs were givin.");
                return;
            }else{
                findPestRouteCustomerByID(user.pestRouteCustomerID,function(err,customerFound){
                    if(err){
                        callback(err);
                    }else{
                        var subscriptionIDs = customerFound.subscriptionIDs.split(',');
                        var i = 0;
                        spotIDs.forEach(element => {
                            create(user.pestRouteCustomerID,element,serviceTypeIDs[i],subscriptionIDs[i],function(err,result){
                                if(err){
                                    callback(err);
                                }else{
                                    callback(null,result);
                                }
                            });
                        });

                    }
                });
            }
        }
    });

}


function updateJWT(user,body,callback){
    callback(null,returnJWTObj(body,user));
}

function returnJWTObj(body,user){
    var subscribedItems = [];
    for(var i=0;i<body.length;++i){
        subscribedItems.push({
            spotID:body[i].spot.spotID,
            serviceType:body[i].plan.typeID,
            initialCharge:body[i].plan.defaultInitialCharge,
            recurringCharge:body[i].plan.minimumRecurringCharge
        });
    }
    user.subscribedItems = subscribedItems;
    // console.log(user);
    return generateAccessToken({
        pestRoutesConfig:user
    });
}

module.exports = { createAppt , updateJWT , createAppts}