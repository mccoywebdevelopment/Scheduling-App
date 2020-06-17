import React from 'react';
import { API_BASE_URL } from '../../../config/variables';
import { Redirect } from 'react-router-dom'

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import BrainTree from '../../../components/user/checkOut/BrainTree/BrainTree';

export default class BillingInfoView extends React.Component{
    state = {
        btnDisabled:true,
        serverErrorMsg:null,
        redirect:null,
        isEnterCardInfo:false,

        clientToken:null

    }
    renderRedirect = () =>{
        if(this.state.redirect) {
            return <Redirect to='/calendar' />
        }
    }
    fetchToken = () =>{
        fetch(API_BASE_URL+"/checkout/get/token/brain-tree",{
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
                newState.clientToken = res.result;
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    componentDidMount = () =>{
        //this.fetchToken();
    }
    brainTreeSubmit = (nonce) =>{
        var data = {
            firstName:"Chris",
            lastName:"McCoy",
            nonce:nonce
        }
        fetch(API_BASE_URL+"/checkout/get/create/payment-profile",{
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
                console.log(res.result);
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    render(){
        return(
            <>      {this.renderRedirect()}
                    <BoxContainer serverErrorMsg={this.state.serverErrorMsg}>
                        <div className='row'>
                            <div className="col-lg-12" style={{marginBottom:'2em'}}>
                                <h1 className="text-center">Enter Billing Info:</h1>
                            </div>
                            <div className="col-lg-12">
                                <p className="text-center">Please enter you billing info:</p>
                            </div>
                            <div className='col-lg-12'>
                                {this.state.isEnterCardInfo?
                                    <BrainTree submit={this.brainTreeSubmit} clientToken={this.state.clientToken}/>
                                    :null
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 offset-lg-8 col-md-12">
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
