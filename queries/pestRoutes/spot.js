const configVars = require('../../config/variables');
const request = require('request');

function querySpotByDate(date,callback){
    var url = configVars.PEST_ROUTES_URL + "/spot/search/"
    var form = {
        authenticationToken:configVars.PEST_ROUTES_API_TOKEN,
        authenticationKey:configVars.PEST_ROUTES_API_KEY,
        includeData:1,

        apiCanSchedule:1,
        date:date,
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
                // var spots = filterSpots(resBody.spots)
                callback(null,resBody.spots);
            }
        }
    );
}
//start and end time must be military time
function querySpotsByDates(dates,callback){
    if(dates.length<1){
        callback("No dates were given");
        return;
    }

    var i = 0;
    var spotsArr = [];
    dates.forEach(element => {
        querySpotByDate(element,function(err,spots){
            if(err){
                callback(err);
                return;
            }else if(i==dates.length-1){
                spotsArr = spotsArr.concat(spots);
                callback(null,spotsArr);
                return;
            }else{
                spotsArr = spotsArr.concat(spots);
            }
            i++;
        });
    });
}

function filterSpots(spots){
    var arr = [];

    for(var i=0;i<spots.length;++i){
        if(isValidSpot(spots[i])){
            arr.push(spots[i]);
        }
    }
    return arr;
}

function isValidSpot(spot){
    if(spot.open=="1" && isFutureTime(spot.date,spot.start.split(":")[0]) && isBewtween(5,spot.date)){
        return true;
    }else{
        return false;
    }
}

function isFutureTime(dateString,hour){
    hour = Number(hour);
    var today = new Date();
    var yyyy = Number(dateString.split('-')[0]);
    var mm = Number(dateString.split('-')[1]);
    var dd = Number(dateString.split('-')[2]);
  
    var tyyyy = Number(today.getFullYear().toString());
    var tmm = Number(today.getMonth().toString()) + 1;
    var tdd = Number(today.getDate().toString());
    var th = Number(today.getHours().toString());
  
    if(tyyyy<=yyyy && tmm<=mm && tdd<=dd){
      if(tyyyy == yyyy && tmm==mm && tdd == dd && th>=hour){
        return false;
      }
      return true;
    }
    return false;
}

function isBewtween(daysAhead,dateString){
    var date = new Date();
    var spotDate = new Date(dateString);
    var daysAhead = date.setDate(date.getDate() + daysAhead);
    if(spotDate<=daysAhead){
      return true
    }else{
      return false;
    }
}

module.exports = { querySpotByDate , querySpotsByDates }