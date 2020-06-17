const { queryAPIRoutes } = require('./pestRoutes/techRoutes');

function getAvailibleRoutes(callback){
    queryAPIRoutes(function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
}

module.exports = { getAvailibleRoutes }