import React from 'react';
import { API_BASE_URL } from '../../../config/variables';
import { Redirect } from 'react-router-dom'

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import SubscriptionSelect from '../../../components/user/scheduling/SubscriptionSelect/SubscriptionSelect';

export default class ExistingUserView extends React.Component{
    state = {
        btnDisabled:true,
        serverErrorMsg:null,
        redirect:null,
        isBack:false,
        recommended:[],

        options:[]
    }
    toggleSelect = (e,typeID) =>{
        let newState = this.state;
        var isOneSelected = false;
        for(var i=0;i<newState.options.length;++i){
            if(newState.options[i].typeID == typeID){
                newState.options[i].isSelected = !newState.options[i].isSelected;
            }
            if(newState.options[i].isSelected){
                isOneSelected = true;
            }
        }
        if(isOneSelected){
            newState.btnDisabled = false;
        }else{
            newState.btnDisabled = true;
        }
        this.setState(newState);

    }
    formatServiceTypes = (serviceTypes) =>{
        console.log("=========================================");
        console.log(serviceTypes);
        let newState = this.state;
        for(var i=0;i<serviceTypes.length;++i){
            var isRecommended = false;
            for(var ix=0;ix<newState.recommended.length;++ix){
                if(newState.recommended[ix] == serviceTypes[i].typeID){
                    isRecommended = true;
                }
            }
            newState.options.push({
                title:serviceTypes[i].description + " Plan",
                initialQuote:serviceTypes[i].defaultInitialCharge,
                recurringCharge:serviceTypes[i].minimumRecurringCharge,
                description:this.customDescription(serviceTypes[i].typeID),
                isSelected:false,
                isRecommended:isRecommended,
                typeID:serviceTypes[i].typeID
            });
        }
        this.setState(newState);
    }
    getPriceText = (serviceType) =>{
        var priceText = "";
        if(serviceType.frequency<1){
            priceText = "Total Price: $"+serviceType.defaultCharge;
        }else{
            priceText = "$"+serviceType.minimumRecurringCharge + "/" + serviceType.frequency + " days";
        }
        return priceText;
    }
    customDescription=(serviceTypeID) => {
        if(serviceTypeID=="1694"){
            return "General Service special 20 laboris nisi ut aliquip ex ea commodo consequat."+
                        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        }else if(serviceTypeID=="4299"){
            return "Weeds laboris nisi ut aliquip ex ea commodo consequat.";
        }else{
            return "";
        }
    }
    fetchSubscriptions = () =>{
        fetch(API_BASE_URL+"/service-type/get/specific",{
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
                newState.recommended = res.recommended;

                this.formatServiceTypes(res.result);
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    renderRedirect = () =>{
        if(this.state.redirect && !this.state.isBack) {
            return <Redirect to='/calendar' />
        }else if(this.state.redirect){
            return <Redirect to='/pest-problem' />
        }
    }
    fetchSubmitSubscription = (data) =>{
        fetch(API_BASE_URL+"/subscription/update-jwt",{
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
            }else if(res.JWT){
                this.props.onChangeJWT(res.JWT);
                newState.redirect = true;
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    submit = () =>{
        var body = {
            serviceTypeIDs:[]
        };
        for(var i=0;i<this.state.options.length;++i){
            if(this.state.options[i].isSelected){
                body.serviceTypeIDs.push(this.state.options[i].typeID);
            }
        }
        this.fetchSubmitSubscription(body);
    }
    redirectBack = () =>{
        let newState = this.state;
        newState.redirect = true;
        newState.isBack = true;
        this.setState(newState);

    }
    componentDidMount = () =>{
        this.fetchSubscriptions();
    }
    render(){
        return(
            <>      {this.renderRedirect()}
                    <BoxContainer serverErrorMsg={this.state.serverErrorMsg}>
                        <div className='row'>
                            {/* <div className="col-lg-12" style={{marginBottom:'2em'}}>
                                <h1 className="text-center">Please select your subscription(s):</h1>
                            </div>
                            <div className="col-lg-12">
                                <p className="text-center">You can select multiple:</p>
                            </div> */}
                            <div className='col-lg-12'>
                                <SubscriptionSelect toggleSelect={this.toggleSelect}  options={this.state.options}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 col-md-12">
                                    <button className="btn btn-primary btn-block" onClick={this.redirectBack}>Back</button>
                            </div>
                            <div className="col-lg-4 offset-lg-4 col-md-12">
                                {this.state.btnDisabled?
                                            <button className="btn btn-primary btn-block" disabled>Continue</button>
                                        :
                                            <button className="btn btn-primary btn-block" onClick={this.submit}>Continue</button>
                                }
                            </div>
                        </div>
                    </BoxContainer>
                </>
        )
    }
}
