const configVars = require('../../config/variables');
const request = require('request');

function queryAPIRoutes(callback){
    var url = configVars.PEST_ROUTES_URL + "/route/search/"
    var form = {
        authenticationToken:configVars.PEST_ROUTES_API_TOKEN,
        authenticationKey:configVars.PEST_ROUTES_API_KEY,
        includeData:1,

        apiCanSchedule:1,
        date:"2020-02-18",
        assignedTech:{"operator":"!=","value":"0"}
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
                callback(null,resBody);
            }
        }
    );
}

module.exports = { queryAPIRoutes }