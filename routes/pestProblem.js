const express = require('express');
const router = express();
const PestProblemQ = require('../queries/pestProblem');

router.route('/update/jwt')
.post(function(req,res){
    console.log(req.body.selected);
    PestProblemQ.updateJWT(req.body.selected,req.user,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send({JWT:result});
        }
    });
});

module.exports = router;