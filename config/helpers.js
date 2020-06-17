const Customer = require('../models/Customer');

function isValidProps(requiredProps,body,callback){
    for(var i=0;i<requiredProps.length;++i){
      if(!body.hasOwnProperty(requiredProps[i])){
        return callback('Missing the required field: '+requiredProps[i]);
      }
    }
    callback(null,'success');
}

function verifyUser(req,res,next){
  var jwt = null;
  if(req.params.JWT){
    jwt = req.params.JWT;
  }else{
    jwt = req.body.JWT;
  }
  
  Customer.findOne({JWT:jwt},function(err,userFound){
    if(err){
      next({err:err,redirectURL:null});
    }else if(!userFound){
      next({err:'User not found',redirectURL:null});
    }else{
      next();
    }
  });
}
module.exports = { isValidProps,verifyUser }
  