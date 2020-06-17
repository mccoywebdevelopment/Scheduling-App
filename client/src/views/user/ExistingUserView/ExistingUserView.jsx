import React from 'react';
import { nameValidation , phonenumberValidator , validateEmail , streetAddressValidator ,
     cityValidator , stateValidator , zipValidator} from '../../../config/formValidation';
import { API_BASE_URL } from '../../../config/variables';
import { Redirect } from 'react-router-dom'

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import CreateCustomer from '../../../components/user/scheduling/CreateCustomer/CreateCustomer';
import AddressInput from '../../../components/user/scheduling/AddressInput/AddressInput';

export default class ExistingUserView extends React.Component{
    state = {
        // existing:null,
        existing:false,
        btnDisabled:true,
        isAddressInputs:null,
        serverErrorMsg:null,
        redirect:null,

        firstName:"",
        lastName:"",
        phoneNumber:"",
        email:"",

        address:"",
        state:"",
        city:"",
        zip:"",

        errors:{
            firstName:"",
            lastName:"",
            phoneNumber:"",
            email:"",

            address:"",
            state:"",
            city:"",
            zip:""
        }
    }
    toggleBack = () =>{
        let newState = this.state;
        newState.isAddressInputs = false;
        this.setState(newState);
    }
    isFull = () =>{
        let newState = this.state;
        if(this.state.existing == false){
            if(!this.state.isAddressInputs && this.state.firstName.length>0 &&
                this.state.lastName.length>0 && this.state.email.length>0 && this.state.phoneNumber.length>0){
                    newState.btnDisabled = false;
            }else if(this.state.isAddressInputs && this.state.address.length>0 &&
                 this.state.state.length>0 && this.state.city.length>0){
                    newState.btnDisabled = false;
            }else{
                newState.btnDisabled = true;
            }
        }else if(this.state.existing && this.state.address.length>0
                    && this.state.state.length>0 && this.state.zip.length>0 && this.state.phoneNumber.length>0){
                newState.btnDisabled = false;
        }else{
            newState.btnDisabled = true;
        }
        this.setState(newState);
    }
    toggleExisting = (e,value) =>{
        let newState = this.state;
        newState.existing = value;

        this.setState(newState);

        this.isFull();
    }

    onChangeFirstName = (e) =>{
        let newState = this.state;
        newState.firstName = e.target.value;
        this.setState(newState);

        this.isFull();
    }
    onChangeLastName = (e) =>{
        let newState = this.state;
        newState.lastName = e.target.value;
        this.setState(newState);

        this.isFull();
    }
    onChangePhoneNumber = (e) =>{
        let newState = this.state;
        newState.phoneNumber = e.target.value;
        this.setState(newState);

        this.isFull();
    }
    onChangeEmail = (e) =>{
        let newState = this.state;
        newState.email = e.target.value;
        this.setState(newState);

        this.isFull();
    }

    onChangeAddress = (e) =>{
        let newState = this.state;
        newState.address = e.target.value;
        this.setState(newState);

        this.isFull();
    }
    onChangeState = (e) =>{
        let newState = this.state;
        newState.state = e.target.value;
        this.setState(newState);

        this.isFull();
    }
    onChangeZip = (e) =>{
        let newState = this.state;
        newState.zip = e.target.value;
        this.setState(newState);

        this.isFull();
    }
    onChangeCity = (e) =>{
        let newState = this.state;
        newState.city = e.target.value;
        this.setState(newState);

        this.isFull();
    }

