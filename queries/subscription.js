const { getServiceTypeByIds } = require('./pestRoutes/serviceTypes');
const { updateSubscription , findSubscriptionsByIds} = require('./pestRoutes/subscription');
const { findPestRouteCustomerByID } = require('./pestRoutes/customer');
const { generateAccessToken } = require('../config/auth');


function updateSubscripton(pestRouteCustomerID,serviceTypesIDs,callback){
    console.log("UPDATE SUBSCRIPTION")
    if(!serviceTypesIDs){
        callback('No service types were given.');
    }else{
        getServiceTypeByIds(serviceTypesIDs,function(err,serviceTypes){
            if(err){
                callback(err);
            }else{
                findPestRouteCustomerByID(pestRouteCustomerID,function(err,customerFound){
                    if(err){
                        callback(err);
                    }else if(!customerFound){
                        callback('User not found.');
                    }else{
                        updateSubscription(customerFound,serviceTypes,function(err,updatedCustomer){
                            if(err){
                                callback(err);
                            }else{
                                callback(null,"Sucess");
                            }
                        });
                    }
                });
            }
        });
    }
}

// Need to update JWT
function updateSubscriptionJWT(user,serviceTypesIDs,callback){
    callback(null,returnJWTObj(serviceTypesIDs,user));
}

function returnJWTObj(serviceTypesIDs,user){

    user.subscribedItems = serviceTypesIDs;
    return generateAccessToken({
        pestRoutesConfig:user
    });
}

function getUserServiceTypes(userID,callback){
    findSubscriptionsByIds(userFound.subscriptionIDs.split(','),function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
}

function getUserSubscritions(userID,callback){
    findPestRouteCustomerByID(userID,function(err,userFound){
        if(err){
            callback(err);
        }else if(!userFound.subscriptionIDs){
            callback(null,null);
        }else{
            findSubscriptionsByIds(userFound.subscriptionIDs.split(','),function(err,result){
                if(err){
                    callback(err);
                }else{
                    callback(null,result);
                }
            });
        }
    });
}

module.exports = { updateSubscripton , getUserSubscritions , updateSubscriptionJWT}