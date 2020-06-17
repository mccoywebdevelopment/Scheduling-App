const { querySpotByDate , querySpotsByDates} = require('./pestRoutes/spot');

function getAvailibleSpotsByDate(date,callback){
    querySpotByDate(date,function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
}

function getAvailibleSpotsByDatesAndTimeFrame(startTime,endTime,dates,callback){
    querySpotsByDates(dates,function(err,result){
        if(err){
            callback(err);
        }else{
            var arr = [];
            for(var i=0;i<result.length;++i){
                if(isBetween(startTime,endTime,result[i].start)){
                    arr.push(result[i]);
                }
            }
            callback(null,arr);
        }
    });
}

function isBetween(startTime,endTime,spotTime){
    if(spotTime<=endTime && spotTime>=startTime){
        return true;
    }else{
        return false;
    }
}

module.exports = { getAvailibleSpotsByDate , getAvailibleSpotsByDatesAndTimeFrame }