    fetchCreateCustomer = () =>{
        var data ={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            phone:this.state.phoneNumber,
            email:this.state.email,
            address:this.state.address,
            state:this.state.state,
            zip:this.state.zip,
            city:this.state.city
        }
        fetch(API_BASE_URL+"/customer/create",{
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(res => {
            let newState = this.state;
            if(res.err){
                newState.serverErrorMsg = res.err;
            }else if(res.JWT){
                this.props.onChangeJWT(res.jwt);
                newState.redirect = true;

            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    fetchLoginCustomer = () =>{
        var data ={
            phone:this.state.phoneNumber,
            address:this.state.address,
            state:this.state.state,
            zip:this.state.zip,
            city:this.state.city
        }
        fetch(API_BASE_URL+"/customer/loggin",{
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
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
    renderRedirect = () =>{
        var url = '/pest-problem'
        if(this.state.existing){
            url = '/existing-choice'
        }
        // var url = '/checkout'

        if(this.state.redirect) {
            return <Redirect to={url} />
        }
    }
    submit = () =>{

        let newState = this.state;
        newState.errors.firstName = nameValidation(newState.firstName);
        newState.errors.lastName = nameValidation(newState.lastName);
        newState.errors.phoneNumber = phonenumberValidator(newState.phoneNumber);
        newState.errors.email = validateEmail(newState.email);
        newState.btnDisabled = true;

        if(this.state.existing || this.state.isAddressInputs){
            newState.errors.address = streetAddressValidator(newState.address);
            newState.errors.city = cityValidator(newState.city);
            newState.errors.state = stateValidator(newState.state);
            newState.errors.zip = zipValidator(newState.zip);
        }

        if(!newState.existing && !newState.isAddressInputs){
            if(newState.errors.firstName.length==0 && newState.errors.lastName.length==0
                && newState.errors.email.length==0 && newState.errors.phoneNumber.length==0){
                    newState.isAddressInputs = true;
                    newState.btnDisabled = false;
            }
        }else if(!newState.existing && newState.isAddressInputs){
            if(newState.errors.address.length==0 && newState.errors.city.length==0
                && newState.errors.state.length==0 && newState.errors.zip.length==0){
                    this.fetchCreateCustomer();
                }
        }else if(newState.errors.address.length==0 && newState.errors.city.length==0
            && newState.errors.state.length==0 && newState.errors.zip.length==0 && newState.errors.phoneNumber.length==0){
                this.fetchLoginCustomer();
        }else{
            newState.btnDisabled = true;
        }
        this.isFull();
        this.setState(newState);
    }
    render(){
        return(
            <>      {this.renderRedirect()}
                    <BoxContainer serverErrorMsg={this.state.serverErrorMsg}>
                        <div className='row'>
                            <div className="col-lg-12" style={{marginBottom:'2em'}}>
                                <h1 className="text-center">New Customer Sign Up:</h1>
                            </div>
                            {/* <div className='col-lg-6 col-md-12 text-center mt-3'>
                                <button type="button" onClick={()=>{this.toggleExisting(null,true)}}
                                className="btn btn-outline-primary float-lg-right"
                                style={{fontSize:'large'}}>Yes, I'm an existing customer.</button>
                            </div>
                            <div className='col-lg-6 col-md-12 text-center mt-3'>
                                <button type="button" onClick={()=>{this.toggleExisting(null,false)}}
                                 className="btn btn-outline-primary float-lg-left"
                                 style={{fontSize:'large'}}>No, I'm a new customer.</button>
                            </div> */}
                            <div className='col-lg-12' style={{marginTop:'40px'}}>
                                {this.state.existing?
                                <>
                                    <AddressInput onChangeCity={this.onChangeCity} city={this.state.city}
                                        onChangeAddress={this.onChangeAddress} address={this.state.address}
                                        onChangeState={this.onChangeState} state={this.state.state} onChangeZip={this.onChangeZip}
                                        zip={this.state.zip} errors={this.state.errors}/>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <input type="tel" name="phoneNumber" className="form-control" placeholder="888 888 8888" minLength="10" maxLength="10"
                                                title="Ten digits code" required onChange={this.onChangePhoneNumber}
                                                style={this.state.errors["phoneNumber"]?{borderColor:'red'}:null} value={this.state.phoneNumber}/>
                                            {this.state.errors["phoneNumber"]?
                                                <div className="invalid-feedback" style={{display:'block'}}>
                                                    {this.state.errors["phoneNumber"]}
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </>
                                :this.state.isAddressInputs?
                                    <AddressInput onChangeCity={this.onChangeCity} city={this.state.city}
                                        onChangeAddress={this.onChangeAddress} address={this.state.address}
                                        onChangeState={this.onChangeState} state={this.state.state} onChangeZip={this.onChangeZip}
                                        zip={this.state.zip} errors={this.state.errors}/>
                                :this.state.existing==false?
                                    <CreateCustomer onChangeFirstName={this.onChangeFirstName} firstName={this.state.firstName}
                                        onChangeLastName={this.onChangeLastName} lastName={this.state.lastName} onChangeEmail={this.onChangeEmail}
                                        email={this.state.email} onChangePhoneNumber={this.onChangePhoneNumber}
                                        phoneNumber={this.state.phoneNumber} errors={this.state.errors}/>
                                :null
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 col-md-12" style={{marginTop:"30px"}}>
                                {this.state.isAddressInputs && !this.state.existing?
                                    <button className="btn btn-primary btn-block" onClick={this.toggleBack}>Back</button>
                                    :null
                                }
                            </div>
                            <div className="col-lg-4 offset-lg-4 col-md-12" style={{marginTop:"30px"}}>
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
