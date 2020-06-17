const express = require('express');
const router = express();
const SpotQ = require('../queries/spot');

router.route('/get/:date')
.get(function(req,res){
    SpotQ.getAvailibleSpotsByDate(req.params.date,function(err,result){
        if(err){
            console.log("\n\n\n"+err);
            res.status(404).json({err:err,redirectURL:null});
        }else{
            res.send(result);
        }
    });
});

router.route('/get/time-frame')
.post(function(req,res){
    SpotQ.getAvailibleSpotsByDatesAndTimeFrame(req.body.startTime,req.body.endTime,
        req.body.dates,function(err,result){
            if(err){
                console.log("\n\n\n"+err);
                res.status(404).json({err:err,redirectURL:null});
            }else{
                console.log(result.length);
                res.send({result:result});
            }
    });
});

module.exports = router;