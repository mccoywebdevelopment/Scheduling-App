const { generateClientToken , getCreditCardToken } = require('./payments/brainTree');
const { queryCreatePaymentProfile } = require('./pestRoutes/customer');
const { findSubscriptionsByIds } = require('./pestRoutes/subscription');

function generateBrainTreeToken(callback){
    generateClientToken(function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
}

function createPaymentProfileBrainTree(firstName,lastName,billingAddress,billingCity,billingState,billingZip,billingCountryID,
    pestRouteCustomerID,token,callback){
    getCreditCardToken(firstName,lastName,token,function(err,result){
        if(err){
            callback(err);
        }else{
            queryCreatePaymentProfile(billingAddress,billingCity,billingState,billingZip,billingCountryID,
                pestRouteCustomerID,result.creditCardToken,
                result.creditCardID,function(err,result){
                    if(err){
                        callback(err);
                    }else{
                        callback(null,result);
                    }
            });
        }
    });
}
function createPaymentProfileWorldPay(firstName,lastName,billingAddress,billingCity,billingState,billingZip,billingCountryID,
    pestRouteCustomerID,token,callback){

        queryCreatePaymentProfile(billingAddress,billingCity,billingState,billingZip,billingCountryID,
            pestRouteCustomerID,token,null,function(err,result){
                if(err){
                    callback(err);
                }else{
                    callback(null,result);
                }
        });

}

function createPayment(subscriptionIDs,callback){
    findSubscriptionsByIds(subscriptionIDs,function(err,subscriptionsFound){
        if(err){
            callback(err);
        }else{
            callback(null,subscriptionsFound);
        }
    });
}


module.exports = { generateBrainTreeToken , createPaymentProfileWorldPay , createPayment}