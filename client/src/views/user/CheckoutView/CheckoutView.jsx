import React from 'react';
import { API_BASE_URL } from '../../../config/variables';
import { Redirect } from 'react-router-dom'

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import BrainTree from '../../../components/user/checkOut/BrainTree/BrainTree';

export default class CheckoutView extends React.Component{
    state = {
        btnDisabled:false,
        serverErrorMsg:null,
        redirect:null,
        isSubmit:false,
        isLoading:true,

        clientToken:null

    }
    renderRedirect = () =>{
        if(this.state.redirect) {
            return <Redirect to='/calendar' />
        }
    }
    // fetchToken = () =>{
    //     fetch(API_BASE_URL+"/checkout/get/token/brain-tree",{
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization' : this.props.JWT
    //         },
    //     }).then(response => response.json())
    //     .then(res => {
    //         let newState = this.state;
    //         if(res.err){
    //             newState.serverErrorMsg = res.err;
    //         }else if(res.result){
    //             newState.clientToken = res.result;
    //         }else{
    //             newState.serverErrorMsg = "Something went wrong."
    //         }
    //         this.setState(newState);
    //     });
    // }
    // brainTreeSubmit = (nonce) =>{
    //     var data = {
    //         firstName:"Chris",
    //         lastName:"McCoy",
    //         nonce:nonce
    //     }
    //     fetch(API_BASE_URL+"/checkout/get/create/payment-profile",{
    //         method:'POST',
    //         body:JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization' : this.props.JWT
    //         },
    //     }).then(response => response.json())
    //     .then(res => {
    //         let newState = this.state;
    //         if(res.err){
    //             newState.serverErrorMsg = res.err;
    //         }else if(res.result){
    //             console.log(res.result);
    //         }else{
    //             newState.serverErrorMsg = "Something went wrong."
    //         }
    //         this.setState(newState);
    //     });
    // }
    // submit = () =>{
    //     let newState = this.state;
    //     newState.isSubmit = true;
    //     this.setState(newState);
    // }
    // fetchTotalPrice=()=>{
    //     fetch(API_BASE_URL+"/service-type/total",{
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization' : this.props.JWT
    //         },
    //     }).then(response => response.json())
    //     .then(res => {
    //         let newState = this.state;
    //         if(res.err){
    //             newState.serverErrorMsg = res.err;
    //         }else if(res.result){
    //             console.log(res.result);
    //             newState.total = res.result;
    //         }else{
    //             newState.serverErrorMsg = "Something went wrong."
    //         }
    //         this.setState(newState);
    //     });
    // }
    // fetchSubscribeAndCreateAppt = () =>{
    //     fetch(API_BASE_URL+"/subscription/update-with-jwt",{
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization' : this.props.JWT
    //         },
    //     }).then(response => response.json())
    //     .then(res => {
    //         let newState = this.state;
    //         if(res.err){
    //             newState.serverErrorMsg = res.err;
    //         }else if(res.result){
    //             alert(res.result);
    //         }else{
    //             newState.serverErrorMsg = "Something went wrong."
    //         }
    //         this.setState(newState);
    //     });
    // }
    test = () =>{
        // alert(this.props.JWT);
        fetch(API_BASE_URL+"/subscription/update-with-jwt",{
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
                this.test2();
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    test2 = () =>{
        fetch(API_BASE_URL+"/appointment/create",{
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
                // alert(res.result);
                newState.isLoading = false;
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    componentDidMount = () =>{
        this.test2();
        // this.fetchSubscribeAndCreateAppt();
        // this.fetchTotalPrice();
        // this.fetchToken();
    }
    render(){
        return(
            <>      {this.renderRedirect()}
                    <BoxContainer serverErrorMsg={this.state.serverErrorMsg}>
                        <div className='row'>
                            <div className="col-lg-12">
                                {this.state.isLoading?
                                    <h1 className="text-center">Loading...</h1> 
                                :
                                    <h1 className="text-center">Your appt has been confirmed.</h1>
                                }
                            </div>
                            {/* <div className="col-lg-12" style={{marginBottom:'2em'}}>
                                <h1 className="text-center">Checkout:</h1>
                            </div>
                            <div className="col-lg-12">
                                <p className="text-center">Please enter you billing info:</p>
                            </div>
                            <div className='col-lg-12'>
                                <h1>Total:  ${this.state.total}</h1>
                                <BrainTree isSubmit={this.state.isSubmit} submit={this.brainTreeSubmit} clientToken={this.state.clientToken}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 offset-lg-8 col-md-12"> 
                                {this.state.btnDisabled?
                                            <button className="btn btn-primary btn-block" disabled>Continue</button>
                                        :
                                            null// <button className="btn btn-primary btn-block" onClick={this.submit}>Pay</button>
                                }
                            </div> */}
                        </div> 
                        <div></div>
                    </BoxContainer>
                </>
        )
    }
}