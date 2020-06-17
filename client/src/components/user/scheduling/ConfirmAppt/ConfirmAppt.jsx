import React from 'react';

export default class ConfirmAppt extends React.Component{
    constructor(props){
        super(props);
        console.log("Confirm Appt");
        console.log(this.props);
    }
    getTime = (miltaryTime) =>{
        var time = miltaryTime;

        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);

        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
        }
        
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
       // timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
        timeValue += (hours >= 12) ? "pm" : "am";  // get AM/PM

        return timeValue;
    }
    getDate = (date) =>{
        var d = date.split('-');
        var dd = d[2];
        var mm = d[1];
        var yyyy = d[0];

        return mm + "/" + dd + "/" + yyyy;
    }
    render(){
        return(
            <>
                <div className="col-lg-12">
                    <h4 className="text-center" style={{marginBottom:"50px"}}>Confirm date and time with the associated plan:</h4>
                </div>
                 <div className="col-lg-12 offset-lg-4" style={{marginTop:'60px'}}>
                    <h5>Service Type: {this.props.serviceType.description}</h5>
                    <h5>Initial Charge: {this.props.serviceType.defaultInitialCharge}</h5>
                    <h5>Recurring Charge: {this.props.serviceType.minimumRecurringCharge}</h5>
                    <h5>Date: {this.getDate(this.props.date)}</h5>
                    <h5>Time: {this.getTime(this.props.time)}</h5>
                </div>
            </>
        );
    }
}