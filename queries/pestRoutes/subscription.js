const configVars = require('../../config/variables');
const request = require('request');
const { updatedCustomerObj } = require('./customer')

function updateSubscription(pestRouteCustomer,serviceTypes,callback){
  if(serviceTypes.lname<1){
    callback("No service ids were provided");
    return;
  }
  console.log("11");
  console.log(serviceTypes);
  var i=0;
  serviceTypes.forEach(element => {
    fetchUpdate(element,pestRouteCustomer,function(err,updated){
      if(err){
        callback(err);
        return;
      }else if(i==serviceTypes.length-1){
        callback(null,"success");
        return;
      }
      i++;
    });
  });

}
function fetchUpdate(serviceType,pestRouteCustomer,callback){

  var postData = updatedCustomerObj(pestRouteCustomer,{});
  postData.Frequency = serviceType.frequency;
  postData.ServiceType = serviceType.description;
  postData.Price = serviceType.defaultCharge;
  postData.CustomerStatus = "Act";


  var options = { 
    method: 'POST',
    url: configVars.PEST_ROUTES_URL + "/import/main" + postData,
    qs: { 
      authenticationKey: configVars.PEST_ROUTES_API_KEY,
      authenticationToken: configVars.PEST_ROUTES_API_TOKEN,
      dataMain:[postData]
    },
    json: true
  }
  request(options,function(err,res,resBody) {
    // console.log(resBody);
    // console.log(postData);
    if(err){
      callback(err);
    }else if(!resBody.success){
        callback(resBody);
    }else{
      console.log(resBody);
      callback(null,resBody);
    }
  });
}

function findSubscriptionByID(id,callback){
  var url = configVars.PEST_ROUTES_URL + "/subscription/" + id;
  var form = {
    authenticationToken:configVars.PEST_ROUTES_API_TOKEN,
    authenticationKey:configVars.PEST_ROUTES_API_KEY
  }
  request.post(
      {
        uri: url,
        qs: form
      },
      function (err, res, resBody) {
        var resBody = JSON.parse(resBody);
        if(err){
            callback(err);
        }else if(!resBody.success){
          callback(resBody.errorMessage);
        }else{
          callback(null,resBody.subscription);
        }
      }
  );
}

function findSubscriptionsByIds(ids,callback){
  if(ids.length<1){
    callback("No subscriptionIDs were givin.");
    return;
  }
  var i=0;
  var subscriptionsArr = [];
  ids.forEach(element => {
    findSubscriptionByID(element,function(err,subscription){
      if(err){
        callback(err);
        return;
      }else if(i==ids.length-1){
        subscriptionsArr.push(subscription);
        callback(null,subscriptionsArr);
        return;
      }else{
        subscriptionsArr.push(subscription);
      }
      i++;
    });
  });
}
//get contract ID by subscription ID then delete contract By ID



module.exports = { updateSubscription , findSubscriptionsByIds }