
const configVars = require('../../config/variables');
const { isValidProps } = require('../../config/helpers');
const request = require('request');

//return customerID if success
function createPestRouteCustomer(body,callback){
  isValidProps(['address','city','state','zip','phone','firstName','lastName','email'],body,function(err,success){
    if(err){
      callback(err);
    }else{
      var postData = {
        CustomerID: Math.floor((Math.random() * 9999999) + 1),
        CustomerName:body.firstName + " " + body.lastName,
        CustomerPhone1:body.phone,
        CustomerEmail:body.email,
        CustomerDateAdded:Date.now(),
        CustomerAddress:body.address,
        CustomerState:body.state,
        CustomerCity:body.city,
        CustomerZipCode:body.zip,
        CustomerStatus: "Act"
      }
      var options = { 
        method: 'POST',
        url: configVars.PEST_ROUTES_URL + '/import/main',
        qs: { 
          authenticationKey: configVars.PEST_ROUTES_API_KEY,
          authenticationToken: configVars.PEST_ROUTES_API_TOKEN,
          dataMain:[postData]
        },
        json: true
      }
      request(options,function(err,res,body) {
        if(err){
          callback(err);
        }else if(!body.success){
          callback(body.errorMessage);
        }else if(typeof(body.customersImported[0].CustomerID)==undefined){
          callback('Customer not created');
        }else{
          callback(null,body.customersImported[0]);
        }
      });
    }
  });
}
function findPestRouteCustomerByID(id,callback){
  var url = configVars.PEST_ROUTES_URL + "/customer/" + id;
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
        }else if(resBody.customer.length<1){
          callback(null,null);
        }else{
          callback(null,resBody.customer);
        }
      }
    );
}
function findPestRouteCustomer(body,callback){
  isValidProps(['address','city','state','zip'],body,function(err,success){
    if(err){
      callback(err);
    }else{
      var url = configVars.PEST_ROUTES_URL + "/customer/search";
      var form = {
        authenticationToken:configVars.PEST_ROUTES_API_TOKEN,
        authenticationKey:configVars.PEST_ROUTES_API_KEY,
        address:body.address,
        city:body.city,
        state:body.state,
        zip:body.zip,
        phone:body.phone,
        includeData:1
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
            }else if(resBody.customerIDs.length<1){
              callback(null,null);
            }else if(resBody.customerIDs.length>1){
              callback('Two or more are associated with this information you provided please contact customer support.')
            }else{
              callback(null,resBody.customers[0]);
            }
          }
      );
    }
  });    
}
function queryCreatePaymentProfile(billingAddress,billingCity,billingState,billingZip,billingCountryID,
  customerID,creditCardToken,creditCardTokenID,callback){
  var url = configVars.PEST_ROUTES_URL + "/customer/createPaymentProfile";
      var form = {
        authenticationToken:configVars.PEST_ROUTES_API_TOKEN,
        authenticationKey:configVars.PEST_ROUTES_API_KEY,

        customerID:customerID,

        billingAddress1: "338 E Harvard Ave",
        billingCity: "Gilbert",
        billingState: "AZ",
        billingZip: "US",
        billingCountryID: "US",

        
        // CreditCardTokenID:'8kmv38w',
		    // CreditCardToken:'492220831',
        // CreditCardTokenID:creditCardTokenID,
        CreditCardToken:creditCardToken,
        // CreditCardToken:  '4C44F95F-5F76-4C67-AC17-7530354C0F1C',
		    CreditCardTokenID:'3706434363'
      }
      request.post(
          {
            uri: url,
            qs: form
          },
          function (err, res, resBody) {
            var resBody = JSON.parse(resBody);
            console.log(resBody);
            if(err){
                callback(err);
            }else if(!resBody.success){
              callback(resBody.errorMessage);
            }else{
              callback(null,resBody);
            }
          }
      );
}

/*          
            "commercialAccount": "0",
            "billingCompanyName": "",

            "billingCountryID": "US",
            "billingPhone": "4807103895",
            "billingEmail": "",

            "addedByID": "31743",
            "dateCancelled": "0000-00-00 00:00:00",
            "dateUpdated": "2020-02-11 18:04:33",
            "sourceID": "0",

            "paidInFull": "0",
            "subscriptionIDs": "1179438",

            "balanceAge": "0",
            "responsibleBalance": "0.00",
            "responsibleBalanceAge": "0",

            "customerLink": "8834123",@@
            "masterAccount": "0",
            "preferredBillingDate": "-1",

            "paymentHoldDate": "0000-00-00 00:00:00",
            "mostRecentCreditCardLastFour": null,
            "mostRecentCreditCardExpirationDate": null,

            "regionID": "0",
            "mapCode": "",@@
            "mapPage": "",
            "specialScheduling": "",@@
            "taxRate": "0.000000",@@
            "smsReminders": "1",@@
            "phoneReminders": "1",@@
            "emailReminders": "1",@@
            "appointmentIDs": null,
            "ticketIDs": null,
            "paymentIDs": null,
            "unitIDs": []
            */
