const { generateAccessToken } = require('../config/auth');

function updateJWT(selected,customer,callback){
    callback(null,returnJWTObj(customer,selected));
}
function returnJWTObj(customer,selected){
    return generateAccessToken({
        pestRoutesConfig:{
            customerID:parseInt(customer.CustomerID),
            pestRouteCustomerID:parseInt(customer.PestRoutesCustomerID),
            subscribedItems:customer.subscribedItems,
            selectedPest:selected
        }
    });
}

module.exports = { updateJWT };