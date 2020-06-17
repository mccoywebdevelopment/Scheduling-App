const express = require('express');
const router = express();
const TechRoutesQ = require('../queries/techRoutes');

router.route('/get/availible')
.get(function(req,res){
    console.log(true);
    TechRoutesQ.getAvailibleRoutes(function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send(result);
        }
    });
});

module.exports = router;