import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class SelectDates extends React.Component{
    constructor(props){
        super(props);
    }
    getMonth = (date) =>{
        const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
        "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
        var d = new Date(date);
        return monthNames[d.getMonth()];
    }
    getDate = (date) =>{
        var d = new Date(date);
        return d.getDate();
    }
    getWeekDay = (date) =>{
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var d = new Date(date);
        return days[d.getDay()];
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
    render(){
        var cardStyles = {
            Height:'100%',
            width:'100%',
            borderWidth:'3px',
            borderColor:'transparent',
            marginLeft:'auto',
            marginRight:'auto',
            boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
            cursor:'pointer',
            paddingBottom:'4em'
        }
        var iconStyles = {
            float:'right',
            color:'#CB0806',
            visibility:"hidden"
        }

        // if(this.props.data.selected){
        //     cardStyles.borderColor = '#CB0806';
        //     iconStyles.visibility = "visible";
        // }
        const spotList = (spots) =>{
            return spots.map((item,key)=>{
                return(
                    <p onClick={(e)=>{this.props.toggleTime(null,item)}} className="text-center availible-spot" style={{color:'#CB0806',marginBottom:'0.5em'}}>{this.getTime(item.start)}</p>
                );
            })
        } 
        const list = () =>{
            return this.props.data.map((item,key)=>{
                return(
                        <div className="col-lg-2" key={key}>
                            <div className="card" style={cardStyles}>
                                <div className="card-body">
                                    <h2 className="text-center">{this.getMonth(item)} {this.getDate(item)}</h2>
                                    <p className="text-center">{this.getWeekDay(item)}</p>
                                    {this.props.spots[key].length>0?
                                        <>
                                            {spotList(this.props.spots[key])}
                                        </>
                                    :
                                        <p className="text-center">No Spots</p>
                                    }
                                </div>
                            </div>
                        </div>
                
                )
            });
        }
        return(
            <>
                <div className="col-lg-1">
                {!this.props.prevDaysBtnDisabled?
                    <FontAwesomeIcon disabled={this.props.prevDaysBtnDisabled} onClick={this.props.toggleBack} color="#428bca" className="text-center"  size={"3x"} icon={faChevronLeft} style={{marginTop:'60px',cursor:'pointer'}}/>
                :
                    <FontAwesomeIcon color="#428bca" className="text-center"  size={"3x"} icon={faChevronLeft} style={{marginTop:'60px',cursor:'not-allowed',opacity:'50%'}}/>
                }
                </div>

                {list()}
                
                <div className="col-lg-1">
                    {!this.props.nextDaysBtnDisabled?
                        <FontAwesomeIcon onClick={this.props.toggleNext} color="#428bca" style={{float:'right',verticalAlign:'middle',marginTop:'60px',cursor:'pointer'}} size={"3x"} icon={faChevronRight} />
                    :
                        <FontAwesomeIcon color="#428bca" className="text-center"  size={"3x"} icon={faChevronRight} style={{marginTop:'60px',cursor:'not-allowed',opacity:'50%'}}/>
                    }
                </div>
            </>
        );
    }
}