const jwt = require('jsonwebtoken');
const configVars = require('./variables');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if(!authHeader){
      next('No token was provided.')
    }else{
      jwt.verify(authHeader, configVars.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
          console.log(true);
          res.sendStatus(403);
        }else{
          req.user = user.user.pestRoutesConfig;
          console.log(req.user);
          next();
        }
      });
    }
}
function generateAccessToken(user) {
  return jwt.sign({user}, configVars.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
}
module.exports = { authenticateToken , generateAccessToken }