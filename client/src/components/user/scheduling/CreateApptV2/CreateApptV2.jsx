import React from 'react';

import TimeFrame from './TimeFrame/TimeFrame';
import SelectDates from './SelectDates/SelectDates';

export default class createAppointmentV2 extends React.Component{
    constructor(props){
        super(props);
    }
    formatSpots = () =>{
        var spotObj = [];
        var datesPushed = [];
        for(var i=0;i<this.props.dates.length;++i){
            var spots =[];
            for(var ix=0;ix<this.props.spots.length;++ix){
                if(this.isSameDay(this.props.spots[ix].date,this.props.dates[i])){
                    var found = false;
                    for(var z=0;z<datesPushed.length;++z){
                        if(datesPushed[z].date == this.props.spots[ix].date && datesPushed[z].time == this.props.spots[ix].start){
                            found = true;
                        }
                    }

                    if(!found){
                        spots.push(this.props.spots[ix]);
                        datesPushed.push({time:this.props.spots[ix].start,date:this.props.spots[ix].date})
                    }
                }
            }
            spotObj.push(spots);
        }
        return spotObj;
    }
    isSameDay = (spotDate,date) =>{
        var d1 = new Date(spotDate);
        d1.setDate(d1.getDate() + 1);
        var d2 = new Date(date);
        if(d1.getFullYear()==d2.getFullYear() &&
            d1.getMonth()==d2.getMonth() && d1.getDate() == d2.getDate()){
            return true;
        }else{
            return false;
        }
    }
    
    render(){
        const list = () =>{
            return this.props.timeFrames.map((item,key)=>{
                return(
                    <TimeFrame data={item} index={key} toggle={this.props.togglePeriodOfDay}/>
                )
            });
        }
        return(
            <>
                <div className="col-lg-12" style={{marginBottom:'1em'}}>
                    <p className="text-center">Select a the time range that best fits your schedule.</p>
                    <p className="text-center">Plan: <span style={{fontWeight:'bold'}}>{this.props.currentServiceType}</span></p>
                </div>
                
                {list()}
                
                {this.props.isLoading?
                    <h5 style={{paddingLeft:'50%',paddingTop:'5%'}}>loading...</h5>
                :this.props.spots?
                    <SelectDates toggleTime={this.props.toggleTime} spots={this.formatSpots()} toggleNext={this.props.toggleNextDates} 
                        nextDaysBtnDisabled={this.props.nextDaysBtnDisabled} prevDaysBtnDisabled={this.props.prevDaysBtnDisabled}
                        toggleBack={this.props.toggleBackDates} data={this.props.dates} dateSelectedIndex={this.props.dateSelectedIndex}/>
                :null}
            </>
        )
    }
}