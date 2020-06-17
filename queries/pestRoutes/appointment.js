const configVars = require('../../config/variables');
const request = require('request');


function create(customerID,spotID,serviceTypeID,subscriptionID,callback){
    var url = configVars.PEST_ROUTES_URL + "/appointment/create"
    var form = {
        authenticationToken:configVars.PEST_ROUTES_API_TOKEN,
        authenticationKey:configVars.PEST_ROUTES_API_KEY,
        includeData:1,

        customerID: customerID,
        type:serviceTypeID,
        subscriptionID:subscriptionID,
        spotID:spotID
    }
    // console.log(form);
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
                callback(null,resBody);
            }
        }
    );
}

module.exports = { create }