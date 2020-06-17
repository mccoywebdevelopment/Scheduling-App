const { findPestRouteCustomer , createPestRouteCustomer, queryCreatePaymentProfile ,
        findPestRouteCustomerByID} = require('./pestRoutes/customer');
const { generateAccessToken } = require('../config/auth');

function createCustomer(body,callback){
    var addressParams = {
        address:body['address'],
        city:body['city'],
        state:body['state'],
        zip:body['zip']
    }
    findPestRouteCustomer(addressParams,function(err,pestRouteCustomer){
        if(err){
            callback(err);
        }else if(!pestRouteCustomer){
            createPestRouteCustomer(body,function(err,customer){
                if(err){
                    callback(err);
                }else{
                    callback(null,returnJWTObj(customer));
                }
            });
        }else{
            callback('Returning user');
        }
    });
}

function loggin(body,callback){
    var params = {
        address:body['address'],
        city:body['city'],
        state:body['state'],
        zip:body['zip'],
        phone:body['phoneNumber']
    }
    findPestRouteCustomer(params,function(err,customer){
        if(err){
            callback(err);
        }else if(!customer){
            callback("User not found.")
        }else{
            callback(null,returnJWTObj(customer));
        }
    });
}
/*
    subscribedItems:[{
        serviceTypeID:String,
        spotID:String,
        price:Number,
        description:String,
        name:String,
        recurring:{
            frequency:string,
            amount:Number
        }

    }]
*/
function returnJWTObj(customer){
    return generateAccessToken({
        pestRoutesConfig:{
            customerID:parseInt(customer.CustomerID),
            pestRouteCustomerID:parseInt(customer.PestRoutesCustomerID),
            subscribedItems:[]
        }
    });
}
function createPaymentProfile(customerID,body,callback){
    queryCreatePaymentProfile(customerID,null,function(err,payRes){
        if(err){
            callback(err);
        }else{
            callback(null,payRes);
        }
    });
}

function findCustomerByID(customerID,callback){
    findPestRouteCustomerByID(customerID,function(err,result){
        if(err){
            callback(err);
        }else if(!result){
            callback("Customer not found.")
        }else{
            callback(null,result);
        }
    });
}

module.exports = { createCustomer , createPaymentProfile , loggin , findCustomerByID}