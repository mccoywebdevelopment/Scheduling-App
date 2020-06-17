const braintree = require('braintree');
const configvars = require('../../config/variables');

/*
gateway.clientToken.generate({
  customerId: aCustomerId
}, function (err, response) {
  var clientToken = response.clientToken
});
*/

const gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   configvars.BRAIN_TREE_API_MERCHANT_ID,
    publicKey:    configvars.BRAIN_TREE_API_PUBLIC_KEY,
    privateKey:   configvars.BRAIN_TREE_API_PRIVATE_KEY
});

function getCreditCardToken(firstName,lastName,paymentMethodNonce,callback){
    gateway.customer.create({
        firstName: firstName,
        lastName: lastName,
        paymentMethodNonce: paymentMethodNonce
      }, function (err, result) {
          if(err){
              callback(err);
          }else if(!result.success){
            callback("Brain tree auth failed.")
          }else{
              // console.log(result);
              // console.log(result.customer.creditCards[0]);
              var obj = {
                //   creditCardID:result.customer.creditCards[0].globalId,
                //   creditCardToken:result.customer.creditCards[0].token
                creditCardID: result.customer.creditCards[0].token,
                creditCardToken: result.customer.creditCards[0].customerId
              }
              console.log(obj);
              callback(null,obj);
          }
      });
}
function generateClientToken(callback){
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            callback(err);
        }else{
            callback(null,response.clientToken);
        }
    });
}

// function transaction(amount,paymentMethodNonce,callback){
//     var nonceFromTheClient = req.body.paymentMethodNonce;
//     // Create a new transaction for $10
//     gateway.transaction.sale({
//       amount: amount,
//       paymentMethodNonce: paymentMethodNonce,
//       options: {
//         // This option requests the funds from the transaction
//         // once it has been authorized successfully
//         submitForSettlement: true
//       }
//     }, function(error, result) {
//         if (result) {
//           callback(null,result);
//         } else {
//           callback(error);
//         }
//     });
// }

module.exports = { generateClientToken , getCreditCardToken }