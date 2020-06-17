const configVars = require('../../config/variables');
const request = require('request');

function getServiceTypeByIds(ids,callback){
    if(!ids || ids.length<1){
        callback('No service ids were given.')
    }else{
        var url = configVars.PEST_ROUTES_URL + "/serviceType/search/"
        var form = {
            authenticationToken:configVars.PEST_ROUTES_API_TOKEN,
            authenticationKey:configVars.PEST_ROUTES_API_KEY,
            includeData:1,
            typeIDs:ids
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
                    callback(null,resBody.serviceTypes);
                }
            }
        );
    }
}

module.exports = { getServiceTypeByIds }