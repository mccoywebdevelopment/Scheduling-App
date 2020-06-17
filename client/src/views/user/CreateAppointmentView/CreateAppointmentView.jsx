import React from 'react';
import { API_BASE_URL } from '../../../config/variables';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import CreateAppointment from '../../../components/user/scheduling/CreateAppointment/CreateAppointment';
import ConfirmAppt from '../../../components/user/scheduling/ConfirmAppt/ConfirmAppt';

export default class CreateAppointmentView extends React.Component{
    state = {
        btnDisabled:true,
        serverErrorMsg:null,
        redirect:null,
        isBackBtn:false,

        dates:[],
        spots:null,
        isLoading:false,
        prevDaysBtnDisabled:true,
        nextDaysBtnDisabled:false,

        data:[],
        indexSelected:0,

        timeFrames:[{
            text:"Morning",
            start:"8:00:00",
            end:"12:00:00",
            time:"8am - 12pm",
            selected:false
        },{
            text:"Afternoon",
            start:"12:00:00",
            end:"16:00:00",
            time:"12pm - 4pm",
            selected:false
        },{
            text:"Evening",
            start:"16:00:00",
            end:"19:00:00",
            time:"4pm - 7pm",
            selected:false
        }]
    }
    constructor(props){
        super(props);
        let newState = this.state;
        var d = new Date();
        d.setDate(d.getDate() - 1);
        newState.dates = this.getDates(new Date(d));
        this.setState(newState);

        this.fetchGetSubscriptions();
    }
    formatDataInit = (plans) =>{
        let newState = this.state;
        console.log(plans);
        for(var i=0;i<plans.length;++i){
            newState.data.push({
                plan:plans[i],
                spot:null,
                isBack:true,
                isConfirm:false,
                isSelected:false
            });
        }
        newState.data[0].isBack = false;
        newState.data[0].isSelected = true;
        this.setState(newState);
    }
    fetchGetSubscriptions = () =>{
        fetch(API_BASE_URL+"/service-type/get/me",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : this.props.JWT
            },
        }).then(response => response.json())
        .then(res => {
            let newState = this.state;
            if(res.err){
                newState.serverErrorMsg = res.err;
            }else if(res.result){
                this.formatDataInit(res.result);
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
            console.log(this.state);
        });
    }
    getDates = (startDate,isBack) =>{
        var dates = [];
        if(isBack){
            dates.push(startDate.setDate(startDate.getDate() - 5));
            for(var i=1;i<5;++i){
                dates.push(startDate.setDate(startDate.getDate() + 1));
            }
        }else{
            for(var i=0;i<5;++i){
                dates.push(startDate.setDate(startDate.getDate() + 1));
            }
        }
        return dates;
    }
    formatDate = (date) =>{
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    checkToggles = (startDate) =>{
        let newState = this.state;
        var d = new Date();
        d.setDate(d.getDate() - 1);

        if(this.formatDate(startDate) == this.formatDate(new Date(d))){
            newState.prevDaysBtnDisabled = true;
        }else{
            newState.prevDaysBtnDisabled = false;
        }

        var d = new Date();
        d.setDate(d.getDate() + 6);

        if(this.formatDate(startDate) > this.formatDate(new Date(d))){
            newState.nextDaysBtnDisabled = true;
        }else{
            newState.nextDaysBtnDisabled = false;
        }

        this.setState(newState);
    }
    togglePeriodOfDay = (e,index) =>{
        let newState = this.state;

        for(var i=0;i<newState.timeFrames.length;++i){
            if(i==index){
                newState.timeFrames[i].selected = true;
                this.fetchTimeFrameSpots(newState.timeFrames[i].start,newState.timeFrames[i].end,this.getDatesForFetch());
            }else{
                newState.timeFrames[i].selected = false;
            }
        }
        this.setState(newState);
    }
    getDatesForFetch = () =>{
        var dates = [];
        for(var i=0;i<this.state.dates.length;++i){
            dates.push(this.formatDate(this.state.dates[i]));
        }
        this.checkToggles(new Date(dates[0]));
        return dates;
    }
    renderRedirect = () =>{
        if(this.state.redirect) {
            localStorage.setItem("isReloaded",null);
            return <Redirect to='/world-pay' />
        }
    }
    toggleTime = (e,spot) =>{
        let newState = this.state;
        let i = this.state.indexSelected;

        if(newState.data[i].isSelected){
            newState.data[i].spot = spot;
            newState.data[i].isBack = true;
            newState.data[i].isConfirm = true;
        }
        this.setState(newState);
    }
    toggleBack = () =>{
        let newState = this.state;
        let i = this.state.indexSelected;

        if(newState.data[i].isConfirm){
            newState.data[i].isConfirm = false;
            newState.data[i].spot = null;
            if(i==0){
                newState.data[i].isBack = false;
            }
        }else if(newState.data[i].isBack){
            newState.data[i].isSelected = false;
            newState.data[i-1].isSelected = true;
            newState.data[i-1].isConfirm = true;
            newState.indexSelected = i-1;
        }


        this.setState(newState);
    }
    toggleNextDates = () =>{
        let newState = this.state;
        newState.dates = this.getDates(new Date(newState.dates[newState.dates.length-1]));
        for(var i=0;i<newState.timeFrames.length;++i){
            if(newState.timeFrames[i].selected){
                this.fetchTimeFrameSpots(newState.timeFrames[i].start,newState.timeFrames[i].end,this.getDatesForFetch());
            }
        }
        this.setState(newState);
    }
    toggleBackDates = () =>{
        let newState = this.state;
        newState.dates = this.getDates(new Date(newState.dates[0]),true);
        for(var i=0;i<newState.timeFrames.length;++i){
            if(newState.timeFrames[i].selected){
                this.fetchTimeFrameSpots(newState.timeFrames[i].start,newState.timeFrames[i].end,this.getDatesForFetch());
            }
        }
        this.setState(newState);
    }
    fetchTimeFrameSpots = (start,end,dates) =>{
        let newState = this.state;
        newState.isLoading = true;
        this.setState(newState);
        var data = {
            startTime:start,
            endTime:end,
            dates:dates
        }
        fetch(API_BASE_URL+"/spot/get/time-frame",{
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : this.props.JWT
            },
        }).then(response => response.json())
        .then(res => {
            let newState = this.state;
            if(res.err){
                newState.serverErrorMsg = res.err;
            }else if(res.result){
                newState.spots = res.result;
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            newState.isLoading = false;
            this.setState(newState);
        });
    }
    fetchCreateAppt = () =>{
        fetch(API_BASE_URL+"/appointment/create/jwt",{
            method:'POST',
            body:JSON.stringify(this.state.data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : this.props.JWT
            },
        }).then(response => response.json())
        .then(res => {
            let newState = this.state;
            if(res.err){
                newState.serverErrorMsg = res.err;
            }else if(res.jwt){
                this.props.onChangeJWT(res.jwt);
                newState.redirect = true;
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    toggleContinue = () =>{
        let newState = this.state;
        let i = this.state.indexSelected;

        if(i==newState.data.length-1 && newState.data[i].isConfirm){
            this.fetchCreateAppt();

        }else if(newState.data[i].isConfirm){
            newState.data[i].isSelected = false;
            newState.data[i+1].isSelected = true;
            newState.indexSelected = i + 1;
        }else{
            newState.data[i].isConfirm = true;
        }


        this.setState(newState);
    }
    render(){

        return(
            <>      {this.renderRedirect()}
                    <BoxContainer serverErrorMsg={this.state.serverErrorMsg}>
                        <div className='row'>
                            <div className="col-lg-12" style={{marginBottom:'1em'}}>
                                <h1 className="text-center">Create an Appointment:</h1>
                            </div>
                            {this.state.data.length>0 && !this.state.data[this.state.indexSelected].spot?


                                <CreateAppointment currentServiceType={this.state.data[this.state.indexSelected].plan.description}

                                    toggleTime={this.toggleTime} nextDaysBtnDisabled={this.state.nextDaysBtnDisabled}

                                    prevDaysBtnDisabled={this.state.prevDaysBtnDisabled} isLoading={this.state.isLoading}

                                    spots={this.state.spots} toggleBackDates={this.toggleBackDates} toggleNextDates={this.toggleNextDates}

                                    timeFrames={this.state.timeFrames} dates={this.state.dates} togglePeriodOfDay={this.togglePeriodOfDay}/>


                            :this.state.data.length>0 && this.state.data[this.state.indexSelected].spot?


                                <ConfirmAppt serviceType={this.state.data[this.state.indexSelected].plan}

                                time={this.state.data[this.state.indexSelected].spot.start} date={this.state.data[this.state.indexSelected].spot.date}/>


                            :
                                null
                            }
                        </div>
                        <div className='row'>
                            {this.state.data.length>0 && this.state.data[this.state.indexSelected].isBack?
                                <div className="col-lg-4 col-md-12">
                                        <button className="btn btn-primary btn-block" onClick={this.toggleBack}>Back</button>
                                </div>
                            :
                                null
                            }
                            <div className={"col-lg-4 col-md-12 "+(this.state.data.length>0 && !this.state.data[this.state.indexSelected].isBack?"offset-lg-8":"offset-lg-4")}>
                                {this.state.data.length>0 && !this.state.data[this.state.indexSelected].spot?
                                            <button className="btn btn-primary btn-block" disabled>Continue</button>
                                        :
                                            <button className="btn btn-primary btn-block" onClick={this.toggleContinue}>Continue</button>
                                }
                            </div>
                        </div>
                    </BoxContainer>
                </>
        )
    }
}
