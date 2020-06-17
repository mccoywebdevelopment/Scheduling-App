import React from "react";
import { API_BASE_URL } from '../../../config/variables';
import { Redirect } from 'react-router-dom'

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';

export default class ExistingChoiceView extends React.Component{
    state = {
        btnDisabled:true,
        serverErrorMsg:null,
        redirect:null,

        input:null
    }

    renderRedirect = () =>{
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
    }

    toggleInput = (e) =>{
        let newState = this.state;
        newState.input = e.target.value;
        this.setState(newState);
    }

    submit = () =>{
        let newState = this.state;
        newState.redirect = this.state.input;
        this.renderRedirect();
        this.setState(newState);
    }
    render(){
        return(
            <>      
                    {this.renderRedirect()}
                    <BoxContainer serverErrorMsg={this.state.serverErrorMsg}>
                        <div className='row'>
                            <div className="col-lg-12" style={{marginBottom:'2em'}}>
                                <h1 className="text-center">What can we help you with?</h1>
                            </div>
                            <div className="col-lg-12">
                                <p className="text-center">Please select one:</p>
                            </div>
                            <div className='col-lg-12' style={{paddingTop:'30px'}}>
                                <div class="form-check form-check-inline col-lg-12">
                                    <input onChange={this.toggleInput} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="select-existing-service-type"/>
                                    <label class="form-check-label" for="inlineRadio1">Schedule appointment on existing service plan</label>
                                </div>
                                <div class="form-check form-check-inline col-lg-12" style={{marginTop:'30px'}}>
                                    <input onChange={this.toggleInput} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="select-subscription"/>
                                    <label class="form-check-label" for="inlineRadio2">Add on an additional service plan</label>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 offset-lg-8 col-md-12"> 
                                {!this.state.input?
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