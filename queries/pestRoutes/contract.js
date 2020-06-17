const configVars = require('../../config/variables');
const request = require('request');

function findContractBySubscriptionID(subscriptionID,callback){
    var url = configVars.PEST_ROUTES_URL + "/contract/search";
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
            // console.log(form);
            // console.log(resBody);
            var resBody = JSON.parse(resBody);
            if(err){
                callback(err);
            }else if(!resBody.success){
                callback(resBody.errorMessage);
            }else{
            //callback(null,resBody.subscription);
                callback(null,resBody);
            }
        }
    );
}

function deleteContractByID(){
    
}

module.exports ={ deleteContractByID , findContractBySubscriptionID }




//get contract ID by subscription ID then delete contract By ID