function updatedCustomerObj(oldFields,updatedFields){
  // console.log(oldFields.taxRate);
  var customerObj = {
    CustomerID:oldFields.customerLink,

    CustomerName: updatedFields.name || oldFields.fname + ' ' + oldFields.lname,
    CustomerPhone1: updatedFields.phone1 || oldFields.phone1,
    CustomerPhone2: updatedFields.phone2 || oldFields.phone2,
    CustomerEmail: updatedFields.email || oldFields.email,
    CustomerAddress: updatedFields.address || oldFields.address,
    CustomerCity: updatedFields.city || oldFields.city,
    CustomerState: updatedFields.state || oldFields.state,
    CustomerZipCode: updatedFields.zip || oldFields.zip,

    CustomerCompany: updatedFields.companyName || oldFields.companyName,
    CommercialProperty: updatedFields.commercialProperty || oldFields.commercialProperty,
    CustomerSpouse: updatedFields.spouse || oldFields.spouse,
    SquareFt: updatedFields.squareFeet || oldFields.squareFeet,
    MapCode: updatedFields.mapCode || oldFields.mapCode,
    Lat: updatedFields.lat || oldFields.lat,
    Lng: updatedFields.lng || oldFields.lng,
    CustomerTaxRate: updatedFields.taxRate || oldFields.taxRate*100,

    SpecialScheduling: updatedFields.specialScheduling || oldFields.specialScheduling,
    CustomerStatus: updatedFields.status || oldFields.status,
    PreferredTechID: updatedFields.preferredTechID || oldFields.preferredTechID,

    BillingName: updatedFields.billingName || oldFields.billingFName + ' ' + oldFields.billingLName,
    BillingAddress: updatedFields.billingAddress || oldFields.billingAddress,
    BillingCity: updatedFields.billingCity || oldFields.billingCity,
    BillingState: updatedFields.billingState || oldFields.billingState,
    BillingZipCode: updatedFields.billingZip || oldFields.billingZip,
    AutoPay: updatedFields.autoPay || oldFields.aPay,
    Balance: updatedFields.balance || oldFields.balance,

    CustomerDateAdded: updatedFields.dateAdded || oldFields.dateAdded,
    CustomerSource: updatedFields.source || oldFields.source
  }
  return customerObj;
    /*
      Updates to repeat:
      subscriptionIDs
      appointmentIDs
      ticketIDs
      paymentIDs
    */

    /*
    Have to use other customer update in pestRoute API


    "PestRoutesCustomerID": "integer (optional)",
    "Branch": "string (optional)",
    "CustomerTaxRate": "number (optional)",
    "CustomerCancelDate": "string (optional)",
    "CustomerCancelReason": "string (optional)",
    "CustomerLinkedProperty": "string (optional)",
    "Salesman": "string (optional)",
    "SalesmanID": "integer (optional)",
    "Notes": "string (optional)",
    "Alert": "string (optional)",
    "SubscriptionID": "string (optional)",
    "PestRoutesSubscriptionID": "integer (optional)",
    "Frequency": "integer (optional)",
    "ServiceType": "string (optional)",
    "Price": "number (optional)",
    "ExpirationDate": "string (optional)",
    "Lead": "string (optional)",
    "InitialQuote": "number (optional)",
    "InitialDiscount": "number (optional)",
    "SubscriptionNotes": "string (optional)",
    "AgreementLength": "integer (optional)",
    "LastService": "string (optional)",
    "InitialService": "string (optional)",
    "NextService": "string (optional)",
    "HasFollowUpService": "string (optional)",
    "BillingFrequency": "integer (optional)",
    "NextBillingDate": "string (optional)",
    "CreditCardToken": "string (optional)",
    "CreditCardTokenID": "string (optional)",
    "Jan": "string (optional)",
    "Feb": "string (optional)",
    "Mar": "string (optional)",
    "Apr": "string (optional)",
    "May": "string (optional)",
    "Jun": "string (optional)",
    "Jul": "string (optional)",
    "Aug": "string (optional)",
    "Sep": "string (optional)",
    "Oct": "string (optional)",
    "Nov": "string (optional)",
    "Dec": "string (optional)",
    "SmsReminders": "string (optional)",
    "PhoneReminders": "string (optional)",
    "EmailReminders": "string (optional)"
    */
}
module.exports = { findPestRouteCustomerByID , findPestRouteCustomer , createPestRouteCustomer , queryCreatePaymentProfile , updatedCustomerObj }